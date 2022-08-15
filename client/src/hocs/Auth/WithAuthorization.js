import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SIGN_IN } from '../../config/router';

import { withFirebase } from '../Firebase';
import AuthUserContext from './AuthContext';

export const withAuthorization = (condition) => (Component) => {
	const WithAuthorization = (props) => {
		console.log({ props });
		useEffect(() => {
			const listener = props.firebase.auth.onAuthStateChanged((authUser) => {
				const userToken = authUser?.multiFactor?.user?.accessToken;
				const userDetails = userToken ? jwtDecode(userToken) : false;
				console.log({ authUser, userToken, userDetails });

				if (
					!condition({
						authUser,
						userDetails,
					})
				) {
					props.history.push(SIGN_IN);
				}
			});

			return () => {
				listener();
			};
		}, []);

		return (
			<AuthUserContext.Consumer>
				{(authUser) => (condition(authUser) ? <Component {...props} /> : null)}
			</AuthUserContext.Consumer>
		);
	};

	return compose(withRouter, withFirebase)(WithAuthorization);
};
