import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { hashVal } from '../../config/utils/hasher';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../hocs/Firebase';
import { PRODUCTS, SIGN_IN } from '../../config/router';
import { compose } from 'recompose';

const RegisterComponent = ({ history, firebase, ...props }) => {
	const [emailState, setEmailState] = useState('');
	const [passwordState, setPasswordState] = useState('');
	const [usernameState, setUsernameState] = useState('');

	const handleRegister = ({ email, password, username }) => {
		password = hashVal(password);
		console.log('signin', { email, password, username });

		firebase
			.createUserWithEmailAndPassword(email, password)
			.then(async (authUser) => {
				console.log({ authUser, uid: authUser.user.uid });
				setEmailState('');
				setPasswordState('');
				setUsernameState('');
				const updatedDisplayName = await firebase.setDisplayName(username);
				const saveDisplayNameToDb = await firebase.saveUsername(
					username,
					email,
					authUser.user.uid
				);
				history.push(PRODUCTS);
			})
			.catch((error) => {
				console.log({ error });
			});
	};

	return (
		<div
			style={{
				minWidth: '100vw',
				minHeight: '100vh',
			}}
		>
			<div
				style={{
					border: '0px solid black',
					height: '50px',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<div
					style={{
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						padding: '0 2.5%',
					}}
				>
					<h1
						style={{
							padding: 0,
							margin: 0,
						}}
					>
						Venus
					</h1>
				</div>
			</div>
			<div
				style={{
					height: 'calc(100vh - 50px)',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						width: '100%',
						maxWidth: 400,
					}}
				>
					<div style={authFormWrapper}>
						<Input
							placeholder="E-Mail"
							onChange={setEmailState}
							value={emailState}
						/>
						<Input
							placeholder="Password"
							onChange={setPasswordState}
							value={passwordState}
						/>
						<Input
							placeholder="Username"
							onChange={setUsernameState}
							value={usernameState}
						/>
						<Button
							text="register"
							onClick={() =>
								handleRegister({
									email: emailState,
									password: passwordState,
									username: usernameState,
								})
							}
						/>
						<Button
							text="Sign in"
							boxed={false}
							onClick={() => history.push(SIGN_IN)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export const Register = compose(withRouter, withFirebase)(RegisterComponent);

const authFormWrapper = {
	display: 'flex',
	flexDirection: 'column',
	gap: '10px',
	alignItems: 'center',
};
