import React, { useState } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';

import styles from '../style/hover.module.css';

function Add() {
	return (
		<IconContext.Provider value={{ className: styles.add }}>
			<AiOutlinePlusCircle />
		</IconContext.Provider>
	);
}

function Remove() {
	return (
		<IconContext.Provider value={{ className: styles.remove }}>
			<AiOutlineMinusCircle />
		</IconContext.Provider>
	);
}

function Hover({
	children,
	isBlock,
	addClick,
	removeClick,
	isDraggle = false,
	onDragStart,
	onDragEnter,
	onDragEnd,
}) {
	const [hover, setHover] = useState(false);

	return isBlock ? (
		<div
			className={styles.hoverBlock}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			{hover && (
				<div onClick={addClick}>
					<Add />
				</div>
			)}
			{children}
			{hover && (
				<div onClick={removeClick}>
					<Remove />
				</div>
			)}
		</div>
	) : (
		<span
			className={styles.hoverBlock}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			draggable={isDraggle}
			onDragStart={(e) => {
				console.log('Hover span drag', e);
				console.log('Hover span drag handleDragStart', onDragStart);
				onDragStart(e);
			}}
			onDragEnter={onDragEnter}
			onDragEnd={onDragEnd}
		>
			{hover && (
				<span onClick={addClick}>
					<Add />
				</span>
			)}
			{children}
			{hover && (
				<span onClick={removeClick}>
					<Remove />
				</span>
			)}
		</span>
	);
}
export default Hover;
