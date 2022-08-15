import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import compose from 'recompose/compose';
import { Button } from '../../components/Button';
import { Layout, SidePanelContainer } from '../../components/Layout';
import { ProductList } from '../../components/ProductList/ProductList';
import { PRODUCTS, PRODUCT_DETAILS } from '../../config/router';
import { appFetch } from '../../config/utils/fetch';
import {
	AuthUserContext,
	withAuthentication,
	withAuthorization,
} from '../../hocs/Auth';

const condition = (authUser) => {
	console.log('cond', authUser);
	return authUser?.authUser;
};

export const Cart = compose(withAuthorization(condition))(() => {
	const authState = useContext(AuthUserContext);
	console.log({ authState });
	const history = useHistory();
	const [productsState, setProductsState] = useState([]);

	useEffect(() => {
		initCart();
	}, []);

	const initCart = async () => {
		const products = await appFetch({
			url: '/cart',
			token: authState.userToken,
		});
		console.log({ products });

		setProductsState(products);
	};

	const handleSelectProduct = (item) => {
		console.log({ item });
		history.push(`/product/${item.id}`);
	};

	return (
		<Layout
			SidePanel={() => (
				<SidePanelContainer>
					<Button
						text="back"
						style={{
							margin: '20px 0px',
						}}
						boxed={false}
						onClick={() => history.push(PRODUCTS)}
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
});
