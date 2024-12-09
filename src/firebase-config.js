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
	deleteDoc,
	getFirestore,
	doc,
	setDoc,
	collection,
	getDoc,
	getDocs,
	where,
	query,
	arrayUnion,
	arrayRemove,
	updateDoc,
	Timestamp,
} from 'firebase/firestore';
import {
	deleteObject,
	getDownloadURL,
	getStorage,
	listAll,
	ref,
	uploadBytes,
} from 'firebase/storage';
// import { getDatabase, ref, set } from 'firebase/database';

import dataDoe from './data/data copy.json';
import Photo from './model/Photo';

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

function getCvCollection() {
	uid = auth.currentUser.uid;

	const cvCollection = query(
		collection(db, 'CV Collection'),
		where('userId', '==', uid)
	);

	return cvCollection;
}

/**
 * Crée un nouveau doc dans la collection headAndBody
 * @param {number} uid identifiant de l'utilisateur
 * @param {string} cvName nom du document cv
 * @param {map} data données du cv
 * @returns {DocumentReference<map> | null} renvoie une Promise de la docRef ou null
 */
export async function addNewDoc(uid, cvName, data) {
	console.log('addNewDoc uid', uid, 'cvName', cvName, 'data', data);

	// création du doc dans la collection de cv headAndBody
	const docRef = await addDoc(collection(db, 'headAndBody'), data);

	console.log('addNewDoc docRef', docRef, 'db:', db.app);

	// requête demandant si l'uid a déjà un doc de cvs dans 'CV Collection'
	// const cvCollection = query(
	// 	collection(db, 'CV Collection'),
	// 	where('userId', '==', uid)
	// );
	const cvCollection = getCvCollection();

	console.log('addNewDoc', 'cvCollection:', cvCollection);
	console.log('addNewDoc', 'userId:', uid);

	let querySnapshot = await getDocs(cvCollection);

	console.log('addNewDoc', 'querySnapshot:', querySnapshot);

	if (querySnapshot.docs.length === 0) {
		// Si pas de doc dans la collection 'CV Collection'
		const newCVCollect = await addDoc(collection(db, 'CV Collection'), {
			userId: uid,
			cvs: [
				{
					path: docRef,
				},
			],
		});

		querySnapshot = await getDocs(newCVCollect);

		await updateDoc(
			querySnapshot.docs[0].ref,
			{
				// userId: uid,
				cvs: arrayUnion({
					name: cvName,
					path: docRef,
				}),
			},
			{
				merge: true,
				// timestamp: serverTimestamp()
			}
		);
		console.log('Données sauvegardées, docRef:', docRef);
		return docRef; // ?
	} else if (querySnapshot.docs.length > 1) {
		// dimension du docs != 1
		return null; // renvoie une erreur
	}
	// Si l'uid a un doc, on prend la liste des cvs
	// on y ajoute le nouveau doc
	// updateDoc(
	// 	querySnapshot.docs[0].ref,
	// 	{
	// 		// userId: uid,
	// 		cvs: arrayUnion({
	// 			name: cvName,
	// 			path: docRef,
	// 		}),
	// 	},
	// 	{
	// 		merge: true,
	// 		// timestamp: serverTimestamp()
	// 	}
	// )
	// 	.then(() => {
	// 		console.log('Données sauvegardées, docRef:', docRef);
	// 		return docRef; // ?
	// 	})
	// 	.catch((err) => {
	// 		console.error(err);
	// 		return null;
	// 	});

	console.log('addNewdoc', 'avant updateDoc');
	await updateDoc(
		querySnapshot.docs[0].ref,
		{
			// userId: uid,
			cvs: arrayUnion({
				name: cvName,
				path: docRef,
			}),
		},
		{
			merge: true,
			// timestamp: serverTimestamp()
		}
	);
	console.log('Données sauvegardées, docRef:', docRef);
	return docRef; // ?
}

