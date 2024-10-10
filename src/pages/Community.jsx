import React, { useEffect, useRef, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useAuthContext from '../hooks/UseContext';
import { url } from '../constants/url';

const Community = () => {
	const [query, setQuery] = useState('');
	const { user } = useAuthContext();
	const bottomRef = useRef(null);

	// Fetch all queries when the component mounts
	useEffect(() => {
		const getAllQueries = async () => {
			try {
				const response = await fetch(`${url}/api/v1/query/getAllQueries`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${JSON.parse(
							localStorage.getItem('token'),
						)}`,
					},
				});
				const json = await response.json();
				if (json?.message) {
					console.log(json.message);
					return;
				}
				setQueries(json.queries);
			} catch (error) {
				console.log(error);
			}
		};
		getAllQueries();
	}, []);

	const [queries, setQueries] = useState([]);
	const inputRef = useRef();

	// Handle form submission to create a new query
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (query) {
			const obj = {
				question: query,
			};
			const response = await fetch(`${url}/api/v1/query/createQuery`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
				},
				body: JSON.stringify(obj),
			});
			const json = await response.json();
			if (json?.message) {
				console.log(json.message);
				return;
			}
			// Add the new query and scroll to the bottom
			setQueries([...queries, json.query]);
			setQuery(''); // Clear the input after submission
		} else {
			alert('Enter Query');
		}
	};

	// Focus on the input field when replying
	const handleButtonFor = async (id) => {
		inputRef.current.focus();
		const solution = prompt('Enter Your Solution');
		if (solution) {
			const response = await fetch(`${url}/api/v1/query/reponseToQuery/${id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
				},
				body: JSON.stringify({
					response: solution,
					responded: user?.name,
					responsedId: user?._id,
				}),
			});
			const json = await response.json();
			if (json.message) {
				alert(json.message);
				return;
			}
			console.log('hello', json);
			setQueries([...queries, json]);
		} else {
			alert('No response Sorry');
		}
	};

	// Scroll to the bottom whenever queries are updated
	useEffect(() => {
		if (bottomRef.current) {
			bottomRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [queries]); // Scroll to the bottom when queries change

	return (
		<div className='h-3/4 w-screen overflow-y-scroll scroll-smooth'>
			<div className='m-2'>
				{queries?.length === 0 ? (
					<div className='text-3xl m-5 font-bold'>No Queries...</div>
				) : (
					queries?.map((query, index) => (
						<QueryDocument
							ref={index === queries.length - 1 ? bottomRef : null} // Set ref only for the last element
							key={index}
							query={query}
							user={user}
							handleButton={handleButtonFor}
						/>
					))
				)}
				{/* Dummy div to ensure scrolling works */}
				<div ref={bottomRef}></div>
			</div>
			<form
				onSubmit={handleSubmit}
				className='w-full flex justify-center m-3'
				style={{
					position: 'fixed',
					bottom: '0',
				}}>
				<input
					ref={inputRef}
					onChange={(e) => setQuery(e.target.value)}
					value={query}
					className='w-3/4 p-2 rounded-md text-center  bg-[#2E2E2F]'
					type='text'
					placeholder='Enter Your Query'
				/>
				<button className='p-4 rounded-md bg-black'>Send</button>
			</form>
		</div>
	);
};

const QueryDocument = ({ query, handleButton, user }) => {
	let postion;
	if (query.responsedId) {
		postion = 'justify-start';
	} else if (query?.responsedId === user?._id) {
		postion = 'justify-end';
	} else if (query?.authorId === user?._id) {
		postion = 'justify-end';
	} else {
		postion = 'justify-start';
	}
	return (
		<div className={`flex ${postion}`}>
			<div className={`text-white bg-black w-[700px] rounded-lg m-2 h-fit p-2`}>
				<div className='m-2'>
					<AccountCircleIcon />
					<span className='m-3'>{query?.name}</span>
				</div>
				<div className='mx-3'>{query.question}</div>
				<div className='flex justify-end p-3 gap-2 flex-col items-end'>
					{query?.response && <p>Solution: {query?.response}</p>}
					{query?.responded && <p>Responsed: {query?.responded}</p>}
				</div>
				<div
					onClick={() => handleButton(query?._id)}
					className='text-end mr-5'>
					{query?.authorId !== user._id && <button>Reply</button>}
				</div>
			</div>
		</div>
	);
};

export default Community;
