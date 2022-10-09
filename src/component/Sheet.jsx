import '../App.css';
import React, { useContext } from 'react';
import styled from 'styled-components';

import { StyleContext } from '../utils/context';
import Tools from '../Tools';

import Infos from './Infos';
import Section from './Section';
import Header from './Header';

import PhotoCV from './PhotoCV';

const defautlBgColor = 'var(--section-bg-color)';
// const defautlBgColor = '#000';
const defaultFtColor = 'var(--secondary-ft-color)';

const SheetDiv = styled.div`
	background-color: ${(props) => props.bgColor ?? defautlBgColor};
	color: ${(props) => props.fontColor ?? defaultFtColor};
	display: grid;
	grid-template-columns:
		var(--taille-marge)
		var(--taille-aside)
		5fr;
	grid-template-rows:
		var(--marge-top-titre)
		var(--taille-titre)
		var(--ajout-hauteur-photo)
		1fr;
	width: calc(1 * var(--a4-width));
	height: calc(1 * var(--a4-height));
`;

const Sheet = React.forwardRef((props, ref) => {
	const { data, dispatch, onClick, photoClick } = props;

	const { globalStyles, setglobalStyles, setIdent } =
		useContext(StyleContext);
	console.log('Sheet - data', data);

	const tools = new Tools(globalStyles, setglobalStyles, setIdent);

	let cfStyle = {
		id: 'paragraph',
		backgroundColor:
			data.bodySettings?.paragraph?.backgroundColor ?? defautlBgColor,
		fontColor: data.bodySettings?.paragraph?.fontColor ?? defaultFtColor,
	};

	const handleColor = (cfStyle) => {
		tools.handleColor(cfStyle, ref);
	};

	const getColor = (cfStyle) => {
		return tools.getColor(cfStyle);
	};
	const getFontColor = (cfStyle) => {
		return tools.getFontColor(cfStyle);
	};

	const handleClick = (e) => {
		console.log('Sheet e', e);
		onClick(e);
		handleColor(cfStyle);
	};

	return (
		<SheetDiv
			ref={ref}
			bgColor={() => getColor(cfStyle)}
			fontColor={() => getFontColor(cfStyle)}
			onClick={(e) => handleClick(e)}
		>
			<Header head={data.head} dispatch={dispatch} />
			<PhotoCV
				photoClick={photoClick}
				photo={data.photo}
				dispatch={dispatch}
			/>
			<Infos infosData={data.infos} dispatch={dispatch} />
			<div id="corps">
				{data.body.map((section) => (
					<Section
						key={section.id}
						sectionData={section}
						sectionSetting={data.bodySettings}
						idSection={section.id}
						dispatch={dispatch}
					/>
				))}
			</div>
		</SheetDiv>
	);
});

export default Sheet;
