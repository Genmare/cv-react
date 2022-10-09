class Tools {
	constructor(globalStyles, setglobalStyles, setIdent) {
		this.globalStyles = globalStyles;
		this.setglobalStyles = setglobalStyles;
		this.setIdent = setIdent;
	}

	/**
	 *
	 * @param {number} currentRef
	 * @param {string} color
	 * @returns computed color in hex
	 */
	getComputedStyleFromVariable(currentRef, color) {
		const trimVar = color.substring(4, color.length - 1);
		console.log('trim', trimVar);
		return getComputedStyle(currentRef).getPropertyValue(trimVar).trim();
	}

	handleColor(cfStyle, currentRef) {
		console.log('tools handleColor', cfStyle, currentRef);
		if (cfStyle.backgroundColor.startsWith('var('))
			cfStyle.backgroundColor = this.getComputedStyleFromVariable(
				currentRef.current,
				cfStyle.backgroundColor
			);
		if (cfStyle.fontColor && cfStyle.fontColor.startsWith('var('))
			cfStyle.fontColor = this.getComputedStyleFromVariable(
				currentRef.current,
				cfStyle.fontColor
			);

		let arrayWithoutMyComponent = this.globalStyles.filter(
			(component) => component.id !== cfStyle.id
		);
		this.setglobalStyles([...arrayWithoutMyComponent, cfStyle]);
		this.setIdent(cfStyle.id);
	}

	// Couleur du background
	getColor(cfStyle) {
		console.log('getColor', cfStyle);
		let gbColor = this.globalStyles.find(
			(component) => component.id === cfStyle.id
		);

		if (gbColor !== undefined)
			cfStyle.backgroundColor = gbColor.backgroundColor;

		return cfStyle.backgroundColor;
	}

	getFontColor(cfStyle) {
		let gbFtColor = this.globalStyles.find(
			(component) => component.id === cfStyle.id
		);

		if (gbFtColor !== undefined) cfStyle.fontColor = gbFtColor.fontColor;

		return cfStyle.fontColor;
	}
}

export default Tools;
