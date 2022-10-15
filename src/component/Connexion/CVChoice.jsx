import React, { useState, useEffect } from 'react';
import { Box, TextField, FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { addNewDoc } from '../../firebase-config';
import { newData } from '../../utils/reducer';
import Animation from '../../Widget/Animation';

// const InputComponent = ({ inputRef, ...other }) => <div {...other} />;
const InputComponent = React.forwardRef(({ inputRef, ...other }, ref) => (
	<div
		{...other}
		ref={ref}
	/>
));
const OutlinedDiv = ({ children, label }) => {
	return (
		<TextField
			variant='outlined'
			label={label}
			multiline
			sx={{ cursor: 'pointer' }}
			InputLabelProps={{ shrink: true }}
			InputProps={{
				inputComponent: InputComponent,
			}}
			inputProps={{ children: children }}
		/>
	);
};

function CVChoice({ userData, setCv, uid }) {
	console.log('CVChoice cvs userData', userData);
	const selectLabel = `Sauvegarde${userData.cvList.length > 1 ? 's' : ''}`;

	const [indexCV, setIndexCV] = useState(null);

	const [isNewDoc, setIsNewDoc] = useState(false);
	const [newDocName, setNewDocName] = useState('');

	function handleOpenClick() {
		console.log(`userData.cvList[${indexCV}]`, userData.cvList[indexCV]);
		console.log(`userData.cvList`, userData.cvList);
		// const reference = Object.values(userData.cvList[indexCV].path)[0];
		const reference = userData.cvList[indexCV].path;
		console.log('handleRowClick cv:', reference);
		setCv(reference);
	}

	function handleDeleteClick() {}

	function handleNameChange(event) {
		console.log('handlNameChange', event.target.value);
		setNewDocName(event.target.value);
	}

	function handleNewDocSubmit() {
		console.log(
			'handleNewDocSubmit uid',
			uid,
			'newnewDocName',
			newDocName,
			'newData',
			newData
		);
		addNewDoc(uid, newDocName, newData);
		setIsNewDoc(false);
	}

	function RenderRow({ data, index }) {
		return (
			<ListItem
				key={index}
				disablePadding>
				<ListItemButton
					dense={true}
					sx={{
						m: 0,
						p: 0,
					}}
					component='a'
					// onClick={() => handleRowClick(index)}
					onClick={() => setIndexCV(index)}>
					<ListItemText
						primary={data}
						inset
						sx={
							index !== indexCV
								? {
										m: 0,
										p: 0,
										textAlign: 'center',
								  }
								: {
										m: 0,
										p: 0,
										textAlign: 'center',
										color: 'white',
										bgcolor: '#9d9d9d',
								  }
						}
					/>
				</ListItemButton>
			</ListItem>
		);
	}

	useEffect(() => {
		const handleEnter = (event) => {
			if (event.keyCode === 13 && indexCV !== null) {
				handleOpenClick();
			}
		};
		window.addEventListener('keydown', handleEnter);

		return () => {
			window.removeEventListener('keydown', handleEnter);
		};
	});

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-around',
				alignItems: 'center',
				width: 'fit-content',
				// height: 'fit-content(50%)',
				border: (theme) => `1px solid ${theme.palette.divider}`,
				borderRadius: 2,
				bgcolor: 'background.paper',
				color: 'text.secondary',
				p: '0 0.3rem',
			}}>
			{/* <h4>CVChoice</h4> */}
			<Typography
				variant='h5'
				component='div'
				sx={{ m: '0.7rem 0.5rem 0' }}>
				CVChoice
			</Typography>
			<Button
				size='small'
				color='inherit'
				variant='outlined'
				onClick={() => setIsNewDoc(true)}
				style={{ margin: '1em 0.5em' }}
				disabled={isNewDoc}>
				Nouveau CV
			</Button>
			{isNewDoc && (
				<FormControl
					sx={{ width: '14ch' }}
					variant='outlined'
					size='small'>
					<TextField
						id='outlined-email'
						size='small'
						type={'text'}
						value={newDocName}
						onChange={handleNameChange}
						label='Nom du nouveau document'
					/>
				</FormControl>
			)}
			{isNewDoc && (
				<Animation>
					<Box
						display='flex'
						alignItems='stretch'
						padding={1}>
						<Button
							size='small'
							color='inherit'
							variant='outlined'
							onClick={handleNewDocSubmit}
							style={{ margin: '0.5em 0' }}>
							Valider
						</Button>
						<Button
							size='small'
							color='inherit'
							variant='outlined'
							onClick={() => setIsNewDoc(false)}
							style={{ margin: '0.5em 0' }}>
							Annuler
						</Button>
					</Box>
				</Animation>
			)}
			<OutlinedDiv label={selectLabel}>
				{/* <FixedSizeList
					height={names.length * itemSize}
					width={250}
					itemSize={itemSize}
					itemCount={names.length}
					overscanCount={5}
					itemData={names}
					// label={selectLabel}
				> */}
				<List
					sx={{
						width: '100%',
						maxWidth: 250,
						minWidth: 100,
						// bgcolor: 'background.paper',
						position: 'relative',
						overflow: 'auto',
						maxHeight: 80,
					}}
					// subheader={<li />}
				>
					{/* {renderRow} */}
					{/* {names.map((data, index) => (
							<RenderRow data={data} index={index} />
						))} */}
					{userData.cvList.map((cv, index) => (
						<RenderRow
							// data={Object.keys(cv)}
							data={cv.name}
							index={index}
							key={index}
						/>
					))}
				</List>
				{/* </FixedSizeList> */}
			</OutlinedDiv>
			<Button
				size='small'
				color='inherit'
				variant='outlined'
				onClick={handleOpenClick}
				disabled={indexCV === null}
				style={{ margin: '1em 0.5em' }}>
				Ouvrir CV
			</Button>
			<Button
				size='small'
				color='inherit'
				variant='outlined'
				onClick={handleDeleteClick}
				disabled={indexCV === null}
				style={{ margin: '1em 0.5em' }}>
				Supprimer CV
			</Button>
		</Box>
	);
}

export default CVChoice;
