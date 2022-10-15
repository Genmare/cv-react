export const initialDataSave = {
	head: {
		name: 'Grégory FICHES',
		occupation: "Concepteur développeur d'application",
	},
	infos: {
		infoDesc: [
			{
				id: 0,
				icon: 'FaMapMarkerAlt',
				text: '',
			},
			{
				id: 1,
				icon: 'FaMobileAlt',
				text: '',
			},
			{
				id: 3,
				icon: 'FaAt',
				text: '',
			},
			{
				id: 4,
				icon: 'FaUser',
				text: '',
			},
			{
				id: 5,
				icon: 'FaCarAtt',
				text: '',
			},
			{
				id: 6,
				icon: 'FaGithub',
				text: '',
			},
		],
		interests: [
			{ id: 0, int: '' },
			{ id: 1, int: '' },
			{ id: 2, int: '' },
			{ id: 3, int: '' },
		],
		languages: [
			{ id: 0, language: 'anglais', level: 'lecture document technique' },
			{ id: 1, language: 'espagnol', level: 'niveau usuel' },
			{ id: 2, language: 'japonais', level: 'niveau découverte' },
		],
	},
	photo: {
		coord: { x: 0, y: 0 },
		coordFrame: { x: 0, y: 16 },
		dim: { height: 200, width: 200 },
		isCirce: false,
		zoom: 0.54,
	},
	body: [
		// tableau racine
		{
			// section n°0
			id: 0,
			title: 'compétences professionnelles',
			sentence: [
				// ensemble de phrases avec leur titre
				{
					id: 0,
					isEnum: true,
					intitule: 'Langages de programmation',
					iteration: [
						'React.js',
						'Android',
						'Java',
						'Kotlin',
						'React Native',
						'Flutter',
						'Angular',
						'HTML5',
						'CSS3',
						'JavaScript',
						'Node.js',
						'Next.js',
						'JavaEE',
						'PHP',
						'C',
						'C++',
						'API OpenGL',
						'Ogre 3D',
						'API Qt',
						'shell bash',
					],
				},
				{
					id: 1,
					isEnum: true,
					intitule: 'IDE',
					iteration: [
						'Android Studio',
						'Visual Studio Code',
						'Eclipse',
						'Kdevelop',
					],
				},
				{
					id: 2,
					isEnum: true,
					intitule: 'Modeleur 3D',
					iteration: ['Blender'],
				},
				{
					id: 3,
					isEnum: true,
					intitule: 'Traitement d’image',
					iteration: ['Gimp'],
				},
				{
					id: 4,
					isEnum: true,
					intitule: "Systèmes d'exploitation",
					iteration: ['Windows XP/10', 'Linux', 'Unix'],
				},
			],
		},
		{
			id: 1,
			title: 'formation',
			sentence: [
				{
					id: 0,
					isEnum: false,
					intitule: '2016 – 2021 : MOOC OpenClassRooms',
					phrase: '(Java, Android, Kotlin, Angular, React Native, Node.js, JavaEE, PHP, HTML5, CSS3, JavaScript, Docker, MySQL, Git, UML, Agile, SCRUM, C++, Qt)',
				},
				{
					id: 1,
					isEnum: false,
					intitule:
						'2006 : MASTER Pro IIN, Ingénierie de l’image numérique.',
					phrase: 'Université Paul Sabatier (Toulouse)',
				},
				{
					id: 2,
					isEnum: false,
					intitule: '2000 : Baccalauréat général scientifique',
					phrase: 'Lycée BELLEVUE (Toulouse)',
				},
			],
		},
		{
			id: 2,
			title: 'expérience professionnelle',
			sentence: [
				{
					id: 0,
					isEnum: false,
					intitule:
						'2006 (avril – septembre) : Développeur stagiaire au CNES de Toulouse',
					phrase: '\nDescriptif : Simulation et visualisation des satellites en opération en orbite basse\nInterfacer le logiciel de visualisation OPALE avec le logiciel de mécanique spatiale CLEO.',
				},
			],
		},
		{
			id: 3,
			title: 'loisirs - activités extra-professionnelles',
			sentence: [
				{
					id: 0,
					isEnum: true,
					intitule: 'Sites et youtuber sur le web',
					iteration: [
						'The Net Ninja',
						'Traversy Media',
						'Grafikart',
						'KOOR.fr',
						'Fireship.io',
						'W3Schools',
						'freeCodeCamp',
					],
				},
				{
					id: 1,
					isEnum: true,
					intitule: 'Lecture',
					iteration: [
						'OpenGL Shading Language',
						'Mathematics for 3d Game Programming and Computer Graphics',
						'Introduction to 3d Game Programming With Directx 10',
					],
				},
			],
		},
	],
};

