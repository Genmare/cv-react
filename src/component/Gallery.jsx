import React, { useState } from 'react';
import {
	Box,
	Button,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	useMediaQuery,
} from '@mui/material';
// import Modal from '@mui/material/Modal';

// function Gallery({ imgData, onClick, onConfirm = () => {} }) {
function Gallery({
	photoList,
	onClick,
	onConfirm = () => {},
	disableSave,
	onSaveClick,
	onDeleteClick,
}) {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleConfirmAndClose = () => {
		onConfirm();
		handleClose();
	};

	// const handleClick = (item) => {
	// 	console.log(item.title);
	// 	setImgSelected(item);
	// 	onClick(item.img);
	// };

	const handleClick = (photo) => {
		console.log(photo.name);
		setImgSelected(photo);
		onClick(photo.url);
	};
	const [imgSelected, setImgSelected] = useState();

	const matches = useMediaQuery('(min-width:1320px)');
	let colNum = matches ? 3 : 2;
	let width = matches ? 500 : 270;

	// console.log('Gallery image imgData', imgData);
	console.log('Gallery image photoList', photoList);
	return (
		<Box
			sx={{
				width,
				overflowY: 'auto',
			}}
		>
			<ImageList cols={colNum} gap={2} sx={{ padding: '2px' }}>
				{/* {imgData.map((item) => ( */}
				{photoList &&
					photoList.map((photo) => (
						<ImageListItem
							// key={item.img}
							key={photo.url}
							// onClick={() => handleClick(item)}
							onClick={() => handleClick(photo)}
							sx={{
								// border: imgSelected === item ? 2 : 0,
								width: 120,
								backgroundColor:
									imgSelected === photo
										? '#f8f8f8'
										: 'inherite',
								outline:
									imgSelected === photo
										? 'solid red 2px'
										: 'none',
								outlineColor: 'red',
								borderRadius: '0.2rem',
								// outline: 'solid red 2px',
							}}
						>
							<img
								// src={`${item.img}?w=50&fit=crop&auto=format`}
								// src={`${item.img}`}
								src={`${photo.url}`}
								// srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
								// srcSet={`${photo.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
								// alt={item.title}
								alt={photo.name}
								loading="lazy"
							/>
							<ImageListItemBar
								position="below"
								// title={item.title}
								title={photo.name}
								// title={item.author}
							/>
						</ImageListItem>
					))}
			</ImageList>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Button
					onClick={() => {
						// onSaveClick(imgSelected);
						onSaveClick();
					}}
					disabled={disableSave}
				>
					Sauvegarder une image
				</Button>
				<Button
					onClick={() => {
						onClick(null);
						onDeleteClick(imgSelected);
					}}
					disabled={!imgSelected}
				>
					Éffacer une image
				</Button>
			</div>
		</Box>
	);
}

export default Gallery;
