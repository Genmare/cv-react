import React, {
	useRef,
	useState,
	useEffect,
	useReducer,
	useContext,
} from 'react';
import Sheet from './component/Sheet';
import ToolBar from './component/ToolBar';

import './App.css';
import Login from './component/Connexion/Login';

// import { StyleProvider } from './utils/context';
import MainContainer from './component/MainContainer';
import { getUser, isAuthenticated, signOut } from './firebase-config';

import { reducer } from './utils/reducer';

import { StyleContext } from './utils/context';
import useCVCollection from 'hook/useCvCollection';
import { getUserCVCollection } from './firebase-config';

function App() {
	const isAuthStor = JSON.parse(sessionStorage.getItem('isAuth'));
	console.log('isAuthStor :', isAuthStor);

	const [isAuth, setIsAuth] = useState(isAuthStor);

	const dataStorage = JSON.parse(sessionStorage.getItem('data'));

	const [data, setData] = useState(dataStorage);
	// const [data, setData] = useState(null);

	const { setglobalStyles, setIdent } = useContext(StyleContext);

	// const [dataReducer, dispatch] = useReducer(reducer, null);
	const [dataReducer, dispatch] = useReducer(reducer, dataStorage);

	let isHome = false;

	const storedUid = sessionStorage.getItem('uid');
	const [uid, setUid] = useState(storedUid ?? '');

	// const userDataStor = JSON.parse(sessionStorage.getItem('userData'));
	const email = sessionStorage.getItem('email');
	// const userDataStor = useCVCollection(uid, email);
	// const [userData, setUserData] = useState(
	// 	!userDataStor
	// 		? {
	// 				name: '',
	// 				cvList: [],
	// 		  }
	// 		: userDataStor
	// );
	const [userData, setUserData] = useState({
		name: '',
		cvList: [],
	});

	// useEffect(() => {
	// 	console.log('userDataStor :', userDataStor);

	// 	setUserData(userDataStor);
	// }, [userDataStor]);

	// identifient du doc cv
	// const cvStorage = JSON.parse(sessionStorage.getItem('cv?'));
	const [cv, setCv] = useState(null);

	useEffect(() => {
		console.log('useEffect dataReducer', dataReducer);
		isAuthenticated('App');

		if (!dataReducer && data) dispatch({ type: 'reset', data });

		// return () => {
		// 	console.log('App useEffect isHome', isHome);
		// 	if (
		// 		performance.getEntriesByType('navigation')[0].type === 'reload'
		// 	) {
		// 		console.log('This page is reloaded');
		// 		// if (dataReducer !== null && !isHome) {
		// 		if (dataReducer !== null) {
		// 			console.log(
		// 				"sessionStorage.setItem('data', JSON.stringify(dataReducer)})",
		// 				dataReducer
		// 			);
		// 			// sessionStorage.setItem('data', JSON.stringify(data));
		// 			console.log('App reload dataReducer', dataReducer);
		// 			sessionStorage.setItem('data', JSON.stringify(dataReducer));
		// 		}
		// 	} //else {
		// 	// 		console.log('This page is not reloaded');
		// 	// 		sessionStorage.removeItem('data');
		// 	// 		signOut()
		// 	// 			.then(() => {
		// 	// 				console.log("Déconnexion de l'utilisateur");
		// 	// 				// setIsAuth(false);
		// 	// 				// setData(null);
		// 	// 			})
		// 	// 			.catch((error) =>
		// 	// 				console.log('Déconnexion inpossible:', error)
		// 	// 			);
		// 	// 	}

		// 	// sessionStorage.setItem('isAuth', isAuth);
		// 	console.warn('App closed');
		// 	console.log('App closed dataReducer', dataReducer);
		// 	// sessionStorage.setItem('data', JSON.stringify(dataReducer));

		// 	console.log('-------------------------------------------');
		// };
	}, [isAuth, data, isHome]);

	useEffect(() => {
		sessionStorage.setItem('data', JSON.stringify(dataReducer));
		sessionStorage.setItem('userData', JSON.stringify(userData));
	}, [dataReducer, userData]);

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
		// window.sessionStorage.removeItem('data');
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
								window.sessionStorage.removeItem('data');
								setData(null);
								setCv(null);
								setIdent(null);
								setglobalStyles([]);

								setIsAuth(false);
								console.log('email :', email);

								getUserCVCollection(uid).then((cvs) => {
									console.log(
										'getUserCVCollection email :',
										email
									);
									console.log(
										'getUserCVCollection email :',
										cvs
									);

									setUserData({
										name: email,
										cvList: cvs,
									});
									setIsAuth(true);
								});
								dispatch({ type: 'clear' });
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
					uid={uid}
					setUid={setUid}
				/>
			)}
		</>
		// </StyleProvider>
	);
}

export default App;
