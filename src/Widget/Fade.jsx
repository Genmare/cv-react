import React, { useEffect, useState } from 'react';
import styles from '../style/toolbar.module.css';

/*
	Trouvé sur le site https://czaplinski.io/blog/super-easy-animation-with-react-hooks/
*/

const Fade = ({ show, children }) => {
	const [shouldRender, setRender] = useState(show);

	useEffect(() => {
		if (show) setRender(true);
	}, [show]);

	const onAnimationEnd = () => {
		if (!show) setRender(false);
	};

	return (
		shouldRender && (
			<div
				className={show ? styles.popEnterActive : styles.popExitActive}
				// style={{ animation: `${show ? 'fadeIn' : 'fadeOut'} 1s` }}
				onAnimationEnd={onAnimationEnd}
			>
				{children}
			</div>
		)
	);
};

export default Fade;
