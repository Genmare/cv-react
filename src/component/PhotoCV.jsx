import React, { useContext } from 'react';
import styled from 'styled-components';

// import photoCV from '../data/cv.bmp';
import photoCV from '../data/cv-max.bmp';
// import photoCV from '../data/photoCV2019-2.jpg';
// import photoCV from '../data/photoCV2019-2-min.jpg';

import { StyleContext } from '../utils/context';

const PhotoCanvas = styled.div`
	background-color: rgba(255, 255, 255, 0.2);
	background-clip: content-box;
	position: relative;
	grid-column: 2 / 3;
	grid-row: 1 / 4;
	z-index: 20;
	margin: auto;
	clip-path: ${({ dim, isCircle }) => {
		const radius = Math.min(dim.width, dim.height) * 0.5;
		let { width, height } = dim;
		if (width > height) {
			width *= 0.5;
			height = radius;
		} else {
			width = radius;
			height *= 0.5;
		}
		return isCircle
			? `ellipse(${radius}px ${radius}px at ${width}px ${height}px)`
			: `ellipse(100% 100% at center)`;
		// : 'none';
	}};
	transition: clip-path 0.4s;
	width: ${({ dim }) => `${dim.width}px`};
	height: ${({ dim }) => `${dim.height}px`};
	overflow: hidden;

	left: ${({ coordFrame }) => {
		console.log('style coord', coordFrame.x);
		return `${coordFrame.x}px`;
	}};
	top: ${({ coordFrame }) => `${coordFrame.y}px`};
`;

const Photo = styled.img`
	position: absolute;
	left: ${({ coord }) => `${coord.x}px`};
	top: ${({ coord }) => `${coord.y}px`};
	/* transform: translateX(-25%) translateY(-25%)
		${({ zoom }) => `scale(${zoom}, ${zoom})`}; */
	transform: ${({ zoom, dim }) =>
		`translateX(calc(-50% + ${dim.width * 0.5}px)) 
			translateY(calc(-50% + ${dim.height * 0.5}px))
			scale(${zoom}, ${zoom})`};
`;

export default function PhotoCV({ photo, dispatch }) {
	// const [photo, setPhoto] = useState(photoCV);
	console.log('PhotoCV', photo);
	console.log('photo.isCircle', photo.isCircle, 'photo.zoom', photo.zoom);

	const { globalStyles, setglobalStyles, setIdent } =
		useContext(StyleContext);

	let cfStyles = {
		id: 'Photo',
		src: photoCV,
		isCircle: photo.isCircle || false,
		dim: {
			width: photo.dim.width || 200,
			height: photo.dim.height || 200,
		},
		zoom: photo.zoom || 1.5,
		coord: {
			x: photo.coord.x || 0,
			y: photo.coord.y || 0,
		},
		coordFrame: {
			x: photo.coordFrame.x || 0,
			y: photo.coordFrame.y || 0,
		},
	};

	const photoClick = (e) => {
		e.stopPropagation();
		if (
			globalStyles.findIndex((component) => component.id === 'Photo') ===
			-1
		) {
			console.log('photoClick border', cfStyles);
			setglobalStyles([...globalStyles, cfStyles]);
		}
		setIdent('Photo');
		console.log('photoClick cfStyles', cfStyles);
	};

	const getData = (prop) => {
		let dataStyle = globalStyles.find(
			(component) => component.id === 'Photo'
		);

		if (dataStyle !== undefined) {
			let data = dataStyle[prop];
			cfStyles[prop] = data;
			console.log('get' + prop, cfStyles[prop]);
			return data;
		}
		console.log(`d get${prop} globalStyles`, globalStyles);
		console.log(`d get${prop}`, cfStyles[prop]);

		return cfStyles[prop];
	};

	const getSrc = () => getData('src');

	const getDim = () => getData('dim');

	const getZoom = () => getData('zoom');

	const getCoord = () => getData('coord');

	const getCoordFrame = () => getData('coordFrame');

	const isEncircled = () => getData('isCircle');

	return (
		// eslint-disable-next-line jsx-a11y/img-redundant-alt
		<PhotoCanvas
			onClick={photoClick}
			dim={getDim()}
			isCircle={isEncircled()}
			zoom={getZoom()}
			coordFrame={getCoordFrame()}
		>
			<Photo
				src={getSrc()}
				zoom={getZoom()}
				coord={getCoord()}
				dim={getDim()}
			/>
		</PhotoCanvas>
	);
}
