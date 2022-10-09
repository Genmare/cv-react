import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Line = styled.p`
	font-size: ${(props) => props.fontSize ?? '0.7em'};
	white-space: pre-line;
`;

const TextArea = styled.textarea`
	display: block;
	font-size: ${(props) => props.fontSize ?? '0.7em'};
	border: none;
	white-space: pre-line;
	text-transform: none;
	margin-left: 0;
	margin-top: 0.5em;
	width: 100%;
`;

export default function LineSelectable({
	value,
	fontSize,
	bgColor,
	classN,
	onSubmit,
}) {
	const [bInput, setBInput] = useState(false);
	const [vInput, setvInput] = useState('');

	// Charge et recharge la valeur du composant lorsque le state global change
	useEffect(() => {
		setvInput(value);
	}, [value]);

	const handleSubmit = () => {
		setBInput(false);
		if (onSubmit !== undefined) onSubmit(vInput);
	};

	return !bInput ? (
		<Line
			className={classN}
			bgColor={bgColor}
			fontSize={fontSize}
			onClick={() => setBInput(true)}
		>
			{vInput}
		</Line>
	) : (
		<TextArea
			type="text"
			autoFocus
			// onFocus={(e) => setvInput(e.target.value)}
			onFocus={(e) => e.target.select()}
			value={vInput}
			onChange={(e) => setvInput(e.target.value)}
			onKeyDown={(e) =>
				e.key === 'Enter' && e.location === 3 && handleSubmit()
			}
			onBlur={handleSubmit}
		/>
		// <Input
		// 	type="text"
		// 	autoFocus
		// 	// onFocus={(e) => setvInput(e.target.value)}
		// 	onFocus={(e) => e.target.select()}
		// 	value={vInput}
		// 	onChange={(e) => setvInput(e.target.value)}
		// 	// onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
		// 	onBlur={handleSubmit}
		// />
	);
}
