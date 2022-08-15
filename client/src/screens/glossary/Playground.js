import React from 'react';
import { Button } from '../../components/Button';
import { ClientList } from '../../components/ClientList/ClientList';
import { ClientListItem } from '../../components/ClientList/components/ClientListItem';
import { Input } from '../../components/Input';
import { Layout } from '../../components/Layout';
import { ProductItem } from '../../components/ProductList/components/ProductItem';
import { ProductList } from '../../components/ProductList/ProductList';
import { Glossary } from './Glossary';

export const Playground = () => {
	return <ClientList />;
	// return <ClientListItem />;
	// return <ProductList />
	// return <ProductItem />;
	// return <Layout />;
	// return <Button />;
	// return <Input />;
	return <Glossary />;
};
