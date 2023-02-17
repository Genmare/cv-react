import GitHubIcon from '@mui/icons-material/GitHub';
import MailIcon from '@mui/icons-material/Mail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import styled from 'styled-components';
import {
	auth,
	getDataFromRef,
	getUser,
	getUserCVCollection,
	provider,
} from '../../firebase-config';

import Animation from '../../Widget/Animation';
import CVChoice from './CVChoice';
import Logout from './Logout';
import { SignIn } from './SingIn';
import { SignUp } from './SignUp';

// import style from '../style/login.module.css';
import { Box, Divider } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useRef } from 'react';

const Container = styled.div`
	/* margin: auto;
	text-align: center; */
	display: flex;
	flex-direction: column;
	align-items: center;
	/* justify-content: center; */
	padding-top: var(--marginTop-homePage);
	background-color: white;
	color: #666;
	min-height: calc(100vh - var(--marginTop-homePage));
	overflow: hidden;
`;

const Div = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

// const GitBut = styled.div`
// 	border-radius: 50%;
// 	transform: translateY(4px);
// 	color: #228;
// 	/* size: 3em; */
// 	&:hover {
// 		color: #822;
// 	}
// `;

const fontSize = '0.7rem';
const themeOptions = createTheme({
	components: {
		MuiInputLabel: {
			styleOverrides: {
				root: {
					fontSize: fontSize,
				},
			},
		},
		MuiList: {
			styleOverrides: {
				root: {
					cursor: 'default',
					'&::-webkit-scrollbar': {
						width: 10,
					},
					'&::-webkit-scrollbar-track': {
						boxShadow: `inset 0 0 6px #009dff57)`,
						backgroundColor: '#efefff',
					},
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: '#efefef',
						outline: `1px solid slategrey`,
						borderRadius: 2,
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					fontSize: fontSize,
					cursor: 'default',
				},
			},
			// Name of the component
			MuiButton: {
				styleOverrides: {
					// Name of the slot
					root: {
						// Some CSS
						fontSize: fontSize,
					},
					endIcon: {
						marginLeft: 0,
						paddingLeft: 0,
						marginRight: '-6px',
					},
				},
			},
			MuiInputAdornment: {
				styleOverrides: {
					root: {
						marginLeft: 0,
						paddingLeft: 0,
					},
				},
			},

			MuiIconButton: {
				styleOverrides: {
					root: {
						marginLeft: 0,
						paddingLeft: 0,
					},
				},
			},
		},
	},
});

const Nav = styled.div`
	position: fixed;
	top: 0.5em;
	right: 2em;

	& ul {
		display: flex;
		align-items: center;
		gap: 1rem;
		list-style-type: none;

		& li {
		}
	}
`;

function NavBar({ logName, logout }) {
	return (
		<Nav>
			<ul>
				<li>{logName}</li>
				<li>
					<Logout logout={logout} />
				</li>
			</ul>
		</Nav>
	);
}

