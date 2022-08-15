import React, { useContext, useEffect, useState } from 'react';
import { compose } from 'recompose';
import { Button } from '../../components/Button';
import { ClientList } from '../../components/ClientList/ClientList';
import { Layout, SidePanelContainer } from '../../components/Layout';
import { ProductList } from '../../components/ProductList/ProductList';
import { ADMIN_PRODUCTS } from '../../config/router';
import { appFetch } from '../../config/utils/fetch';
import { AuthUserContext, withAuthorization } from '../../hocs/Auth';

const AdminClientListComponent = ({ history }) => {
	const authState = useContext(AuthUserContext);
	const [clientState, setClientState] = useState([]);

	useEffect(() => {
		initClients();
	}, []);

	const initClients = async () => {
		const products = await appFetch({
			url: '/clients',
			token: authState.userToken,
		});
		console.log({ products });

		setClientState(products);
	};

	return (
		<Layout
			SidePanel={() => (
				<SidePanelContainer>
					<Button
						text="view products"
						onClick={() => history.push(ADMIN_PRODUCTS)}
						boxed={false}
					/>
				</SidePanelContainer>
			)}
		>
			<ClientList clients={clientState} />
		</Layout>
	);
};

const condition = (authUser) => {
	console.log('cond', authUser);
	return authUser?.authUser && authUser?.userDetails?.admin;
};
export const AdminClientList = compose(withAuthorization(condition))(
	AdminClientListComponent
);
