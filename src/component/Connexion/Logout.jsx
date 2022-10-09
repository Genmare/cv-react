import React from 'react';
import { signOut } from '../../firebase-config';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import styled from 'styled-components';

const Div = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: center;

	height: 100%;
`;

function Logout({ setIsAuth }) {
	const signUserOut = () => {
		signOut()
			.then(() => {
				setIsAuth(false);
				sessionStorage.clear();
				console.log("Déconnexion de l'utilisateur");
			})
			.catch((error) => console.log('Déconnexion inpossible:', error));
	};

	return (
		<Div>
			{/* <button className="button" onClick={signUserOut}>
				Logout
			</button> */}
			<Button
				size="small"
				color="inherit"
				variant="outlined"
				onClick={signUserOut}
				endIcon={<LogoutIcon />}
			>
				déconnexion
			</Button>
		</Div>
	);
}

export default Logout;
