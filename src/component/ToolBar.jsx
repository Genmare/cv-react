import { useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
// import { CSSTransition } from 'react-transition-group';
import styles from '../style/toolbar.module.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';

import ConfirmSave from './ConfirmSave';

import '../App.css';

// import { ColorPicker, createColor } from 'mui-color';
// import ColorPicker from 'react-best-gradient-color-picker';

import { PopoverPicker } from '../Widget/PopoverPicker/PopoverPicker';

import { StyleContext } from '../utils/context';

import ReactToPrint from 'react-to-print';

import '../style/exemple_styles.css';

import Animation from '../Widget/Animation';

// import ImageUploading from 'react-images-uploading';
// import Files from 'react-files';
// import { useFilePicker } from 'use-file-picker';

import {
	getImageUrl,
	getImageUrlFromUidDirectory,
	uploadImage,
	getImageUrlFromCollection,
	writeDataWithRef,
	uploadImageToCollection,
} from '../firebase-config';
import {
	Home,
	LogoutTwoTone,
	PictureAsPdfTwoTone,
	AddAPhotoTwoTone,
} from '@mui/icons-material';
import { Button, IconButton, Tooltip } from '@mui/material';
import Gallery from './Gallery';

const theme = createTheme({
	palette: {
		type: 'light',
		primary: {
			main: '#3f51b5',
		},
		secondary: {
			main: '#f50057',
		},
	},
	typography: {
		// fontSize: '1.1em',
		fontSize: 10.6,
	},
});

const sliderWidth = 200;

const CustomSlider = styled(Slider)({
	width: sliderWidth,
	color: '#555',
	'& .MuiSlider-thumb': {
		[`&:hover, &.Mui-focusVisible`]: {
			boxShadow: '0px 0px 0px 8px var(--box-shadow)',
		},
		[`&.Mui-active`]: {
			boxShadow: '0px 0px 0px 14px var(--box-shadow)',
		},
	},
	'& .MuiSlider-markLabel[data-index="0"]': {
		transform: 'translateX(0%)',
	},
	'& .MuiSlider-markLabel[data-index="1"]': {
		transform: 'translateX(-100%)',
	},
});

const MyCustomCheckbox = ({ width, elevation, onChange, label, checked }) => (
	<Paper elevation={elevation}>
		<FormGroup>
			<FormControlLabel
				sx={{
					p: '0.5em 1em',
					m: '0.5em 0',
					bgcolor: 'background.default',
					display: 'grid',
					fontWeight: '1200',
					gridTemplateColumns: {
						md: `1fr ${width}px`,
					},
				}}
				control={
					<Checkbox
						checked={checked}
						onChange={onChange}
						sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
					/>
				}
				label={label}
			/>
		</FormGroup>
	</Paper>
);

const MyPaperTitleSlider = styled(Paper)({
	padding: '1em',
	margin: '0.5em 0',
	backgroundColor: 'background.default',
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	gap: 2,
	justifyItems: 'center',

	'div:first-of-type': {
		fontWeight: '600',
		marginBottom: '1em',
		gridColumn: '1 / span 2',
		// textAlign: 'center',
	},
});

const MyPaperSlider = styled(Paper)({
	padding: '1em',
	margin: '0.5em 0',
	backgroundColor: 'background.default',
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	gap: 2,
	justifyItems: 'center',
});

const MyPhotoPaper = styled(Paper)({
	padding: '0.5em 1em',
	margin: '0.5em 0',
	backgroundColor: 'background.default',
	display: 'grid',
	gridTemplateColumns: {
		md: `1fr 200px`,
	},
	gap: 2,
	justifyItems: 'center',
	alignItems: 'center',
	fontWeight: '1200',
});

const defaultVars = {
	'--color': '#1976d2',
	'--box-shadow': 'rgb(25, 118, 210, .16)',
};

const PickerLayout = styled('div')({
	padding: 5,
	borderRadius: 12,
	background: '#33333a',
	boxShadow: '0px 6px 12px #999',
	margin: '0.5em',
	// height: '100%',
});

const Container = styled('div')({
	position: 'sticky',
	fontSize: '0.7em',
	top: '0px',
	right: '0',
	width: '100%',
	// maxWidth: '400px',
	// margin: '1em',
	height: '100vh',
	border: '1px solid whitesmoke',
	// borderRadius: '1em',
	padding: '0.5em',
	background: 'rgb(245,245,245, 0.5)',
	zIndex: '30',
	overflow: 'auto',
	// background: `repeating-linear-gradient(
	// 	45deg,
	// 	transparent,
	// 	transparent 6px,
	// 	whitesmoke 12px,
	// 	whitesmoke 24px
	//   )`,
});

const WidgetContener = styled(Paper)({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	background: 'white',
	padding: '0.4em 1em',
	margin: '0.5em 0',
	boxShadow: '0px 6px 12px #999',

	'& p': {
		fontSize: '0.8em',
		fontWeight: '600',
		textTransform: 'uppercase',
		margin: 0,
	},
});

export default function ToolBar({
	// color,
	// changeBgColor,
	id_doc,
	data,
	dispatch,
	logout,
	componentRef,
	toHome,
}) {
	// detect si une ou plusieurs données ont été changés
	let isChanged = false;

	const noop = () => {};

	// const FileInput = ({ value, onChange = noop, ...rest }) => (
	const FileInput = ({ onChange = noop }) => (
		<IconButton
			aria-label="charger une image	"
			component="label"
			// onClick={logout}
			// sx={{
			// 	border: 'solid',
			// 	color: 'white',
			// 	backgroundColor: '#67b9e5',
			// }}
		>
			<input
				accept="image/*"
				type="file"
				style={{ display: 'none' }}
				onChange={(e) => {
					getBase64(e, onChange);
					console.log('FileInput e', e);
					// onChange([...e.target.files]);
					// onChange(e);
					console.log('FileInput changeSrc', 'e', e);
				}}
			/>
			<AddAPhotoTwoTone />
		</IconButton>
	);

	const [imgInputFile, setImgInputFile] = useState(null);

	const getBase64 = (e, onChange) => {
		let file = e.target.files[0];
		setImgInputFile(file); // enregistre le fichier du pc pour pouvoir evantuellement l'enregistrer plus tard
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			console.log('getBase64 reader.result', reader.result);
			onChange(reader.result);
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};
	};

	const changeData = ({
		input,
		prop,
		isEvent = false,
		isCheckbox = false,
	}) => {
		let component = globalStyles.find(
			(component) => component.id === ident
		);
		component[prop] = !isEvent
			? input
			: !isCheckbox
			? input.target.value
			: input.target.checked;
		// console.log(
		// 	'changeData input',
		// 	input,
		// 	'prop',
		// 	prop,
		// 	'componant',
		// 	component
		// );
		dispatch({ type: prop, id: ident, [prop]: component[prop] });

		let arrayWithoutMyComponent = globalStyles.filter(
			(component) => component.id !== ident
		);
		console.log(`\nchangeData ${prop} globalStyles`, globalStyles);
		console.log(`changeData ${prop}`, component[prop], input);
		setglobalStyles([...arrayWithoutMyComponent, component]);

		isChanged = true;
	};

	const changeBackgroundColor = (value) =>
		changeData({ input: value, prop: 'backgroundColor' });

	const changeFontgroundColor = (value) =>
		changeData({ input: value, prop: 'fontColor' });

	const changeIsCircle = (event) =>
		changeData({
			input: event,
			prop: 'isCircle',
			isEvent: true,
			isCheckbox: true,
		});

	const changeZoom = (event) =>
		changeData({
			input: event,
			prop: 'zoom',
			isEvent: true,
		});

	const changeSrc = (event) => {
		// console.log('changeSrc event', event);
		// getBase64(event);
		changeData({
			input: event,
			prop: 'src',
			isEvent: false,
		});
	};

	const changeDim = (dimLen, e) => {
		let photoComponent = globalStyles.find(
			(component) => component.id === ident
		);
		let dim = photoComponent.hasOwnProperty('dim')
			? photoComponent.dim
			: { width: 0, height: 0 };
		let value = e.target.value;
		switch (dimLen) {
			case 'width':
				dim.width = value;
				break;
			case 'height':
				dim.height = value;
				break;
			default:
		}
		dispatch({ type: 'dim', dim });
		photoComponent.dim = dim;
		let arrayWithoutMyComponent = globalStyles.filter(
			(component) => component.id !== ident
		);
		setglobalStyles([...arrayWithoutMyComponent, photoComponent]);

		isChanged = true;
	};

	const changeCoordValue = (axis, e, coordProp) => {
		let photoComponent = globalStyles.find(
			(component) => component.id === ident
		);
		let coord = photoComponent.hasOwnProperty(coordProp)
			? photoComponent[coordProp]
			: { x: 0, y: 0 };
		console.log('changecoord', e);
		let value = e.target.value;
		switch (axis) {
			case 'x':
				coord.x = value;
				break;
			case 'y':
				coord.y = value;
				break;
			default:
		}
		dispatch({ type: coordProp, [coordProp]: coord });
		photoComponent[coordProp] = coord;
		console.log(coordProp, coord);
		let arrayWithoutMyComponent = globalStyles.filter(
			(component) => component.id !== ident
		);
		setglobalStyles([...arrayWithoutMyComponent, photoComponent]);

		isChanged = true;
	};

	const changeCoord = (axis, e) => {
		changeCoordValue(axis, e, 'coord');
	};

	const changeCoordFrame = (axis, e) => {
		changeCoordValue(axis, e, 'coordFrame');
	};

	const { globalStyles, setglobalStyles, ident } = useContext(StyleContext);

	const elevation = 1; // pour le composant Paper de mui

	const saveData = (docRef, data) => {
		// if (isChanged) writeDataWithRef(docRef, data);
		writeDataWithRef(docRef, data);
	};

	const toolbarbtnStyle = {
		// backgroundColor: 'black',
		marginBottom: '20px',
		display: 'flex',
		// flexDirection: 'column',

		// alignItems: 'flex-start',
		// justifyContent: 'center',

		// height: '100%',
	};

	const [imgPaths, setImgPaths] = useState([]);

	const loadPhotoGallery = () => {
		setImgPaths([]);
		getImageUrlFromCollection().then((photoList) => {
			console.log('loadPhotoGallery, photoList:', photoList);
			console.log('loadPhotoGallery, imgPaths', imgPaths);
			// setImgPaths((prevState) => [...prevState, ...photoList]);
			photoList = photoList.sort((photoA, photoB) => {
				console.log(
					'loadPhotoGallery photoA.timestamp',
					photoA.timestamp,
					'photoB.timestamp',
					photoB.timestamp,
					photoA.timestamp < photoB.timestamp ? 0 : 1
				);
				return photoB.timestamp - photoA.timestamp;
			});
			console.log('loadPhotoGallery, après sort photoList:', photoList);
			setImgPaths(photoList);
		});
		// getImageUrlFromUidDirectory((imgPath, name) => {
		// 	console.log('getImageUrl imgPath', imgPath);
		// 	setImgPaths((prevState) => [
		// 		...prevState,
		// 		{
		// 			img: imgPath,
		// 			title: name,
		// 		},
		// 	]);
		// });
	};

	return (
		// <div style={{ position: 'sticky', top: '0px', height: '10000px' }}>
		<Container>
			<div className="toolbarbtn" style={toolbarbtnStyle}>
				<Tooltip title="Page d'Accueil">
					<IconButton
						onClick={toHome}
						sx={{
							border: 'solid',
							color: 'white',
							backgroundColor: '#67b9e5',
						}}
					>
						<Home />
					</IconButton>
				</Tooltip>
				<ConfirmSave
					buttonLabel={'Sauvegarder'}
					query={'Voulez-vous faire une sauvegarde:'}
					// onConfirm={() => console.log(id_doc, data)}
					onConfirm={() => saveData(id_doc, data)}
				/>
				{/* <Logout logout={logout} /> */}
				<Tooltip title="Se déconnecter">
					<IconButton
						onClick={logout}
						sx={{
							border: 'solid',
							color: 'white',
							backgroundColor: '#67b9e5',
						}}
					>
						<LogoutTwoTone />
					</IconButton>
				</Tooltip>
				<ReactToPrint
					content={() => componentRef.current}
					trigger={() => (
						<Tooltip title="Exporter en PDF">
							<IconButton
								sx={{
									border: 'solid',
									color: 'white',
									backgroundColor: '#67b9e5',
								}}
							>
								<PictureAsPdfTwoTone />
							</IconButton>
						</Tooltip>
					)}
				/>
			</div>
			{globalStyles.map((component) => {
				let tools = [];
				console.log('globalStyles', globalStyles);
				if (component.id === ident) {
					tools = Object.keys(component)
						.filter((key) => key !== 'id')
						.map((key, index) => {
							switch (key) {
								case 'backgroundColor':
									return (
										<WidgetContener key={index}>
											<p>Couleur du fond</p>
											<PickerLayout>
												<PopoverPicker
													color={
														component.backgroundColor
													}
													onChange={(e) =>
														changeBackgroundColor(e)
													}
												/>
											</PickerLayout>
										</WidgetContener>
									);
								case 'fontColor':
									return (
										<WidgetContener key={index}>
											<p>Couleur des caractères</p>
											<PickerLayout>
												<PopoverPicker
													color={component.fontColor}
													onChange={(e) =>
														changeFontgroundColor(e)
													}
												/>
											</PickerLayout>
										</WidgetContener>
									);
								case 'src':
									return (
										<MyPhotoPaper
											elevation={elevation}
											key={index}
										>
											<FileInput
												value=""
												onChange={changeSrc}
												key={index}
											/>
											<span>Charger une photo</span>
											<Button
												// disabled={
												// 	!data ||
												// 	!data.photo
												// 		?.photoCollection ||
												// 	data.photo?.photoCollection
												// 		.length === 0
												// }
												onClick={loadPhotoGallery}
											>
												Photothèque
											</Button>
											{imgPaths.length > 0 && (
												<Gallery
													// imgData={imgPaths}
													photoList={imgPaths}
													onClick={changeSrc}
												/>
											)}
											<Button
												onClick={() => {
													// uploadImage(
													// 	imgInputFile,
													// 	loadPhotoGallery
													// );
													uploadImageToCollection(
														imgInputFile,
														loadPhotoGallery
													);
												}}
											>
												Sauver une image
											</Button>
										</MyPhotoPaper>
									);
								case 'isCircle':
									return (
										<MyCustomCheckbox
											width={sliderWidth}
											elevation={elevation}
											checked={data.photo.isCircle}
											onChange={changeIsCircle}
											label={'Bordure en cercle'}
											key={index}
										/>
									);

								case 'zoom':
									return (
										<MyPaperSlider
											elevation={elevation}
											key={index}
										>
											<div>Zoom Photo</div>
											<CustomSlider
												valueLabelDisplay="auto"
												value={component.zoom}
												min={0}
												max={2}
												step={0.01}
												getAriaValueText={(value) =>
													`${value * 100}%`
												}
												valueLabelFormat={(value) =>
													`${value * 100}%`
												}
												marks={[
													{
														value: 0,
														label: '0%',
													},
													{
														value: 2,
														label: '200%',
													},
												]}
												onChange={changeZoom}
											/>
										</MyPaperSlider>
									);
								case 'dim':
									return (
										<MyPaperTitleSlider
											elevation={elevation}
											key={index}
										>
											<div>Dimension du cadre</div>
											<div>Largeur</div>
											<CustomSlider
												valueLabelDisplay="auto"
												value={component.dim.width}
												min={50}
												max={300}
												getAriaValueText={(value) =>
													`${value}px`
												}
												valueLabelFormat={(value) =>
													`${value}px`
												}
												onChange={(e) =>
													changeDim('width', e)
												}
											/>
											<div>Hauteur</div>
											<CustomSlider
												valueLabelDisplay="auto"
												value={component.dim.height}
												min={50}
												max={300}
												getAriaValueText={(value) =>
													`${value}px`
												}
												valueLabelFormat={(value) =>
													`${value}px`
												}
												marks={[
													{
														value: 50,
														label: '50px',
													},
													{
														value: 300,
														label: '300px',
													},
												]}
												onChange={(e) =>
													changeDim('height', e)
												}
											/>
										</MyPaperTitleSlider>
									);
								case 'coord':
									return (
										<MyPaperTitleSlider
											elevation={elevation}
											key={index}
										>
											<div>Coordonnées Photo</div>
											<div>X</div>
											<CustomSlider
												valueLabelDisplay="auto"
												value={component.coord.x}
												min={-100}
												max={100}
												getAriaValueText={(value) =>
													`${value}px`
												}
												valueLabelFormat={(value) =>
													`${value}px`
												}
												onChange={(e) =>
													changeCoord('x', e)
												}
											/>
											<div>Y</div>
											<CustomSlider
												valueLabelDisplay="auto"
												value={component.coord.y}
												min={-100}
												max={100}
												getAriaValueText={(value) =>
													`${value}px`
												}
												valueLabelFormat={(value) =>
													`${value}px`
												}
												marks={[
													{
														value: -100,
														label: '-100px',
													},
													{
														value: 100,
														label: '100px',
													},
												]}
												onChange={(e) =>
													changeCoord('y', e)
												}
											/>
										</MyPaperTitleSlider>
									);
								case 'coordFrame':
									return (
										<MyPaperTitleSlider
											elevation={elevation}
											key={index}
										>
											<div>Coordonnées Cadre</div>
											<div>X</div>
											<CustomSlider
												valueLabelDisplay="auto"
												value={component.coordFrame.x}
												min={-100}
												max={100}
												getAriaValueText={(value) =>
													`${value}px`
												}
												valueLabelFormat={(value) =>
													`${value}px`
												}
												onChange={(e) =>
													changeCoordFrame('x', e)
												}
											/>
											<div>Y</div>
											<CustomSlider
												valueLabelDisplay="auto"
												value={component.coordFrame.y}
												min={-100}
												max={100}
												getAriaValueText={(value) =>
													`${value}px`
												}
												valueLabelFormat={(value) =>
													`${value}px`
												}
												marks={[
													{
														value: -100,
														label: '-100px',
													},
													{
														value: 100,
														label: '100px',
													},
												]}
												onChange={(e) =>
													changeCoordFrame('y', e)
												}
											/>
										</MyPaperTitleSlider>
									);
								default:
									return (
										<div
											key={index}
											style={{ display: 'none' }}
										></div>
									);
							}
						});
				}
				console.log('tools', tools);
				console.log('styles', styles);
				console.log('tools.length', tools.length);
				return (
					// <Example />
					<ThemeProvider theme={theme}>
						<Animation>{tools}</Animation>
					</ThemeProvider>
				);
			})}
		</Container>
		// </div>
	);
}
