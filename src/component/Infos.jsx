import { useContext, useEffect, useRef, useState } from 'react';
import {
	FaMapMarkerAlt,
	FaMobileAlt,
	FaPhoneAlt,
	FaAt,
	FaUser,
	FaCarAlt,
	FaGithub,
	FaLinkedin,
	FaFrown,
} from 'react-icons/fa';
import styled from 'styled-components';

import LineSelectable from './LineSelectable';
import SpanSelectable from './SpanSelectable';

import { StyleContext } from '../utils/context';
import Hover from './Hover';

import Tools from '../Tools';

const Aside = styled.aside`
	color: ${(props) => props.fontColor ?? defaultFtColor};
	z-index: 10;

	grid-column: 2 / 3;
	grid-row: 1 / 5;

	background-color: ${(props) => props.bgColor ?? defautlBgColor};
`;

const Item = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin: auto 1rem;

	display: grid;
	grid-template-columns: 1fr 5fr;
`;

// const Line = styled.p`
// 	font-size: 0.7em;
// 	white-space: pre-line;
// `;

const LinkedIn = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 0.5rem;
	margin-bottom: 3rem;
`;

const Langues = styled.div`
	font-size: 0.7em;
	margin: auto 1rem;
`;

const Langue = styled.p`
	margin: 0.2rem;
`;

const getIcon = (iconName) => {
	switch (iconName) {
		case 'FaMapMarkerAlt':
			return <FaMapMarkerAlt size={28} />;
		case 'FaMobileAlt':
			return <FaMobileAlt size={28} />;
		case 'FaPhoneAlt':
			return <FaPhoneAlt size={28} />;
		case 'FaAt':
			return <FaAt size={28} />;
		case 'FaUser':
			return <FaUser size={28} />;
		case 'FaCarAlt':
			return <FaCarAlt size={28} />;
		case 'FaGithub':
			return <FaGithub size={28} />;

		default:
			return <FaFrown size={28} />;
	}
};

const defautlBgColor = 'var(--second-bg-color)';
const defaultFtColor = 'var(--primary-font-color)';

export default function Infos({ infosData, dispatch }) {
	const { globalStyles, setglobalStyles, setIdent } =
		useContext(StyleContext);

	const [interets, setInterets] = useState([
		{ id: 0, int: 'Astrophysique' },
		{ id: 1, int: 'Mécanique (Sc. Physique)' },
		{ id: 2, int: 'Le Japon' },
		{ id: 3, int: 'Course à pied' },
	]);

	const addInteret = (id) => {
		dispatch({
			type: 'add-interest',
			prop: 'interests',
			id,
			object: { int: 'Interêt' },
		});
	};

	const addLangue = (id) => {
		dispatch({
			type: 'add-language',
			prop: 'languages',
			id,
			object: {
				language: 'langue',
				level: 'niveau découverte',
			},
		});
	};

	const removeInteret = (id) => {
		dispatch({
			type: 'remove-interest',
			id,
			prop: 'interests',
		});
	};

	const removeLangue = (id) => {
		dispatch({
			type: 'remove-language',
			id,
			prop: 'languages',
		});
	};

	const submit = (liste, id, prop, value) => {
		const newList = liste.map((obj) =>
			id === obj.id ? { ...obj, [prop]: value } : obj
		);
		return newList;
	};

	const submitInteret = (id, value) => {
		let result = submit(interets, id, 'int', value);
		dispatch({
			type: 'interests',
			prop: 'int',
			id,
			int: value,
		});
		setInterets(result);
	};

	const submitLangue = (id, value) => {
		console.log('submit - submitLangue', id, value);
		dispatch({
			type: 'languages',
			prop: 'language',
			id,
			language: value,
		});
	};

	const submitNiveau = (id, value) => {
		dispatch({
			type: 'languages',
			prop: 'level',
			id,
			level: value,
		});
	};

	/**************************************************** */
	// Gestion des styles
	let cfStyles = {
		id: 'infos',
		backgroundColor: infosData?.backgroundColor ?? defautlBgColor,
		fontColor: infosData?.fontColor ?? defaultFtColor,
	};

	const tools = new Tools(globalStyles, setglobalStyles, setIdent);

	const getColor = () => {
		return tools.getColor(cfStyles);
	};

	const getFontColor = () => {
		return tools.getFontColor(cfStyles);
	};

	const ref = useRef();

	const handleColor = (e) => {
		e.stopPropagation();
		tools.handleColor(cfStyles, ref);
	};

	useEffect(() => {}, [infosData]);

	return (
		<Aside
			onClick={handleColor}
			bgColor={getColor}
			fontColor={getFontColor}
		>
			<div className="infos" style={{ paddingTop: '12rem' }} ref={ref}>
				{infosData.infoDesc.map((desc) => {
					return (
						<Item key={desc.id}>
							{getIcon(desc.icon)}
							<LineSelectable
								value={desc.text}
								onSubmit={(text) =>
									dispatch({
										type: 'infoDesc',
										prop: 'text',
										id: desc.id,
										icon: desc.icon,
										text,
									})
								}
							/>
						</Item>
					);
				})}
				<LinkedIn>
					<FaLinkedin size={40} />
				</LinkedIn>
				<h4
					style={{
						textAlign: 'center',
						textTransform: 'uppercase',
						marginBottom: 0,
					}}
				>
					langues
				</h4>
				<Langues>
					{infosData.languages.map((lang) => {
						return (
							<Hover
								key={lang.id}
								isBlock={true}
								addClick={() => addLangue(lang.id)}
								removeClick={() => removeLangue(lang.id)}
							>
								<Langue>
									<SpanSelectable
										classN="intitule-lang"
										value={lang.language}
										endChar=":"
										onSubmit={(value) =>
											submitLangue(lang.id, value)
										}
									/>
									<SpanSelectable
										value={lang.level}
										onSubmit={(value) =>
											submitNiveau(lang.id, value)
										}
									/>
								</Langue>
							</Hover>
						);
					})}
				</Langues>
				<h4
					style={{
						textAlign: 'center',
						textTransform: 'uppercase',
						marginBottom: 0,
					}}
				>
					centres d'interêt
				</h4>
				<Langues>
					{infosData.interests.map((interet) => {
						return (
							<Hover
								key={interet.id}
								isBlock={true}
								addClick={() => addInteret(interet.id)}
								removeClick={() => removeInteret(interet.id)}
							>
								<LineSelectable
									classN="interet"
									fontSize={0.7}
									value={interet.int}
									onSubmit={(value) =>
										submitInteret(interet.id, value)
									}
								/>
							</Hover>
						);
					})}
				</Langues>
			</div>
		</Aside>
	);
}
