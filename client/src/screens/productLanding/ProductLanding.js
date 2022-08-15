import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from '../../components/Button';
import { Layout, SidePanelContainer } from '../../components/Layout';
import { ProductList } from '../../components/ProductList/ProductList';
import { CART, PRODUCT_DETAILS } from '../../config/router';
import { appFetch } from '../../config/utils/fetch';

export const ProductLanding = () => {
	const history = useHistory();
	const productsRef = useRef(null);
	const [productsState, setProductsState] = useState([]);

	useEffect(() => {
		initProducts();
	}, []);

	const initProducts = async () => {
		const products = await appFetch({ url: '/products' });
		console.log({ products });

		setProductsState(products);
		productsRef.current = products;
	};

	const handleSelectProduct = (item) => {
		console.log({ item });
		history.push(`/product/${item.id}`);
	};

	const handleSortProducts = () => {
		const sortedProducts = productsState.sort((a, b) => {
			console.log(a, b);
			if (parseFloat(a.price) < parseFloat(b.price)) {
				return -1;
			}
			if (parseFloat(a.price) > parseFloat(b.price)) {
				return 1;
			}
			// a must be equal to b
			return 0;
		});

		setProductsState([...sortedProducts]);
	};

	const handleFilterProducts = (key) => {
		if (!key) {
			setProductsState([...productsRef.current]);
			return;
		}

		const filteredProducts = productsRef.current.filter((a) => {
			return parseFloat(a.price) < key;
		});

		setProductsState([...filteredProducts]);
	};

	return (
		<Layout
			SidePanel={() => (
				<SidePanelContainer>
					<Button
						text="cart"
						style={{
							margin: '20px 0px',
						}}
						boxed={false}
						onClick={() => history.push(CART)}
					/>
					<Button text="sort" boxed={false} onClick={handleSortProducts} />
					<Button
						text="price < 1000"
						boxed={false}
						onClick={() => handleFilterProducts(1000)}
					/>
					<Button
						text="price < 10000"
						boxed={false}
						onClick={() => handleFilterProducts(10000)}
					/>
					<Button
						text="price < 100000"
						boxed={false}
						onClick={() => handleFilterProducts(100000)}
					/>
					<Button
						text="no filter"
						boxed={false}
						onClick={() => handleFilterProducts(0)}
					/>
				</SidePanelContainer>
			)}
		>
			<ProductList
				products={productsState}
				onItemClick={(item) => handleSelectProduct(item)}
			/>
		</Layout>
	);
};
