import React from 'react';
import { ProductItem } from './components/ProductItem';

export const ProductList = ({
	products = Array(20).fill({}),
	onItemClick = (i) => console.log({ i }),
}) => {
	const handleItemClick = (item) => {
		onItemClick(item);
	};

	return (
		<div
			style={{
				width: '80%',
				height: '100%',
				// border: '3.5px solid black',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'flex-start',
				flex: 1,
				overflow: 'scroll',
				alignContent: 'center',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					gap: '2rem',
					flexWrap: 'wrap',
					// width: '80%',
				}}
			>
				{products.map((item) => {
					console.log({ item });
					return (
						<ProductItem
							key={item.id}
							{...item}
							onClick={() => handleItemClick(item)}
						/>
					);
				})}
			</div>
		</div>
	);
};
