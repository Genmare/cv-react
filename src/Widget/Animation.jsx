import { useEffect, useState } from 'react';
import styles from '../style/toolbar.module.css';

const Animation = ({ children }) => {
	const [displayStyle, setDisplayStyle] = useState(styles.popEnter);
	useEffect(() => {
		const timeout = setTimeout(
			() => setDisplayStyle(styles.popEnterActive),
			200
		);
		return () => {
			clearTimeout(timeout);
			// setTimeout(() => setDisplayStyle(styles.popExitActive), 200);
		};
	}, []);

	return <div className={displayStyle}>{children}</div>;
};

export default Animation;

export const AnimationV2 = ({ children, show }) => {
	useEffect(() => {
		let timeoutEnter, timeoutExit;
		if (show) {
			timeoutEnter = setTimeout(
				() => setDisplayStyle(styles.popEnterActive),
				200
			);
		} else {
			timeoutExit = setTimeout(
				() => setDisplayStyle(styles.popExitActive),
				200
			);
		}

		return () => {
			// setTimeout(() => setDisplayStyle(styles.popEnter), 200);
			clearTimeout(timeoutEnter);
			clearTimeout(timeoutExit);
		};
	}, [show]);

	const [displayStyle, setDisplayStyle] = useState(styles.popEnter);

	return <div className={displayStyle}>{children}</div>;
};
