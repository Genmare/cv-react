import React, { useEffect, useState } from 'react';
import {
	FormControl,
	// InputLabel,
	FormHelperText,
	// OutlinedInput,
	InputAdornment,
	IconButton,
	// useFormControl,
	Stack,
	TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { Send, Visibility, VisibilityOff } from '@mui/icons-material';
import Animation, { AnimationV2 } from '../../Widget/Animation';
import { createUserWithEmailPassword } from '../../firebase-config';
// import Fade from '../Widget/Fade';

// function MyFormHelperText() {
// 	const { focused } = useFormControl() || {};

// 	const helperText = React.useMemo(() => {
// 		if (focused) {
// 			return 'This field is being focused';
// 		}

// 		return '';
// 	}, [focused]);

// 	return <FormHelperText error>{helperText}</FormHelperText>;
// }

export const SignUp = ({ setIsAuth }) => {
	const [emailValidate, setEmailValidate] = useState(true);
	const [pwValidate, setPwValidate] = useState(true);
	const [confirmationVal, setConfirmationVal] = useState(true);
	const [values, setValues] = useState({
		login: '',
		password: '',
		confirmation: '',
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
		console.log('handleChange', prop);
		let confirmationStateChanged;
		switch (prop) {
			case 'login':
				let emailStateChanged = isEmailValidated(event);
				if (emailStateChanged !== emailValidate)
					setEmailValidate(emailStateChanged);
				break;
			case 'password':
				let pwStateChanged = isPWValidated(event);
				if (pwStateChanged !== pwValidate) {
					setPwValidate(pwStateChanged);
					// Vérifier si le mot de passe est le même que celui déjà rempli dans le champ 'confirmation'
					confirmationStateChanged =
						event.target.value === values.confirmation;
					if (confirmationStateChanged !== confirmationVal)
						setConfirmationVal(confirmationStateChanged);
				}
				break;
			case 'confirmation':
				confirmationStateChanged =
					event.target.value === values.password;
				if (confirmationStateChanged !== confirmationVal)
					setConfirmationVal(confirmationStateChanged);
				break;
			default:
				break;
		}
		if (!values.firebaseResponse) {
			setValues({
				...values,
				[prop]: event.target.value,
				firebaseResponse: true,
			});
		} else setValues({ ...values, [prop]: event.target.value });
	};

	// Test la validité de l'email
	const isEmailValidated = (event) => {
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
			event.target.value
		);
	};

	// Test la validité du mot de passe
	const isPWValidated = (event) => {
		return /^\w{8,}$/.test(event.target.value);
	};

	const isValidated = () => {
		return (
			pwValidate &&
			emailValidate &&
			confirmationVal &&
			values.login !== '' &&
			values.password !== '' &&
			values.confirmation !== ''
		);
	};

	const handleClickLoading = () => {
		setIsLoading(true);
		createUserWithEmailPassword(values.login, values.password)
			.then(({ user }) => {
				console.log('user', user);
				setIsLoading(false);
				setIsAuth(true);
			})
			.catch((error) => {
				setIsLoading(false);
				setValues({
					...values,
					firebaseResponse: false,
					password: '',
					confirmation: '',
				});
				console.error('Inscription impossible :', error);
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
					type={'text'}
					value={values.login}
					onChange={handleChange('login')}
					error={!emailValidate || !values.firebaseResponse}
					size="small"
					label="Adresse mail"
				/>
			</FormControl>
			<AnimationV2 show={!emailValidate || !values.firebaseResponse}>
				<FormHelperText
					id="component-error-text"
					style={{ fontSize: '0.5em' }}
				>
					{values.firebaseResponse ? (
						<>
							<strong>Format:</strong>{' '}
							<em>chaîne_alphanumérique</em>
							<strong>@</strong>
							<em>nom_de_domaine</em>
							<strong>.</strong>
							<em>suffixe</em>
						</>
					) : (
						'Cette adresse mail est déjà utilisée.'
					)}
				</FormHelperText>
			</AnimationV2>
			<FormControl sx={{ width: '25ch' }} variant="outlined" size="small">
				<TextField
					id="outlined-adornment-password"
					type={values.showPassword ? 'text' : 'password'}
					value={values.password}
					onChange={handleChange('password')}
					error={!pwValidate}
					size="small"
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
			</FormControl>

			<FormControl sx={{ width: '25ch' }} variant="outlined" size="small">
				<TextField
					id="outlined-adornment-conf-password"
					type={values.showPassword ? 'text' : 'password'}
					value={values.confirmation}
					onChange={handleChange('confirmation')}
					disabled={values.password === '' || !pwValidate}
					error={!confirmationVal}
					size="small"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle confirmation visibility"
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
					label="Confirmation"
				/>
				<AnimationV2 show={!pwValidate || !confirmationVal}>
					<FormHelperText
						id="component-error-text"
						style={{ fontSize: '0.5em' }}
					>
						{!pwValidate &&
							'Au moins 8 caractères et nombres, pas de caractères spéciaux'}
						{!confirmationVal &&
							'Le mot de passe doit être identique'}
					</FormHelperText>
				</AnimationV2>
				<LoadingButton
					size="small"
					onClick={handleClickLoading}
					disabled={!isValidated()}
					loading={isLoading}
					variant="outlined"
					// loadingPosition="end"
					// startIcon={<Send />}
					// style={{ marginTop: '40.5px' }}
				>
					Valider
				</LoadingButton>
			</FormControl>
		</Stack>
	);
};
