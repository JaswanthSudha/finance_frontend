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
			className='text-white'
			variant='body2'
			color='text.primary'
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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const { user, dispatch } = useUserContext();
	const [showPassword, setShowPassword] = useState(false);
	async function handleSubmit(e) {
		e.preventDefault();
		const obj = {
			email,
			password,
			name,
		};
		if (!password || !email || !name) {
			alert('Please fill all the fields');
		}
		console.log(obj);
		const response = await fetch(`${url}/api/v1/user/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(obj),
		});
		const json = await response.json();
		if (json) {
			console.log(json);
		}
		//json.token
		localStorage.setItem('user', JSON.stringify(json.user));
		localStorage.setItem('token', JSON.stringify(json.token));
		dispatch({ type: 'LOGIN', payload: json.user });
	}

	return (
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
					{/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar> */}
					<Typography
						className=''
						component='h1'
						variant='h5'>
						Sign in
					</Typography>
					<Box
						style={{
							color: 'white',
						}}
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
							label='Name'
							name='name'
							autoComplete='name'
							autoFocus
							onChange={(e) => setName(e.target.value)}
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
							id='email'
							label='Password'
							name='password'
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
							className='text-white'
							control={
								<Checkbox
									value='remember'
									onClick={(e) => setShowPassword(e.target.checked)}
									color='primary'
								/>
							}
							label='Show Password'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>
						<Grid container>
							<Grid
								item
								xs>
								<Link
									className=''
									href='#'
									variant='body2'>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link
									to='/login'
									className=''
									href='#'
									variant='body2'>
									{'Already Have An Account?'}
									<span className='border-2 border-blue-500 p-2 ml-2 rounded-lg'>
										LogIn
									</span>
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}
