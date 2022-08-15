import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../hocs/Firebase';
import { compose } from 'recompose';
import { PRODUCTS, REGISTER } from '../../config/router';

const SigninComponent = ({ history, firebase }) => {
	console.log({ history, firebase });
	const [emailState, setEmailState] = useState('');
	const [passwordState, setPasswordState] = useState('');

	const handleSignIn = ({ email, password }) => {
		console.log('signin', { email, password });
		firebase
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				setEmailState('');
				setPasswordState('');
				history.push(PRODUCTS);
			})
			.catch((error) => {
				this.setState({ error });
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
					{/* {modeState === SIGN_IN_MODE ? ( */}
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
						<Button
							text="sign in"
							onClick={() =>
								handleSignIn({
									email: emailState,
									password: passwordState,
								})
							}
						/>
						<Button
							text="Register"
							boxed={false}
							onClick={() => history.push(REGISTER)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export const Signin = compose(withRouter, withFirebase)(SigninComponent);

const authFormWrapper = {
	display: 'flex',
	flexDirection: 'column',
	gap: '10px',
	alignItems: 'center',
};
