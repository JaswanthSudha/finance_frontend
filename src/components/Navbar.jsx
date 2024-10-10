import React from 'react';
import useAuthContext from '../hooks/UseContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { url } from '../constants/url';
const Navbar = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { dispatch, user } = useAuthContext();
	const handleLogout = () => {
		if (window.confirm('Are you sure you want to logout?')) {
			localStorage.removeItem('user');
			localStorage.removeItem('token');
			dispatch({ type: 'LOGOUT' });
		} else {
			return;
		}
	};
	const handleDeleteChat = async () => {
		if (window.confirm('Are you sure you want to clear chat')) {
			const response = await fetch(`${url}/api/v1/message/messages`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
				},
			});
		} else {
			return;
		}
	};
	const handleCommunity = () => {
		if (user) {
			console.log('helo');
			navigate('/community');
		} else {
			alert('Please Login');
			navigate('/');
		}
	};
	return (
		<div className='md:flex md:justify-between md:gap-2 p-8  grid bg-[#171717]'>
			<Link
				to='/'
				className='text-6xl font-bold '>
				FinChat
			</Link>

			<div className='flex justify-between items-center gap-6'>
				<Link
					to='/'
					className='bg-orange-500 p-2 rounded-md'>
					Home
				</Link>
				{pathname === '/chatbot' ||
					(pathname === '/' && (
						<button
							onClick={handleDeleteChat}
							className='bg-red-500 p-2 rounded-md text-white hover:bg-red-300'>
							Clear Chat
						</button>
					))}

				<button
					onClick={handleCommunity}
					className='bg-orange-300 rounded-md p-2 hover:bg-[#E74C3C]'>
					Community
				</button>
				{user && (
					<div className='flex gap-4 mr-10 '>
						<Link to='/profile'>
							<AccountCircleIcon />
							{user?.email}
						</Link>
						<button
							className='bg-green-500 p-2 rounded-md hover:bg-green-200'
							onClick={handleLogout}>
							LogOut
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
