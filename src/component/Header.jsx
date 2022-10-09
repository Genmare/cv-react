import React, { useContext, useRef } from 'react';
import styled from 'styled-components';

import { StyleContext } from '../utils/context';

import Tools from '../Tools';
import LineSelectable from './LineSelectable';

const defautlBgColor = 'var(--title-bg-color)';
const defaultFtColor = 'var(--primary-font-color)';

const Header = styled.div`
	background-color: ${(props) => props.bgColor ?? defautlBgColor};
	color: ${(props) => props.fontColor ?? defaultFtColor};
	width: 21cm;
	line-height: 1rem;
	z-index: 20;

	grid-column: 1 / 4;
	grid-row: 2 / 3;

	display: grid;
	grid-template-columns:
		var(--taille-marge)
		var(--taille-aside)
		5fr;
`;

export default function Entete({ head, dispatch }) {
	const { globalStyles, setglobalStyles, setIdent } =
		useContext(StyleContext);

	const ref = useRef();

	const tools = new Tools(globalStyles, setglobalStyles, setIdent);

	let cfStyles = {
		id: 'head',
		backgroundColor: head?.backgroundColor ?? defautlBgColor,
		fontColor: head?.fontColor ?? defaultFtColor,
	};

	const getColor = () => {
		return tools.getColor(cfStyles);
	};

	const getFontColor = () => {
		return tools.getFontColor(cfStyles);
	};

	const handleColorBg = (e) => {
		e.stopPropagation();
		tools.handleColor(cfStyles, ref);
	};

	return (
		<Header
			onClick={handleColorBg}
			bgColor={getColor}
			fontColor={getFontColor}
		>
			<header>
				<div className="titre" ref={ref}>
					<LineSelectable
						value={head.name}
						fontSize="1.75"
						classN="titre-h1"
						onSubmit={(value) =>
							dispatch({
								type: 'head-name',
								prop: 'name',
								value,
							})
						}
					/>
					<LineSelectable
						value={head.occupation}
						fontSize="1.125"
						classN="titre-h2"
						onSubmit={(value) =>
							dispatch({
								type: 'head-occupation',
								prop: 'occupation',
								value,
							})
						}
					/>
				</div>
			</header>
		</Header>
	);
}