export const initialData = {
	head: {
		name: 'Grégory FICHES',
		occupation: "Concepteur développeur d'application",
	},
	infos: {
		infoDesc: [
			{
				id: 0,
				icon: 'FaMapMarkerAlt',
				text: '',
			},
			{
				id: 1,
				icon: 'FaMobileAlt',
				text: '',
			},
			{
				id: 3,
				icon: 'FaAt',
				text: '',
			},
			{
				id: 4,
				icon: 'FaUser',
				text: '',
			},
			{
				id: 5,
				icon: 'FaCarAtt',
				text: '',
			},
			{
				id: 6,
				icon: 'FaGithub',
				text: '',
			},
		],
		interests: [
			{ id: 0, int: '' },
			{ id: 1, int: '' },
			{ id: 2, int: '' },
			{ id: 3, int: '' },
		],
		languages: [
			{ id: 0, language: 'anglais', level: 'lecture document technique' },
			{ id: 1, language: 'espagnol', level: 'niveau usuel' },
			{ id: 2, language: 'japonais', level: 'niveau découverte' },
		],
	},
	photo: {
		coord: { x: 0, y: 0 },
		coordFrame: { x: 0, y: 16 },
		dim: { height: 200, width: 200 },
		isCirce: false,
		zoom: 0.54,
	},
	body: [
		// tableau racine
		{
			// section n°0
			id: 0,
			title: 'compétences professionnelles',
			sentence: [
				// ensemble de phrases avec leur titre
				{
					id: 1,
					isEnum: true,
					intitule: 'IDE',
					iteration: [
						'Android Studio',
						'Visual Studio Code',
						'Eclipse',
						'Kdevelop',
					],
				},
				{
					id: 2,
					isEnum: true,
					intitule: 'Modeleur 3D',
					iteration: ['Blender'],
				},
			],
		},
		{
			id: 1,
			title: 'formation',
			sentence: [
				{
					id: 0,
					isEnum: false,
					intitule: '2016 – 2021 : MOOC OpenClassRooms',
					phrase: '(Java, Android, Kotlin, Angular, React Native, Node.js, JavaEE, PHP, HTML5, CSS3, JavaScript, Docker, MySQL, Git, UML, Agile, SCRUM, C++, Qt)',
				},
				{
					id: 1,
					isEnum: false,
					intitule:
						'2006 : MASTER Pro IIN, Ingénierie de l’image numérique.',
					phrase: 'Université Paul Sabatier (Toulouse)',
				},
				{
					id: 2,
					isEnum: false,
					intitule: '2000 : Baccalauréat général scientifique',
					phrase: 'Lycée BELLEVUE (Toulouse)',
				},
			],
		},
		{
			id: 2,
			title: 'expérience professionnelle',
			sentence: [
				{
					id: 0,
					isEnum: false,
					intitule:
						'2006 (avril – septembre) : Développeur stagiaire au CNES de Toulouse',
					phrase: '\nDescriptif : Simulation et visualisation des satellites en opération en orbite basse\nInterfacer le logiciel de visualisation OPALE avec le logiciel de mécanique spatiale CLEO.',
				},
			],
		},
		{
			id: 3,
			title: 'loisirs - activités extra-professionnelles',
			sentence: [
				{
					id: 0,
					isEnum: true,
					intitule: 'Sites et youtuber sur le web',
					iteration: [
						'The Net Ninja',
						'Traversy Media',
						'Grafikart',
						'KOOR.fr',
						'Fireship.io',
						'W3Schools',
						'freeCodeCamp',
					],
				},
				{
					id: 1,
					isEnum: true,
					intitule: 'Lecture',
					iteration: [
						'OpenGL Shading Language',
						'Mathematics for 3d Game Programming and Computer Graphics',
						'Introduction to 3d Game Programming With Directx 10',
					],
				},
			],
		},
	],
};

