import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Span = styled.span`
	font-size: ${(props) => `${props.fontSize}em` ?? '0.7em'};
	/* white-space: pre; */
	background-color: inherit;
`;

const Input = styled.input`
	display: inline;
	font-size: ${(props) => `${props.fontSize + 0.2}em` ?? '0.7em'};
	border: none;
	text-transform: none;
	white-space: pre-line;
	margin: 0;
	padding: 0;
	/* width: auto; */
`;

{
	/* <span class="input" role="textbox" contenteditable></span> */
}

export default function SpanSelectable({
	value,
	fontSize,
	bgColor,
	endChar,
	classN,
	onSubmit,
}) {
	const [bInput, setBInput] = useState(false);
	const [vInput, setvInput] = useState('');
	const [spanW, setSpanW] = useState('20px'); // largeur du span utilisé pour l'input

	const spanRef = useRef(null);
	const inputRef = useRef(null);

	// Charge et recharge la valeur du composant lorsque le state global change
	useEffect(() => {
		setvInput(value);
	}, [value]);

	// Rend le composant éditable et recupère la taille du span qui est utilisée par l'input
	const handleOnClick = () => {
		setBInput(true);
		setSpanW(spanRef.current.offsetWidth);
	};

	const handleOnChange = (e) => {
		// setSpanW(inputRef.current.offsetWidth);
		setSpanW(`${e.target.value.length + 1}ch`);
		setvInput(e.target.value);
	};

	const handleSubmit = () => {
		setBInput(false);
		console.log(onSubmit);
		if (onSubmit !== undefined) onSubmit(vInput);
	};

	return !bInput ? (
		<Span
			className={classN}
			bgColor={bgColor}
			fontSize={fontSize}
			onClick={() => handleOnClick()}
			ref={spanRef}
		>
			{endChar ? `${vInput}${endChar} ` : vInput}
		</Span>
	) : (
		<Input
			type="text"
			autoFocus
			onFocus={(e) => e.target.select()}
			ref={inputRef}
			value={vInput}
			onChange={(e) => handleOnChange(e)}
			onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
			onBlur={handleSubmit}
			style={{ width: spanW }}
		/>
	);
}

SpanSelectable.protoTypes = {
	value: PropTypes.string,
	fontSize: PropTypes.number,
	bgColor: PropTypes.string,
	endChar: PropTypes.string,
	classN: PropTypes.string,
	onSubmit: PropTypes.func,
};
