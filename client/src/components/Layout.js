import React, { Children, useContext } from 'react';
import { Button } from './Button';
import { withFirebase } from '../hocs/Firebase';
import {
	AuthUserContext,
	withAuthentication,
	withAuthorization,
} from '../hocs/Auth';
import compose from 'recompose/compose';
import { ADMIN_CLIENT, ADMIN_PRODUCTS, SIGN_IN } from '../config/router';
import { withRouter } from 'react-router';

export const SidePanelContainer = ({ children }) => {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				background: 'white',
			}}
		>
			{children}
		</div>
	);
};

const LayoutComponent = ({
	children,
	SidePanel,
	username = '',
	firebase,
	history,
	...props
}) => {
	const value = useContext(AuthUserContext);
	console.log({ props, value });
	return (
		<div
			style={{
				minWidth: '100vw',
				minHeight: '100vh',
			}}
		>
			<div
				style={{
					border: '3.5px solid black',
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
						onClick={() => history.push('/')}
						style={{
							padding: 0,
							margin: 0,
							cursor: 'pointer',
						}}
					>
						Venus
					</h1>
				</div>
				<div
					style={{
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						padding: '0 2.5%',
					}}
				>
					{value?.userDetails?.admin && (
						<Button
							text="backoffice"
							boxed={false}
							onClick={() => {
								history.push(ADMIN_PRODUCTS);
							}}
						/>
					)}
					{value?.authUser?.displayName && <p>{value.authUser.displayName}</p>}
					{value?.authUser ? (
						<Button
							text="Sign out"
							boxed={false}
							onClick={() => firebase.signOut()}
						/>
					) : (
						<Button
							text="Sign in"
							boxed={false}
							onClick={() => history.push(SIGN_IN)}
						/>
					)}
				</div>
			</div>
			<div
				style={{
					height: 'calc(100vh - 50px)',
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				<div
					style={{
						width: '20%',
						border: '3.5px solid black',
						borderTopColor: 'white',
						position: 'relative',
						top: '-3.5px',
						zIndex: 10,
						height: '100%',
						// flex: 1,
					}}
				>
					{SidePanel && <SidePanel />}
				</div>
				<div
					style={{
						width: '80%',
						height: '100%',
						backgroundColor: 'white',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						padding: '20px 20px',
						boxSizing: 'border-box',
					}}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

export const Layout = compose(
	withRouter,
	withFirebase,
	withAuthentication
)(LayoutComponent);
