import React from 'react';

export const ProductItem = ({
	image = 'https://images.ray-ban.com/is/image/RayBan/805289346890_0000.png?impolicy=SEO_4x3',
	name = 'Ray Bans',
	price = 200,
	description,
	quantity,
	onClick = () => console.log(name + ' clicked'),
	style = {},
}) => {
	return (
		<div
			onClick={onClick}
			style={{
				width: 200,
				border: '3.5px solid black',
				padding: '2rem',
				cursor: 'pointer',
				...style,
			}}
		>
			<img
				src={image}
				style={{
					width: '100%',
					// height: '100%',
				}}
			/>
			<p>{name}</p>
			<p>USD {price}</p>
		</div>
	);
};
