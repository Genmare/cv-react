import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';

import useClickOutside from './useClickOutside';

import './popoverPicker.css';

export const PopoverPicker = ({ color, onChange }) => {
	const popover = useRef();
	const [isOpen, toggle] = useState(false);

	const close = useCallback(() => toggle(false), []);
	useClickOutside(popover, close);

	useEffect(() => {}, [color]);

	return (
		<div className="picker">
			<div
				className="swatch"
				style={{ backgroundColor: color }}
				onClick={() => toggle(true)}
			/>

			{isOpen && (
				<div className="popover" ref={popover}>
					<HexColorPicker color={color} onChange={onChange} />
					<HexColorInput color={color} onChange={onChange} />
				</div>
			)}
		</div>
	);
};
