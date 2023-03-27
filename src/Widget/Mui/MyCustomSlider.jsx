import React from 'react';
import { CustomSlider } from './CustomSlider';
import { MyPaperTitleSlider } from './MyPaperTitleSlider';

const sliderWidth = 200;

function MyCustomSlider({
	elevation,
	changeValue,
	component,
	firstLabel,
	firstChangedValue,
	firstValue,
	min,
	minMarks,
	max,
	maxMarks,
	secondValue,
	secondLabel,
	secondChangedValue,
	lgResponsive,
	title,
}) {
	return (
		<MyPaperTitleSlider elevation={elevation}>
			<div>{title}</div>
			<div>{firstLabel}</div>
			<CustomSlider
				sliderWidth={sliderWidth}
				valueLabelDisplay="auto"
				// value={component.dim.width}
				value={firstValue}
				min={min}
				max={max}
				getAriaValueText={(value) => `${value}px`}
				valueLabelFormat={(value) => `${value}px`}
				marks={
					lgResponsive && [
						{
							value: minMarks.value,
							label: minMarks.label,
						},
						{
							value: maxMarks.value,
							label: maxMarks.label,
						},
					]
				}
				onChange={(e) => changeValue(firstChangedValue, e)}
			/>
			<div>{secondLabel}</div>
			<CustomSlider
				sliderWidth={sliderWidth}
				valueLabelDisplay="auto"
				// value={component.dim.height}
				value={secondValue}
				min={min}
				max={max}
				getAriaValueText={(value) => `${value}px`}
				valueLabelFormat={(value) => `${value}px`}
				marks={[
					{
						value: minMarks.value,
						label: minMarks.label,
					},
					{
						value: maxMarks.value,
						label: maxMarks.label,
					},
				]}
				onChange={(e) => changeValue(secondChangedValue, e)}
			/>
		</MyPaperTitleSlider>
	);
}

export default MyCustomSlider;
