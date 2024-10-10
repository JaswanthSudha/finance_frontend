import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Si from './pages/Si';
import Lo from './pages/Lo';
import Chatbot from './pages/Chatbot';
import useUserContext from '../src/hooks/UseContext';
import Profile from './pages/Profile';
import './App.css';
import Navbar from './components/Navbar';
import image from './images/image.png';
import Community from './pages/Community';

const App = () => {
	const { user } = useUserContext();

	return (
		<div
			className='w-screen h-screen  text-white bg-[#202021] '
			style={{
				position: 'fixed',
				scrollBehavior: 'smooth',
			}}>
			<BrowserRouter>
				{<Navbar></Navbar>}

				<Routes>
					<Route
						path='/'
						element={user ? <Chatbot /> : <Navigate to='/login' />}
					/>
					<Route
						path='/login'
						element={user ? <Navigate to='/chatbot' /> : <Lo />}
					/>
					<Route
						path='/signup'
						element={user ? <Navigate to='/chatbot' /> : <Si />}
					/>
					<Route
						path='/chatbot'
						element={!user ? <Navigate to='/login' /> : <Chatbot />}
					/>
					<Route
						path='/profile'
						element={user ? <Profile /> : <Lo />}
					/>
					<Route
						path='/community'
						element={user ? <Community /> : <Lo />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
export default App;
