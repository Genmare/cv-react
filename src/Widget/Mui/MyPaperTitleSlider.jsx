import Paper from '@mui/material/Paper/Paper';
import styled from '@mui/material/styles/styled';

export const MyPaperTitleSlider = styled(Paper)(({ theme }) => ({
	[theme.breakpoints.down('md')]: {
		padding: '1em',
		margin: '0.5em 0',
		backgroundColor: 'background.default',
		display: 'flex',
		flexDirection: 'column',
		justifyItems: 'center',
		alignItems: 'center',

		'div:first-of-type': {
			fontWeight: '600',
			marginBottom: '1em',
			gridColumn: '1 / span 2',
		},
	},
	[theme.breakpoints.up('md')]: {
		padding: '1em',
		margin: '0.5em 0',
		backgroundColor: 'background.default',
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr',
		gap: 2,
		justifyItems: 'center',

		// les labels
		// 'div:nth-child(even)': {
		'> div': {
			justifySelf: 'end',
			alignSelf: 'center',
			marginRight: '20px',
			gridColumn: '1 / span 1',
		},

		// les spiners
		span: {
			justifySelf: 'start',
			alignSelf: 'center',
			gridColumn: '2 / span 2',
		},

		'div:first-of-type': {
			// '> div:first-of-type': {
			fontWeight: '600',
			marginBottom: '1em',
			gridColumn: '1 / span 3',
			justifySelf: 'center',
		},
	},
	[theme.breakpoints.up('lg')]: {
		padding: '1em',
		margin: '0.5em 0',
		backgroundColor: 'background.default',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',

		// les labels
		// 'div:nth-of-type(even)': {
		// 'div:nth-of-type(even)': {
		// 'span ~ p': {
		'> div': {
			justifySelf: 'end',
			alignSelf: 'center',
			margin: '0 20px',
			// background: 'red',
			// gridColumn: '1 / span 1',
		},

		// les spiners
		// span: {
		// 	// justifySelf: 'start',
		// 	alignSelf: 'center',
		// 	// gridColumn: '2 / span 2',
		// },

		'div:first-of-type': {
			fontWeight: '600',
			margin: '0 10px',
		},
	},
}));
