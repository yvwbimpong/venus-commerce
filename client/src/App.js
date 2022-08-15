import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Playground } from './screens/glossary/Playground';
import { AuthLanding, Signin } from './screens/auth/Signin';
import { ProductLanding } from './screens/productLanding/ProductLanding';
import { ProductDetails } from './screens/productDetails/ProductDetails';
import {
	AdminLanding,
	AdminProductList,
} from './screens/admin/AdminProductList';
import { Register } from './screens/auth/Register';
import { ProductEdit } from './screens/productDetails/ProductEdit';
import * as ROUTES from './config/router';
import { useEffect, useState } from 'react';
import { withFirebase } from './hocs/Firebase';
import { AuthUserContext, withAuthentication } from './hocs/Auth';
import { AdminClientList } from './screens/admin/AdminClientList';
import { Cart } from './screens/cart/Cart';

if (process.env.NODE_ENV !== 'development') {
	console.log = () => null;
}

function App() {
	return (
		<Router forceRefresh={true}>
			<Route exact path={ROUTES.PRODUCTS} component={ProductLanding} />
			<Route exact path={ROUTES.CART} component={Cart} />
			<Route path={ROUTES.SIGN_IN} component={Signin} />
			<Route path={ROUTES.REGISTER} component={Register} />
			<Route path={ROUTES.ADMIN_PRODUCTS} component={AdminProductList} />
			<Route path={ROUTES.ADMIN_CLIENT} component={AdminClientList} />
			<Route exact path={ROUTES.PRODUCT_EDIT} component={ProductEdit} />
			<Route exact path={ROUTES.PRODUCT_DETAILS} component={ProductDetails} />
		</Router>
	);
}

export default withAuthentication(App);