export async function deleteDocCv(uid, cv) {
	// suppression du doc cv dans la collection headAndBody
	await deleteDoc(cv.path);

	// const cvCollection = query(
	// 	collection(db, 'CV Collection'),
	// 	where('userId', '==', uid)
	// );

	const cvCollection = getCvCollection();

	// const docRef = await addDoc(collection(db, 'headAndBody'), data);

	const querySnapshot = await getDocs(cvCollection);

	console.log('querySnapshot.docs[0].ref:', querySnapshot.docs[0].ref);

	if (querySnapshot.docs.length === 0) {
		// Si pas de doc dans la collection 'CV Collection'
		return null;
	} else if (querySnapshot.docs.length > 1) {
		// dimension du docs != 1
		return null; // renvoie une erreur
	}

	// const cvs = await querySnapshot.docs[0].get('cvs');
	// if(cvs.length === 1) {

	await updateDoc(querySnapshot.docs[0].ref, {
		cvs: arrayRemove(cv),
	});
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

/**
 * Renvoie la liste des cvs de l'utilisateur
 * @param {string} uid
 * @returns {Array} array des cvs
 */
export async function getUserCVCollection(uid) {
	const cvCollection = getCvCollection();

	const querySnapshot = await getDocs(cvCollection);

	if (querySnapshot.docs.length === 0) {
		return [];
	} else if (querySnapshot.docs.length > 1) {
		// dimension du docs != 1
		return null; // renvoie une erreur
	}
	const cvs = await querySnapshot.docs[0].get('cvs');
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
		console.warn('onAuthStateChanged, User', user);
	} else {
		console.warn('onAuthStateChanged User, aucun utilisateur connecté');
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

let uid = null;

export async function isAuthenticated(className) {
	auth.onAuthStateChanged(function (user) {
		if (user) {
			// const uid = user.uid;
			console.warn(className, 'onAuthStateChanged, User', user);
			uid = user.uuid;
		} else {
			console.warn(
				className,
				'onAuthStateChanged User, aucun utilisateur connecté'
			);
			uid = null;
		}
	});
	// return new Promise((resolve, reject) =>
	// 	auth.onAuthStateChanged(resolve, reject)
	// );
}

// Storage
const storage = getStorage();
export const cvDefaultName = 'cv-max.bmp';
export const cvDefaultUri = `gs://cv-react-b26d1.appspot.com/${cvDefaultName}`;
// Create a reference from a Google Cloud Storage URI

// Get the download URL
// export const getImageUrl = (imgName, onLoad, directory) => {
export const getImageUrl = (imgName, onLoad, directory) => {
	uid = auth.currentUser?.uid ?? sessionStorage.getItem('uid');
	console.log('getImageUrl, uid :', uid);

	const cvUri = `gs://cv-react-b26d1.appspot.com/${uid}/${imgName}`;
	console.log('cvUri', cvUri);

	const gsReference = ref(storage, cvUri);
	getDownloadURL(gsReference)
		.then((url) => {
			// Insert url into an <img> tag to "download"
			console.log('url', url);
			onLoad(url);
		})
		.catch((error) => {
			// A full list of error codes is available at
			// https://firebase.google.com/docs/storage/web/handle-errors
			switch (error.code) {
				case 'storage/object-not-found':
					console.err(`L'image ${cvDefaultName} n'existe pas`, error);
					break;
				case 'storage/unauthorized':
					// User doesn't have permission to access the object
					console.err(
						`L'utilisateur n'a pas accès à l'image ${cvDefaultName}`
					);
					break;
				case 'storage/canceled':
					// User canceled the upload
					console.warn(
						`L'utilisateur a annuler le téléchargement de l'image ${cvDefaultName}`
					);
					break;
				case 'storage/unknown':
					// Unknown error occurred, inspect the server response
					console.error('Erreur inconnue:', error);
					break;
				default:
			}
		});
};

// const cvUri = `gs://cv-react-b26d1.appspot.com/${uid}/${imgName}`;

// Get the download URL
// imgFullPath: ex cv-react-b26d1.appspot.com/exemple.jpg
export const getImageUrlFromFullPath = (imgFullPath, onLoad) => {
	const cvUri = `gs://${imgFullPath}`;

	uid = auth.currentUser.uid;
	console.log('cvUri', cvUri);

	const gsReference = ref(storage, cvUri);
	getDownloadURL(gsReference)
		.then((url) => {
			// Insert url into an <img> tag to "download"
			console.log('url', url);
			onLoad(url);
		})
		.catch((error) => {
			// A full list of error codes is available at
			// https://firebase.google.com/docs/storage/web/handle-errors
			switch (error.code) {
				case 'storage/object-not-found':
					console.err(`L'image ${cvDefaultName} n'existe pas`, error);
					break;
				case 'storage/unauthorized':
					// User doesn't have permission to access the object
					console.err(
						`L'utilisateur n'a pas accès à l'image ${cvDefaultName}`
					);
					break;
				case 'storage/canceled':
					// User canceled the upload
					console.warn(
						`L'utilisateur a annuler le téléchargement de l'image ${cvDefaultName}`
					);
					break;
				case 'storage/unknown':
					// Unknown error occurred, inspect the server response
					console.error('Erreur inconnue:', error);
					break;
				default:
			}
		});
};

export const getImageUrlFromUidDirectory = (onLoad) => {
	// Create a reference under which you want to list
	const listRef = ref(storage, uid);

	// Find all the prefixes and items.
	listAll(listRef)
		.then((res) => {
			res.items.forEach((itemRef) => {
				// All the items under listRef.
				getImageUrlFromFullPath(
					`${itemRef.bucket}/${itemRef.fullPath}`,
					(url) => onLoad(url, itemRef.name)
				);
			});
		})
		.catch((error) => {
			// Uh-oh, an error occurred!
			console.err('Impossible de charger les images:', error);
		});
};

async function getImagesSubCollection() {
	const cvCollection = getCvCollection();

	let querySnapshot = await getDocs(cvCollection);

	console.log('getImagesCollection', 'querySnapshot:', querySnapshot);

	if (querySnapshot.docs.length === 1) {
		return collection(
			db,
			'CV Collection',
			querySnapshot.docs[0].id,
			'images'
		);
	}
	return null;
}

export async function getImageUrlFromCollection() {
	uid = auth.currentUser.uid;

	const photosCollec = await getImagesSubCollection();
	if (photosCollec) {
		const photoDoc = await getDocs(photosCollec);
		console.log('uploadPhotos', 'photDoc.docs', photoDoc.docs);
		let photoSet = [];
		photoDoc.docs.forEach((photo) => {
			// console.log('uploadPhotos, photo', photo.data());

			photoSet.push(
				new Photo(
					photo.data().name,
					photo.data().url,
					photo.data().timestamp.seconds
				)
				// new Photo(photo.data().name, photo.data().url, Date.now())
			);
		});
		console.log('uploadPhotos, photSet:', photoSet);
		return photoSet;
	}
	// else if (querySnapshot.docs.length > 1) {
	// 	// dimension du docs != 1
	// 	return null; // renvoie une erreur
	// }
}

export function uploadImage(file, onLoad) {
	console.log('uploadImage currenUser', auth.currentUser);
	uid = auth.currentUser.uid;

	const imageRef = ref(storage, `${uid}/${file.name}`);

	// 'file' comes from the Blob or File API
	uploadBytes(imageRef, file).then((snapshot) => {
		console.log('Uploaded a blob or file!');
		onLoad();
	});
}

export async function uploadImageToCollection(file, onLoad) {
	console.log('uploadImage currenUser', auth.currentUser, 'file', file);
	uid = auth.currentUser.uid;

	const imageRef = ref(storage, `${uid}/${file.name}`);

	// First of all we upload the file into Firestore
	const uploadResult = await uploadBytes(imageRef, file);

	// const timestamp = uploadResult.metadata.timeCreated;
	// console.log('uploadImageToCollection, uploadResult', uploadResult);

	// We get the download URL
	const cvUri = `gs://${uploadResult.metadata.bucket}/${uploadResult.metadata.fullPath}`;
	console.log('uploadImageToCollection, cvUri', cvUri);

	const gsReference = ref(storage, cvUri);
	const url = await getDownloadURL(gsReference);

	if (!url) {
		return null;
	}

	console.log('uploadImageToCollection, url', url);

	// We update the data of the 'image' collection
	const photosCollec = await getImagesSubCollection();
	if (photosCollec) {
		const newCVCollect = await addDoc(photosCollec, {
			name: file.name,
			timestamp: Timestamp.now(), // Date.parse(timestamp)
			url,
		});

		onLoad();
		return newCVCollect;
	}
}

export async function deleteImageFromCollection(file, onLoad) {
	uid = auth.currentUser.uid;

	// Create a reference to the file to delete
	const imageRef = ref(storage, `${uid}/${file.name}`);

	// Delete the file
	const deleteResult = await deleteObject(imageRef);

	const photosCollec = await getImagesSubCollection();
	console.log('deleteImageFromCollection, photosCollec', photosCollec);
	if (photosCollec) {
		const queryRef = query(photosCollec, where('name', '==', file.name));
		console.log('deleteImageFromCollection, queryRef', queryRef);

		const querySnapshot = await getDocs(queryRef);
		console.log('deleteImageFromCollection, querySnapshot', querySnapshot);

		querySnapshot.forEach(async (doc) => {
			console.log('deleteImageFromCollection, doc', doc);

			await deleteDoc(doc.ref);
		});
		onLoad();
		// return newCVCollect;
	}
}
