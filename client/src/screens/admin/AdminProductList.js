// import React, { useState } from 'react';
// import { Button } from '../../components/Button';
// import { ClientList } from '../../components/ClientList/ClientList';
// import { Layout, SidePanelContainer } from '../../components/Layout';
// import { ProductList } from '../../components/ProductList/ProductList';

// const PRODUCT_VIEW = 'products';
// const CLIENT_VIEW = 'clients';

// export const AdminLanding = () => {
// 	const [modeState, setModeState] = useState(CLIENT_VIEW);

// 	const toggleModeState = () => {
// 		setModeState(modeState === PRODUCT_VIEW ? CLIENT_VIEW : PRODUCT_VIEW);
// 	};

// 	return (
// 		<Layout
// 			SidePanel={() => (
// 				<SidePanelContainer>
// 					{modeState === PRODUCT_VIEW ? (
// 						<>
// 							<Button text="view clients" onClick={toggleModeState} />
// 							<Button text="new product" boxed={false} />
// 						</>
// 					) : (
// 						<Button text="view products" onClick={toggleModeState} />
// 					)}
// 				</SidePanelContainer>
// 			)}
// 		>
// 			{modeState === PRODUCT_VIEW ? <ProductList /> : <ClientList />}
// 		</Layout>
// 	);
// };

import React, { useEffect, useState } from 'react';
import compose from 'recompose/compose';
import { Button } from '../../components/Button';
import { ClientList } from '../../components/ClientList/ClientList';
import { Layout, SidePanelContainer } from '../../components/Layout';
import { ProductList } from '../../components/ProductList/ProductList';
import { ADMIN_CLIENT, PRODUCT_EDIT } from '../../config/router';
import { appFetch } from '../../config/utils/fetch';
import { withAuthorization } from '../../hocs/Auth';

const AdminProductListComponent = ({ history }) => {
	const [productsState, setProductsState] = useState([]);

	useEffect(() => {
		initProducts();
	}, []);

	const initProducts = async () => {
		const products = await appFetch({ url: '/products' });
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
						text="view clients"
						boxed={false}
						onClick={() => history.push(ADMIN_CLIENT)}
					/>
					<Button
						text="new product"
						boxed={false}
						onClick={() => history.push('/product/new/edit')}
					/>
				</SidePanelContainer>
			)}
		>
			<ProductList
				products={productsState}
				onItemClick={(item) => handleSelectProduct(item)}
			/>{' '}
		</Layout>
	);
};

const condition = (authUser) => {
	console.log('cond', authUser);
	return authUser?.authUser && authUser?.userDetails?.admin;
};
export const AdminProductList = compose(withAuthorization(condition))(
	AdminProductListComponent
);
