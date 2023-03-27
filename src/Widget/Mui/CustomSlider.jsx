import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

export const CustomSlider = styled(Slider)(({ sliderWidth }) => ({
	width: sliderWidth,
	// }))
	//   ({
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
}));
// };

// const MyStyledButton = styled('button')((props) => ({
// 	backgroundColor: props.myBackgroundColor,
//   }));
