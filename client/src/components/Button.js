import React from 'react';

export const Button = ({
	text = 'default text',
	boxed = true,
	onClick = () => console.log(text + ' button clicked'),
	style = {},
}) => {
	return (
		<div
			onClick={onClick}
			style={{
				...(boxed && { border: '3.5px solid black' }),
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '10px 20px',
				textTransform: 'capitalize',
				cursor: 'pointer',
				...style,
			}}
		>
			<b>{text}</b>
		</div>
	);
};
