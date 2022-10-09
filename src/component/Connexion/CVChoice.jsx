import React, { useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

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
			sx={{ cursor: 'pointer' }}
			InputLabelProps={{ shrink: true }}
			InputProps={{
				inputComponent: InputComponent,
			}}
			inputProps={{ children: children }}
		/>
	);
};

function CVChoice({ userData, setCv }) {
	// console.log('CVChoice', props);
	// const cvs = props.cvs;
	console.log('CVChoice cvs userData', userData);
	const selectLabel = `Sauvegarde${userData.cvList.length > 1 ? 's' : ''}`;

	const [indexCV, setIndexCV] = useState(null);

	// function handleRowClick(index) {
	// 	const reference = Object.values(userData.cvList[index])[0];
	// 	console.log('handleRowClick cv:', reference);
	// 	console.log(typeof reference);
	// 	// setCv(userData.cvList[index]);
	// 	// setCv(reference);
	// 	setCvChoice(reference);
	// }

	function handleOpenClick() {
		const reference = Object.values(userData.cvList[indexCV])[0];
		console.log('handleRowClick cv:', reference);
		setCv(reference);
	}

	function RenderRow({ data, index }) {
		const item = data;
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
						primary={item}
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
			}}
		>
			{/* <h4>CVChoice</h4> */}
			<Typography
				variant="h5"
				component="div"
				sx={{ m: '0.7rem 0.5rem 0' }}
			>
				CVChoice
			</Typography>
			<Button
				size="small"
				color="inherit"
				variant="outlined"
				// onClick={() => toggleButton(true)}
				// endIcon={<PersonAdd />}
				style={{ margin: '1em 0.5em' }}
			>
				Nouveau CV
			</Button>
			{/* <div>
				<FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
					<InputLabel shrink>{selectLabel}</InputLabel>
					<Select
						multiple
						native
						value={personName}
						onChange={handleChangeMultiple}
						label={selectLabel}
						inputProps={{
							id: 'select-multiple-native',
						}}
					>
						{names.map((name) => (
							<option key={name} value={name}>
								{name}
							</option>
						))}
					</Select>
				</FormControl>
			</div> */}
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
							data={Object.keys(cv)}
							index={index}
							key={index}
						/>
					))}
				</List>
				{/* </FixedSizeList> */}
			</OutlinedDiv>
			<Button
				size="small"
				color="inherit"
				variant="outlined"
				onClick={handleOpenClick}
				disabled={indexCV === null}
				style={{ margin: '1em 0.5em' }}
			>
				Ouvrir CV
			</Button>
		</Box>
	);
}

export default CVChoice;