function Login({
	isAuth,
	setIsAuth,
	setData,
	cv,
	setCv,
	userData,
	setUserData,
	logout,
	uid,
	setUid,
}) {
	const [isSignin, setIsSignin] = useState(false);
	const [isSignup, setIsSignup] = useState(false);
	const [error, setError] = useState(null);
	const cvAnchor = useRef(null);

	useEffect(() => {
		console.log('Login useEffect, cv', cv);
		console.log('Login', 'uid:', uid);
		// if (!isAuth) {
		// 	getUser((user) => {
		// 		console.log('Login', 'getUser, uid:', uid);
		// 		console.log('Login', 'getUser user:', user, 'cv:', cv);
		// 		if (user && !cv) {
		// 			console.log('Login userEffect user', user);
		// 			// setUserConnected(user);
		// 			getUserCVCollection(user.uid)
		// 				.then((cvs) => {
		// 					setUserData({
		// 						name: user.email,
		// 						cvList: cvs,
		// 					});
		// 					setIsAuth(true);
		// 				})
		// 				.catch((error) => {
		// 					const errorMsg = `Connection a l'utilisateur ${user.uid} impossible: ${error}`;
		// 					setError(errorMsg);
		// 					console.error(errorMsg);
		// 				});
		// 		} else {
		// 			const errorMsg = `onAuthStateChanged User, aucun utilisateur connecté`;
		// 			console.warn(errorMsg);
		// 		}
		// 	});
		// }
		console.log('Login cv', cv);
		if (cv) {
			getDataFromRef(cv)
				.then((data) => {
					console.log('Login data:', data);
					setData(data);
				})
				.catch((e) => {
					const errorMsg = `Login, impossible de downloader les data: \n${e}`;
					setError(errorMsg);
					console.error(errorMsg);
				});
		}

		// désactive les boutons Signin/Signup
		if (!isAuth) {
			setIsSignin(false);
			setIsSignup(false);
		}

		// scroll sur le composant cvChoice
		if (cvAnchor.current && isAuth) {
			console.log('Login', 'cvAnchor:', cvAnchor);
			cvAnchor.current.scrollIntoView({ behavior: 'smooth' });
		}

		return () => {
			console.warn('Login closed');
		};
	}, [cv, isAuth]);
	// }, [cv, userConnected, isAuth]);

	const signInWithGithub = () => {
		isSignup && setIsSignup(false);
		isSignin && setIsSignin(false);

		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a GitHub Access Token. You can use it to access the GitHub API.
				const credential =
					GithubAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;

				// The signed-in user info.
				const user = result.user;

				// sessionStorage.setItem('isAuth', true);
				console.log(result);
				setIsAuth(true);
			})
			.catch((error) => {
				// Handle Errors here.
				// const errorCode = error.code;
				// const errorMessage = error.message;
				// // The email of the user's account used.
				// const email = error.email;
				// console.log('error', error);
				// // The AuthCredential type that was used.
				// const credential =
				GithubAuthProvider.credentialFromError(error);
				// ...
			});
	};

	// désactive les autres boutons quand un autre est appuyé
	const toggleButton = (isLoginButton) => {
		if (isLoginButton) {
			isSignup && setIsSignup(false);
			setIsSignin(!isSignin);
		} else {
			isSignin && setIsSignin(false);
			setIsSignup(!isSignup);
		}
	};

	// console.log(
	// 	'sessionStorage.getItem(isAuth)',
	// 	sessionStorage.getItem('isAuth')
	// );
	// if (sessionStorage.getItem('isAuth') === 'true') {
	// 	setIsAuth(true);
	// }

	return (
		<>
			<ThemeProvider theme={themeOptions}>
				<Container>
					{isAuth && (
						<NavBar logName={userData.name} logout={logout} />
					)}
					{/* <Typography variant="h3" mb={2} style={{ fontWeight: 600 }}> */}
					<Typography variant="h3" style={{ fontWeight: 600 }}>
						CV MAKER
					</Typography>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-around',
							alignItems: 'center',
							width: 'fit-content',
							// height: 'fit-content(50%)',
							border: (theme) =>
								`1px solid ${theme.palette.divider}`,
							borderRadius: 2,
							bgcolor: 'background.paper',
							color: 'text.secondary',
							m: '1rem 0',
							p: '0 0.3rem',
							'& svg': {
								m: 1,
							},
							'& hr': {
								// mx: 0.5,
							},
						}}
					>
						<Div>
							<Button
								size="small"
								color="inherit"
								variant="outlined"
								onClick={() => toggleButton(true)}
								// endIcon={<PersonAdd />}
								endIcon={<MailIcon />}
								style={{ margin: '1em 0.5em' }}
								disabled={isAuth}
							>
								connexion
							</Button>
							<Button
								// className="Button"
								size="small"
								color="inherit"
								variant="outlined"
								endIcon={<GitHubIcon fontSize="large" />}
								style={{ margin: '1em 0.5em' }}
								onClick={signInWithGithub}
								disabled={isAuth}
							>
								Connexion
							</Button>
							<Divider
								orientation="vertical"
								variant="middle"
								flexItem
							/>
							<Button
								size="small"
								color="inherit"
								variant="outlined"
								onClick={() => toggleButton(false)}
								endIcon={<PersonAddIcon />}
								style={{ margin: '1em 0.5em' }}
								disabled={isAuth}
							>
								S'inscrire
							</Button>
						</Div>
					</Box>
					{isSignin && !isAuth && (
						<Animation>
							<SignIn
								setIsAuth={setIsAuth}
								setUserData={setUserData}
								setUid={setUid}
							/>
						</Animation>
					)}
					{isAuth && (
						<Animation>
							<CVChoice
								ref={cvAnchor}
								userData={userData}
								setUserData={setUserData}
								setCv={setCv}
								uid={uid}
							/>
						</Animation>
					)}
					{isSignup && !isAuth && (
						<Animation>
							<SignUp setIsAuth={setIsAuth} />
						</Animation>
					)}
					{error && <p className="error">{error}</p>}
				</Container>
			</ThemeProvider>
		</>
	);
}

export default Login;
