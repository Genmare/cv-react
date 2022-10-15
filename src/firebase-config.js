// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	onAuthStateChanged,
	GithubAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
	signOut as FirebaseSignOut,
} from 'firebase/auth';
import {
	addDoc,
	getFirestore,
	doc,
	setDoc,
	collection,
	getDoc,
	getDocs,
	where,
	limit,
	arrayUnion,
	updateDoc,
} from 'firebase/firestore';
import { getDatabase, ref, set, query } from 'firebase/database';

import dataDoe from './data/data copy.json';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER,
	appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const provider = new GithubAuthProvider();

export async function createUserWithEmailPassword(email, password) {
	console.log('createUserWithEmailAndPassword');
	return createUserWithEmailAndPassword(auth, email, password);
}

/**
 * Ouvre une connexion par email et password durant une session utilisateur
 * @param {string} email
 * @param {string} password
 * @return {Promise<UserCredential>} le résultat de la connexion à Firebase
 */
export async function loginWithEmailAndPassword(email, password) {
	return setPersistence(auth, browserSessionPersistence)
		.then(() => {
			return signInWithEmailAndPassword(auth, email, password);
		})
		.catch((error) =>
			console.error('loginWithEmailAndPassword, error:', error)
		);
}

export async function signOut() {
	return FirebaseSignOut(auth);
}

export async function loadCVData(refDoc) {
	const docRef = doc(db, 'headAndBody', refDoc);
	const mySnapshot = await getDoc(docRef);
	if (mySnapshot.exists()) {
		console.log('loadCVData() result', mySnapshot.data());
		return mySnapshot.data();
	}
}

/**
 * Crée un nouveau doc dans la collection headAndBody
 * @param {number} uid identifiant de l'utilisateur
 * @param {string} cvName nom du document cv
 * @param {map} data données du cv
 */
export async function addNewDoc(uid, cvName, data) {
	console.log('writeNewDoc uid', uid, 'cvName', cvName, 'data', data);

	// création du doc dans la collection de cv headAndBody
	const docRef = await addDoc(collection(db, 'headAndBody'), data);

	// requête demandant si l'uid a déjà un doc de cvs dans 'CV Collection'
	const cvCollection = query(
		collection(db, 'CV Collection'),
		where('userId', '==', uid)
	);

	const querySnapshot = await getDocs(cvCollection);

	if (querySnapshot.docs === 0) {
		// Si pas de doc dans la collection 'CV Collection'
		const result = await addDoc(collection(db, 'CV Collection'), {
			userId: uid,
			cvs: [
				{
					path: docRef,
				},
			],
		});
		return result;
	} else if (querySnapshot.docs > 1) {
		// dimension du docs != 1
		return null; // renvoie une erreur
	}
	// Si l'uid a un doc, on prend la liste des cvs
	// on y ajoute le nouveau doc
	updateDoc(
		querySnapshot.docs[0].ref,
		{
			// userId: uid,
			cvs: arrayUnion({
				name: cvName,
				path: docRef,
			}),
		},
		{ merge: true }
	)
		.then((result) => {
			console.log('Données sauvegardées' + result);
		})
		.catch((err) => console.error(err));
}

/**
 *
 * @param {string[]} id_doc
 * @param {map} data
 */
export function writeData(id_doc, data) {
	console.log('writeData id_doc', id_doc, 'data', data);
	const docRef = doc(db, 'headAndBody', id_doc);
	setDoc(docRef, data, { merge: true })
		.then((result) => console.log('Données sauvegardées' + result))
		.catch((err) => console.error(err));
}
/**
 *
 * @param {DocumentReference} docRef
 * @param {map} data
 */
export function writeDataWithRef(docRef, data) {
	console.log('writeData docRef', docRef, 'data', data);

	setDoc(docRef, data, { merge: true })
		.then((result) => console.log('Données sauvegardées' + result))
		.catch((err) => console.error(err));
}

// creer de nouveau Cv dataDoe pour remplir la collection "headAndBody"
async function writeNewData() {
	const docRef = await addDoc(collection(db, 'headAndBody'), dataDoe);
}
// (async () => {
// 	await writeNewData();
// 	// all of the script....
// })();

export function writeUserData(userId, name, email, imageUrl) {
	const db = getDatabase();
	set(ref(db, 'users/' + userId), {
		username: name,
		email: email,
		profile_picture: imageUrl,
	});
}

async function queryForDocuments() {
	const customerOrdersQuery = query(
		collection(db, 'orders'), // orders est le nom de la collection
		where('drink', '==', 'Latte'), // drink est le nom d'un des champs
		limit(10)
	);
	getDocs(customerOrdersQuery);
}

/**
 * Renvoie la liste des cvs de l'utilisateur
 * @param {string} uid
 * @returns {Array} array des cvs
 */
export async function getUserCVCollection(uid) {
	const cvCollection = query(
		collection(db, 'CV Collection'),
		where('userId', '==', uid)
	);

	// console.log('getUserCVCollection, cvCollection: ', cvCollection);
	const querySnapshot = await getDocs(cvCollection);

	if (querySnapshot.docs === 0) {
		return [];
	} else if (querySnapshot.docs > 1) {
		// dimension du docs != 1
		return null; // renvoie une erreur
	}
	const cvs = await querySnapshot.docs[0].get('cvs');
	// console.log('getUserCVCollection => ', cvs);
	return cvs;
}

export function getDataFromRef(ref) {
	return getDoc(ref).then((documentSnapshot) => {
		return documentSnapshot.data();
	});
}

onAuthStateChanged(auth, (user) => {
	if (user) {
		// const uid = user.uid;
		console.log('onAuthStateChanged, User', user);
	} else {
		console.log('onAuthStateChanged User, aucun utilisateur connecté');
	}
});
console.log('Chargement firebase-config, User');

/**
 * créer un observer quand l'utilisateur est authentifié
 * @callback userOnChange
 * @param {NextOrObserver<User>} userOnChange
 */
export function getUser(userOnChange) {
	onAuthStateChanged(auth, userOnChange);
}
