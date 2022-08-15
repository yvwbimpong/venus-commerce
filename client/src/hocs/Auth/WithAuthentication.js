import React, { useEffect, useState } from 'react';
import { withFirebase } from '../Firebase';
import AuthUserContext from './AuthContext';
import jwtDecode from 'jwt-decode';

export const withAuthentication = (Component) => {
	const WithAuthentication = (props) => {
		const [authUserState, setAuthUserState] = useState(null);

		useEffect(() => {
			const listener = props.firebase.auth.onAuthStateChanged((authUser) => {
				const userToken = authUser?.multiFactor?.user?.accessToken;
				const userDetails = userToken ? jwtDecode(userToken) : false;
				console.log({ authUser, userToken, userDetails });

				authUser
					? setAuthUserState({ authUser, userDetails, userToken })
					: setAuthUserState({ authUser: null });
			});

			return () => {
				listener();
			};
		}, []);

		return (
			<AuthUserContext.Provider value={authUserState}>
				<Component {...props} />
			</AuthUserContext.Provider>
		);
	};

	return withFirebase(WithAuthentication);
};
