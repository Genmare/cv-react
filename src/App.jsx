import React, { useRef, useState, useEffect, useReducer, useContext } from 'react';
import Sheet from './component/Sheet';
import ToolBar from './component/ToolBar';

import './App.css';
import Login from './component/Connexion/Login';

import { StyleProvider } from './utils/context';
import MainContainer from './component/MainContainer';
import { signOut } from './firebase-config';

import { reducer } from './utils/reducer';

import { StyleContext } from './utils/context';


function App() {
	const [isAuth, setIsAuth] = useState(false);

	const [data, setData] = useState(null);

	const { setglobalStyles, setIdent } = useContext(StyleContext);

	const [dataReducer, dispatch] = useReducer(reducer, null);

	let isHome = false;

	const [userData, setUserData] = useState({
		name: '',
		cvList: [],
	});

	// identifient du doc cv
	const [cv, setCv] = useState(null);

	useEffect(() => {
		console.log('useEffect dataReducer', dataReducer);

		window.onbeforeunload = (event) => {
			const e = event || window.event;
			console.log('prevent unload');
			// Cancel the event
			e.preventDefault();
			if (e) {
				e.returnValue = ''; // Legacy method for cross browser support
			}
			// return ''; // Legacy method for cross browser support
			return undefined;
		};

		let dataStorage = null;
		if (data === null) {
			dataStorage = sessionStorage.getItem('data');
			console.log('dataStorage', dataStorage);
			if (dataStorage !== null) {
				dispatch({ type: 'reset', dataStorage });
				setData(JSON.parse(dataStorage));
			}
		} else {
			dataStorage = dataReducer ?? data;

			// console.log(`sessionStorage.setItem('data', ${dataReducer})`);
			console.log(`sessionStorage.setItem('data', ${dataStorage})`);
			if (!dataReducer) dispatch({ type: 'reset', data });
			sessionStorage.setItem('data', JSON.stringify(dataStorage));
		}
		return () => {
			console.log('App useEffect isHome', isHome);
			if (
				performance.getEntriesByType('navigation')[0].type === 'reload'
			) {
				console.log('This page is reloaded');
				if (dataReducer !== null && !isHome) {
					console.log(
						"sessionStorage.setItem('data', JSON.stringify(data)})",
						dataReducer
					);
					sessionStorage.setItem('data', JSON.stringify(data));
				}
			} else {
				console.log('This page is not reloaded');
				sessionStorage.clear();
				signOut()
					.then(() => {
						console.log("Déconnexion de l'utilisateur");
						// setIsAuth(false);
						// setData(null);
					})
					.catch((error) =>
						console.log('Déconnexion inpossible:', error)
					);
			}
		};
	}, [isAuth, dataReducer, data]);

	const [color, setColor] = useState('white');

	const [item, setItem] = useState({
		isClass: true,
		name: '',
	});

	const rgba2hex = (rgba) =>
		`#${rgba
			.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
			.slice(1)
			.map((n, i) =>
				(i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
					.toString(16)
					.padStart(2, '0')
					.replace('NaN', '')
			)
			.join('')}`;

	const changeBgColor = (value) => {
		if (item != null) {
			// element.style.backgroundColor = value;

			if (item.isClass) {
				for (const el of document.getElementsByClassName(item.name)) {
					el.style.backgroundColor = value;
				}
				setColor(value);
			}
		}
	};

	const handleClick = (e) => {
		e.stopPropagation();
		const cible = e.target;
		// const cible = e.currentTarget;
		const cl = cible.className;

		const styles = window.getComputedStyle(cible); // get computed style of element

		if (document.getElementsByClassName(cl).length !== 0) {
			setItem({ isClass: true, name: cl });
		} else {
			setItem({ isClass: false, name: cl });
		}
		setColor(rgba2hex(styles.getPropertyValue('background-color')));

		makeBorder(cible);
		// findEntityByProperty(cible, 'background');
	};

	// Ajout d'un bord momentané sur le composant sélectionné
	const makeBorder = (entity) => {
		entity.classList.add('border');
		setTimeout(() => {
			entity.classList.remove('border');
		}, 10 * 60);
	};

	/**
	 * déconnecte l'utilisateur
	 */
	const logout = () => {
		isHome = true;
		window.sessionStorage.clear();
		setData(null);
		dispatch({ type: 'clear' });
		setCv(null);
		setIsAuth(false);
		setIdent(null);
		setglobalStyles([]);
	};

	// retourne le premier élément possedant la propriété
	// const findEntityByProperty = (entity, property) => {
	// 	let styles = styler(entity).get(['background']);
	// };
	// utiliser pour exporter le CV en pdf via le comporsant ToolBar
	const componentRef = useRef(null);
	// console.log('isAuth', isAuth, 'data', data);

	return (
		// <StyleProvider>
		<>
			{isAuth && dataReducer ? (
				// {data ? (
				<MainContainer>
					<div id="App">
						<Sheet
							data={dataReducer}
							dispatch={dispatch}
							// initData={initData}
							onClick={handleClick}
							changeBgColor={changeBgColor}
							ref={componentRef}
						/>
						<ToolBar
							id_doc={cv}
							data={dataReducer}
							dispatch={dispatch}
							setIsAuth={setIsAuth}
							componentRef={componentRef}
							toHome={() => {
								isHome = true;
								window.sessionStorage.clear();
								setData(null);
								dispatch({ type: 'clear' });
								setCv(null);
								setIdent(null);
								setglobalStyles([]);
							}}
							logout={logout}
						/>
					</div>
				</MainContainer>
			) : (
				<Login
					isAuth={isAuth}
					setIsAuth={setIsAuth}
					setData={setData}
					cv={cv}
					setCv={setCv}
					userData={userData}
					setUserData={setUserData}
					logout={logout}
				/>
			)}
			
			</>
		// </StyleProvider>
	);
}

export default App;
