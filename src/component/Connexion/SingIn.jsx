import {
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { AnimationV2 } from '../../Widget/Animation';

import {
	loginWithEmailAndPassword,
	getUserCVCollection,
} from '../../firebase-config';

export const SignIn = ({ setIsAuth, setUserData }) => {
	const [emailValidate, setEmailValidate] = useState(true);
	const [pwValidate, setPwValidate] = useState(true);
	const [values, setValues] = React.useState({
		login: '',
		password: '',
		showPassword: false,
		firebaseResponse: true,
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleChange = (prop) => (event) => {
		// console.log('handleChange', prop);

		if (prop === 'password') {
			let pwStateChanged = isPWValidated(event);
			// console.log('handleChange', event.target.value, pwStateChanged);
			if (pwStateChanged !== pwValidate) setPwValidate(pwStateChanged);
		} else {
			let emailStateChanged = isEmailValidated(event);
			// console.log('handleChange', event.target.value, emailStateChanged);
			if (emailStateChanged !== emailValidate)
				setEmailValidate(emailStateChanged);
		}
		if (!values.firebaseResponse) {
			setValues({
				...values,
				[prop]: event.target.value,
				firebaseResponse: true,
			});
		} else setValues({ ...values, [prop]: event.target.value });
	};

	const isEmailValidated = (event) => {
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
			event.target.value
		);
	};

	const isPWValidated = (event) => {
		return /^\w{8,}$/.test(event.target.value);
	};

	const isValidated = () => {
		return (
			pwValidate &&
			emailValidate &&
			values.login !== '' &&
			values.password !== ''
		);
	};

	const handleClickLoading = () => {
		// Firebase promise
		setIsLoading(true);
		loginWithEmailAndPassword(values.login, values.password)
			.then((result) => {
				setIsLoading(false);
				getUserCVCollection(result.user.uid).then((cvs) => {
					setUserData({
						name: result.user.email,
						cvList: cvs,
					});
					setIsAuth(true);
				});
			})
			.catch((error) => {
				setIsLoading(false);
				setValues({ ...values, firebaseResponse: false, password: '' });
				console.error(
					'handleClickLoading, Connexion impossible :',
					error
				);
			});
	};

	useEffect(() => {
		const handleEnter = (event) => {
			if (event.keyCode === 13 && isValidated()) {
				handleClickLoading();
			}
		};
		window.addEventListener('keydown', handleEnter);

		return () => {
			window.removeEventListener('keydown', handleEnter);
		};
	});

	return (
		<Stack spacing={1}>
			<FormControl sx={{ width: '25ch' }} variant="outlined" size="small">
				<TextField
					id="outlined-email"
					size="small"
					type={'text'}
					value={values.login}
					onChange={handleChange('login')}
					error={!emailValidate}
					label="Adresse mail"
				/>
			</FormControl>
			<AnimationV2 show={!emailValidate}>
				<FormHelperText
					id="component-error-text"
					style={{ fontSize: '0.5em' }}
				>
					<strong>Format:</strong> <em>chaîne_alphanumérique</em>
					<strong>@</strong>
					<em>nom_de_domaine</em>
					<strong>.</strong>
					<em>suffixe</em>
				</FormHelperText>
			</AnimationV2>
			<FormControl sx={{ width: '25ch' }} variant="outlined" size="small">
				<TextField
					id="outlined-adornment-password"
					type={values.showPassword ? 'text' : 'password'}
					value={values.password}
					onChange={handleChange('password')}
					error={!pwValidate || !values.firebaseResponse}
					size="small"
					// helperText={!validate && 'Incorrect entry.'}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{!values.showPassword ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						),
					}}
					label="Mot de passe"
				/>
				<AnimationV2 show={!pwValidate || !values.firebaseResponse}>
					<FormHelperText
						id="component-error-text"
						style={{ fontSize: '0.5em' }}
					>
						{values.firebaseResponse
							? 'Au moins 8 caractères et nombres, pas de caractères spéciaux'
							: 'Mot de pass invalide'}
					</FormHelperText>
				</AnimationV2>
				<LoadingButton
					size="small"
					onClick={handleClickLoading}
					disabled={!isValidated()}
					loading={isLoading && values.firebaseResponse}
					variant="outlined"
				>
					Valider
				</LoadingButton>
			</FormControl>
		</Stack>
	);
};
