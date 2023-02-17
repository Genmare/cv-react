import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SaveAltTwoToneIcon from '@mui/icons-material/SaveAltTwoTone';

import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@mui/material';

const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

/**
 * Ce type de callback est l'action exécutée quand l'utilisateur est d'accord avec la "query"
 * @callback requestCallback
 */
/**
 *
 * @param {string} buttonLabel intitulé du bouton
 * @param {string} query question de la confirmation
 * @param {requestCallback} onConfirm la fonction exécutée aprés la confirmation
 * @returns
 */
function ConfirmSave({ buttonLabel, query, onConfirm }) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleConfirmAndClose = () => {
		onConfirm();
		handleClose();
	};

	console.log('ConfirmSave', 'onConfirm:', onConfirm);
	return (
		<>
			<Tooltip title={buttonLabel}>
				<IconButton
					onClick={handleOpen}
					variant="outlined"
					sx={{
						border: 'solid',
						color: 'white',
						backgroundColor: '#67b9e5',
					}}
				>
					<SaveAltTwoToneIcon />
				</IconButton>
			</Tooltip>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyle}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						{buttonLabel}
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						{query}
					</Typography>
					<Button onClick={handleConfirmAndClose}>Oui</Button>
					<Button onClick={handleClose}>Non</Button>
				</Box>
			</Modal>
		</>
	);
}

ConfirmSave.propTypes = {
	query: PropTypes.string,
};

export default ConfirmSave;
