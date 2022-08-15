import React from 'react';

export const ClientListItem = ({
	displayName = 'kong',
	email = 'amoakooseiyaw@gmail.com',
	onClick = () => console.log(displayName + ' clicked'),
	style = {},
}) => {
	return (
		<div
			onClick={onClick}
			style={{
				width: '100%',
				border: '3.5px solid black',
				padding: '2rem',
				display: 'flex',
				cursor: 'pointer',
				boxSizing: 'border-box',
				...style,
			}}
		>
			<p style={{ marginRight: 30 }}>{displayName}</p>
			<p>{email}</p>
		</div>
	);
};