export const newData = {
	head: {
		name: 'nom',
		occupation: 'Occupation - metier',
	},
	infos: {
		infoDesc: [
			{
				id: 0,
				icon: 'FaMapMarkerAlt',
				text: 'adresse',
			},
			{
				id: 1,
				icon: 'FaMobileAlt',
				text: 'numéro mobile',
			},
			{
				id: 3,
				icon: 'FaAt',
				text: 'numéro fixe',
			},
			{
				id: 4,
				icon: 'FaUser',
				text: 'âge',
			},
			{
				id: 5,
				icon: 'FaCarAlt',
				text: 'permis',
			},
			{
				id: 6,
				icon: 'FaGithub',
				text: 'adresse Github',
			},
		],
		interests: [{ id: 0, int: 'Interêt' }],
		languages: [
			{ id: 0, language: 'anglais', level: 'lecture document technique' },
			{ id: 1, language: 'espagnol', level: 'niveau usuel' },
			{ id: 2, language: 'japonais', level: 'niveau découverte' },
		],
	},
	photo: {
		coord: { x: 0, y: 0 },
		coordFrame: { x: 0, y: 16 },
		dim: { height: 200, width: 200 },
		isCirce: false,
		zoom: 0.54,
	},
	body: [
		// tableau racine
		{
			// section n°0
			id: 0,
			title: 'compétences professionnelles',
			sentence: [
				// ensemble de phrases avec leur titre
				{
					id: 1,
					isEnum: true,
					intitule: 'IDE',
					iteration: ['Android Studio'],
				},
				{
					id: 2,
					isEnum: true,
					intitule: 'Modeleur 3D',
					iteration: ['Blender'],
				},
			],
		},
		{
			id: 1,
			title: 'formation',
			sentence: [
				{
					id: 0,
					isEnum: false,
					intitule: '2016 – 2021 : MOOC ',
					phrase: '(Java, Android, Kotlin, Angular, React Native, Node.js, JavaEE, PHP, HTML5, CSS3, JavaScript)',
				},
				{
					id: 1,
					isEnum: false,
					intitule: '2006 : MASTER Pro ',
					phrase: 'Université',
				},
				{
					id: 2,
					isEnum: false,
					intitule: '2000 : Baccalauréat général scientifique',
					phrase: 'Lycée ',
				},
			],
		},
		{
			id: 2,
			title: 'expérience professionnelle',
			sentence: [
				{
					id: 0,
					isEnum: false,
					intitule: '2006 (avril – septembre) : Stagiaire à Paris',
					phrase: '\nDescriptif : .',
				},
			],
		},
		{
			id: 3,
			title: 'loisirs - activités extra-professionnelles',
			sentence: [
				{
					id: 0,
					isEnum: true,
					intitule: 'Sites et youtuber sur le web',
					iteration: ['The Net Ninja'],
				},
				{
					id: 1,
					isEnum: true,
					intitule: 'Lecture',
					iteration: ['OpenGL Shading Language'],
				},
			],
		},
	],
};

