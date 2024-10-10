import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from "@mui/material/Link";
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import useUserContext from '../hooks/UseContext';
import { url } from '../constants/url';

function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			InputProps={{ style: { color: 'white' } }}
			align='center'
			{...props}>
			{'Copyright © '}
			<Link
				color='inherit'
				href='https://mui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const defaultTheme = createTheme();

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const obj = { email, password };
	const { dispatch } = useUserContext();

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const response = await fetch(`${url}/api/v1/user/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(obj),
		});
		const json = await response.json();
		setTimeout(() => {
			if (json.message) {
				alert(json.message);
			}
			if (json.user) {
				localStorage.setItem('user', JSON.stringify(json.user));
				dispatch({ type: 'LOGIN', payload: json.user });
			} else {
				console.log('Wrong Credentials');
			}
			if (json.token) {
				localStorage.setItem('token', JSON.stringify(json.token));
			}
			setLoading(false);
		}, [2000]);
	};

	return (
		<div className='flex  justify-center h-screen'>
			<ThemeProvider theme={defaultTheme}>
				<Container
					component='main'
					maxWidth='xs'>
					<CssBaseline />
					<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}>
						<Typography
							className='font-bold text-white'
							component='h1'
							variant='h5'>
							Login In
						</Typography>
						<Box
							component='form'
							onSubmit={handleSubmit}
							noValidate
							sx={{ mt: 1 }}>
							<TextField
								sx={{
									'& .MuiOutlinedInput-root': {
										'& fieldset': {
											borderColor: 'black',
											borderWidth: '2px', // Make the border thicker
										},
										'&:hover fieldset': {
											borderColor: '#90CAF9', // Light blue on hover
										},
										'&.Mui-focused fieldset': {
											borderColor: '#1976D2', // Darker blue when focused
											boxShadow: '0 0 10px #1976D2', // Add subtle shadow on focus
										},
										transition: 'border-color 0.3s ease, box-shadow 0.3s ease', // Smooth transition
									},
								}}
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								autoFocus
								onChange={(e) => setEmail(e.target.value)}
								InputProps={{
									style: { color: 'white' }, // Input text color
								}}
								InputLabelProps={{
									style: { color: 'white' }, // Placeholder text color
								}}
							/>
							<TextField
								sx={{
									'& .MuiOutlinedInput-root': {
										'& fieldset': {
											borderColor: 'black',
											borderWidth: '2px', // Make the border thicker
										},
										'&:hover fieldset': {
											borderColor: '#90CAF9', // Light blue on hover
										},
										'&.Mui-focused fieldset': {
											borderColor: '#1976D2', // Darker blue when focused
											boxShadow: '0 0 10px #1976D2', // Add subtle shadow on focus
										},
										transition: 'border-color 0.3s ease, box-shadow 0.3s ease', // Smooth transition
									},
								}}
								margin='normal'
								required
								fullWidth
								id='password'
								label='Password'
								name='email'
								autoComplete='password'
								autoFocus
								onChange={(e) => setPassword(e.target.value)}
								InputProps={{
									style: { color: 'white' }, // Input text color
								}}
								InputLabelProps={{
									style: { color: 'white' }, // Placeholder text color
								}}
							/>
							<FormControlLabel
								control={
									<Checkbox
										value='remember'
										onClick={(e) => setShowPassword(e.target.checked)}
										color='primary'
									/>
								}
								className='text-white'
								label='Show Password'
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}>
								{loading ? <p>Loading...</p> : <p>Login in</p>}
							</Button>
							<Grid container>
								<Grid
									item
									xs>
									<Link
										className='text-white'
										href='#'
										variant='body2'>
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link
										to='/signup'
										className='text-white'
										href='#'
										variant='body2'>
										{"Don't have an account? "}
										<span className='border-2 border-blue-500 p-1 text-white rounded-lg'>
											SignUp
										</span>
									</Link>
								</Grid>
								{error && (
									<div className='text-center w-full mt-[25px] '>
										<p className='bg-red-200 p-[10px] rounded-lg'>{error}</p>
									</div>
								)}
							</Grid>
						</Box>
					</Box>
					<Copyright sx={{ mt: 8, mb: 4 }} />
				</Container>
			</ThemeProvider>
		</div>
	);
}
