import React, { useEffect } from 'react';
import styled from 'styled-components';

// Stylisation et recentrage de la page du CV
const MainContainerStyle = styled.div`
	max-width: var(--main-container-max-width);
	background-color: #333;
	margin: auto;
	/* outline: 0.5rem solid #222; */
	box-shadow: 0 9px 0px 0px white, 0 -9px 0px 0px white,
		12px 0 15px -4px rgba(31, 73, 125, 0.8),
		-12px 0 15px -4px rgba(31, 73, 125, 0.8);
	height: 100;
`;

const MainContainer = ({ children }) => {
	useEffect(() => {
		console.log('MainContainer', 'useEffect');

		window.scroll({ top: 0, behavior: 'smooth' });

		window.onbeforeunload = (event) => {
			const e = event || window.event;
			console.log('MainContainer', 'prevent unload');
			// Cancel the event
			e.preventDefault();
			if (e) {
				e.returnValue = ''; // Legacy method for cross browser support
			}
			// return ''; // Legacy method for cross browser support
			return undefined;
		};

		return () => {
			if (
				performance.getEntriesByType('navigation')[0].type === 'reload'
			) {
				console.log('MainContainer', 'This page is reloaded');
			} else {
				console.log('MainContainer', 'This page is not reloaded');
			}
			console.warn('App closed');
		};
	}, []);

	return <MainContainerStyle>{children}</MainContainerStyle>;
};

export default MainContainer;
