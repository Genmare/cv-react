import React, { useState, useEffect } from 'react';
import { Box, TextField, FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { addNewDoc, deleteDocCv } from '../../firebase-config';
import { newData } from '../../utils/reducer';
import Animation from '../../Widget/Animation';

// const InputComponent = ({ inputRef, ...other }) => <div {...other} />;
const InputComponent = React.forwardRef(({ inputRef, ...other }, ref) => (
	<div {...other} ref={ref} />
));
const OutlinedDiv = ({ children, label }) => {
	return (
		<TextField
			variant="outlined"
			label={label}
			multiline
			sx={{
				cursor: 'pointer',
				margin: '9px',
			}}
			InputLabelProps={{ shrink: true }}
			InputProps={{
				inputComponent: InputComponent,
			}}
			inputProps={{ children: children }}
		/>
	);
};

const CVChoice = React.forwardRef(
	({ userData, setUserData, setCv, uid }, ref) => {
		console.log('CVChoice cvs userData', userData);
		const selectLabel = `Sauvegarde${
			userData.cvList.length > 1 ? 's' : ''
		}`;

		const [indexCV, setIndexCV] = useState(null);

		const [isNewDoc, setIsNewDoc] = useState(false);
		const [newDocName, setNewDocName] = useState('');

		function handleOpenClick() {
			console.log(
				`userData.cvList[${indexCV}]`,
				userData.cvList[indexCV]
			);
			console.log(`userData.cvList`, userData.cvList);
			// const reference = Object.values(userData.cvList[indexCV].path)[0];
			const reference = userData.cvList[indexCV].path;
			console.log('handleRowClick cv:', reference);
			setCv(reference);
		}

		function handleDeleteClick() {
			console.log(
				`handleDeleteClick:userData.cvList[${indexCV}]`,
				userData.cvList[indexCV]
			);
			const cv2Delete = userData.cvList[indexCV];
			deleteDocCv(uid, cv2Delete).then(() => {
				console.log('deleteDocCv');
				setUserData({
					...userData,
					cvList: userData.cvList.filter((cv) => cv !== cv2Delete),
				});
			});
		}

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
			addNewDoc(uid, newDocName, newData).then((docRef) => {
				console.log('addNewDoc then docRef', docRef);
				setUserData({
					...userData,
					cvList: [
						...userData.cvList,
						{
							name: newDocName,
							path: docRef,
						},
					],
				});
			});

			// {userData.cvList.map((cv, index) => (
			// 	<RenderRow
			// 		data={cv.name}
			// 		index={index}
			// 		key={index}
			// 	/>
			// ))}
			setIsNewDoc(false);
		}

		function RenderRow({ data, index }) {
			return (
				<ListItem key={index} disablePadding>
					<ListItemButton
						dense={true}
						sx={{
							m: 0,
							p: 0,
						}}
						component="a"
						// onClick={() => handleRowClick(index)}
						onClick={() => setIndexCV(index)}
					>
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
				ref={ref}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-around',
					alignItems: 'stretch',
					width: 'fit-content',
					// height: 'fit-content(50%)',
					border: (theme) => `1px solid ${theme.palette.divider}`,
					borderRadius: 2,
					bgcolor: 'background.paper',
					color: 'text.secondary',
					p: '0 0.3rem',
				}}
			>
				{/* <h4>CVChoice</h4> */}
				<Typography
					variant="h5"
					component="div"
					sx={{ m: '0.7rem 0.5rem 0', textAlign: 'center' }}
				>
					CVChoice
				</Typography>
				<Button
					size="small"
					color="inherit"
					variant="outlined"
					onClick={() => setIsNewDoc(true)}
					style={{ margin: '0.7em 0.5em' }}
					disabled={isNewDoc}
				>
					Nouveau CV
				</Button>
				{isNewDoc && (
					<FormControl
						sx={{ margin: '0em 0.5em' }}
						variant="outlined"
						size="small"
					>
						<TextField
							id="outlined-email"
							size="small"
							type={'text'}
							value={newDocName}
							onChange={handleNameChange}
							label="Nom du nouveau document"
						/>
					</FormControl>
				)}
				{isNewDoc && (
					<Animation>
						<Box
							// display="flex"
							// justifyContent={'stretch'}
							// alignItems="stretch"
							sx={{
								display: 'flex',
								justifyContent: 'space-evenly',
							}}
							// padding={1}
						>
							<Button
								size="small"
								color="inherit"
								variant="outlined"
								onClick={handleNewDocSubmit}
								style={{ margin: '0.5em 0' }}
							>
								Valider
							</Button>
							<Button
								size="small"
								color="inherit"
								variant="outlined"
								onClick={() => setIsNewDoc(false)}
								style={{ margin: '0.5em 0' }}
							>
								Annuler
							</Button>
						</Box>
					</Animation>
				)}
				<OutlinedDiv label={selectLabel}>
					<List
						sx={{
							width: '100%',
							maxWidth: 250,
							minWidth: 100,
							position: 'relative',
							overflow: 'auto',
							maxHeight: 80,
						}}
					>
						{userData.cvList.map((cv, index) => (
							<RenderRow
								data={cv.name}
								index={index}
								key={index}
							/>
						))}
					</List>
				</OutlinedDiv>
				<Button
					size="small"
					color="inherit"
					variant="outlined"
					onClick={handleOpenClick}
					disabled={indexCV === null}
					style={{ margin: '1em 0.5em 0.2em 0.5em' }}
				>
					Ouvrir CV
				</Button>
				<Button
					size="small"
					color="inherit"
					variant="outlined"
					onClick={handleDeleteClick}
					disabled={indexCV === null}
					style={{ margin: '0.2em 0.5em 1em 0.5em' }}
				>
					Supprimer CV
				</Button>
			</Box>
		);
	}
);

export default CVChoice;
