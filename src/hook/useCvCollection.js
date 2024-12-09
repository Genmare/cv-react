import { useEffect, useState } from 'react';
import { getUserCVCollection } from '../firebase-config';

export default function useCVCollection(uid, email) {
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		// getUserCVCollection(uid).then((cvs) => {
		// 	setUserData({
		// 		name: email,
		// 		cvList: cvs,
		// 	});
		// 	// setIsAuth(true);
		// 	// sessionStorage.setItem('isAuth', true);
		// });
		async function fetchCVs() {
			const cvs = await getUserCVCollection(uid);
			setUserData({
				name: email,
				cvList: cvs,
			});
		}
		fetchCVs();
	}, [uid, email]);

	return userData;
}
