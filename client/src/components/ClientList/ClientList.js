import React from 'react';
import { ClientListItem } from './components/ClientListItem';

export const ClientList = ({ clients = Array(20).fill({}) }) => {
	return (
		<div
			style={{
				// width: '80%',
				height: '100%',
				// border: '3.5px solid black',
				display: 'flex',
				flexDirection: 'column',
				gap: 20,
				justifyContent: 'center',
				alignItems: 'flex-start',
				flex: 1,
				overflow: 'scroll',
				alignContent: 'center',
			}}
		>
			{clients.map((item) => {
				return <ClientListItem key={item.id} {...item} />;
			})}
		</div>
	);
};