export const reducer = (state, action) => {
	console.log('\nreducer:', action);
	switch (action.type) {
		case 'clear':
			console.log('reducer - clear');
			return null;
		case 'reset':
			console.log('reducer - reset');
			return action.data;
		// css settings id: head, infos, title and paragraph
		case 'backgroundColor':
		case 'fontColor':
			console.log('reducer - backgroundColor', action);
			switch (action.id) {
				case 'head':
				case 'infos':
					return {
						...state,
						[action.id]: {
							...state[action.id],
							[action.type]: action[action.type],
						},
					};
				case 'title':
				case 'paragraph':
					return {
						...state,
						bodySettings: {
							...state.bodySettings,
							[action.id]: {
								...state.bodySettings[action.id],
								[action.type]: action[action.type],
							},
						},
					};
				default:
					return state;
			}

		// header settings
		case 'head-name':
		case 'head-occupation':
			console.log(`reducer - ${action.type}`, action);
			return {
				...state,
				head: { ...state.head, [action.prop]: action.value },
			};
		// Photo settings
		case 'isCircle':
		case 'dim':
		case 'zoom':
		case 'coord':
		case 'coordFrame':
			console.log(`reducer - ${action.type}`, action);
			return {
				...state,
				photo: { ...state.photo, [action.type]: action[action.type] },
			};
		// infos settings
		case 'infoDesc':
		case 'interests':
		case 'languages':
			console.log('reducer - language', action);
			return {
				...state,
				infos: {
					...state.infos,
					[action.type]: state.infos[action.type].map((obj) => {
						if (obj.id === action.id) {
							return {
								...obj,
								[action.prop]: action[action.prop],
							};
						}
						return obj;
					}),
				},
			};
		case 'add-language':
		case 'add-interest':
			console.log(`reducer - add-${action.prop}`, action);
			let maxId =
				Math.max(...state.infos[action.prop].map((obj) => obj.id)) + 1;
			let index =
				state.infos[action.prop].findIndex(
					(lang) => lang.id === action.id
				) + 1;
			state.infos[action.prop].splice(index, 0, {
				id: maxId,
				...action.object,
			});
			return state;
		case 'remove-language':
		case 'remove-interest':
			console.log('reducer - remove-language', action);
			return {
				...state,
				infos: {
					...state.infos,
					[action.prop]: state.infos[action.prop].filter(
						(obj) => obj.id !== action.id
					),
				},
			};
		// section settings
		case 'addIter':
			console.log('addIter', action);
			return {
				...state,
				body: state.body.map((section) => {
					if (section.id === action.idSection) {
						return {
							...section,
							sentence: section.sentence.map((sent) => {
								if (sent.id === action.idSentence) {
									let newIter = sent.iteration;
									newIter.splice(action.index, 0, 'word');
									return {
										...sent,
										iteration: newIter,
									};
								}
								return sent;
							}),
						};
					}
					return section;
				}),
			};
		case 'removeIter':
			console.log('removeIter', action);
			return {
				...state,
				body: state.body.map((section) => {
					if (section.id === action.idSection) {
						return {
							...section,
							sentence: section.sentence.map((sent) => {
								if (sent.id === action.idSentence) {
									let newIter = sent.iteration;
									newIter.splice(action.index, 1);
									return {
										...sent,
										iteration: newIter,
									};
								}
								return sent;
							}),
						};
					}
					return section;
				}),
			};
		case 'submit':
			console.log('submit', action);
			return {
				...state,
				body: state.body.map((section) => {
					if (section.id === action.idSection) {
						let newSentence;
						const { oldValue, value, prop } = action;

						if (action.prop === 'iteration') {
							console.log('iteration', action);

							newSentence = section.sentence.map((sent) =>
								sent.id === action.idSentence // Trouver la prop sentence
									? {
											...sent,
											iteration: sent.iteration.map(
												(iter) =>
													iter === oldValue
														? value
														: iter // changer la valeur dans le tableau iteration
											),
									  }
									: sent
							);
						} else {
							newSentence = section.sentence.map((sent) =>
								sent.id === action.idSentence
									? { ...sent, [prop]: value }
									: sent
							);
						}
						return { ...section, sentence: newSentence };
					}
					return section;
				}),
			};
		default:
			return state;
	}
};
