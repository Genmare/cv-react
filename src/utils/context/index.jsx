import { createContext, useState } from 'react';

export const StyleContext = createContext();

export const StyleProvider = ({ children }) => {
	const [globalStyles, setglobalStyles] = useState([]);
	const [ident, setIdent] = useState(null);

	return (
		<StyleContext.Provider
			value={{ globalStyles, setglobalStyles, ident, setIdent }}
		>
			{children}
		</StyleContext.Provider>
	);
};
