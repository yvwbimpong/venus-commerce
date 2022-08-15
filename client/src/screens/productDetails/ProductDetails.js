import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Layout, SidePanelContainer } from '../../components/Layout';
import { SIGN_IN } from '../../config/router';
import { appFetch } from '../../config/utils/fetch';
import { AuthUserContext, withAuthentication } from '../../hocs/Auth';

const EDIT_MODE = 'edit';
const VIEW_MODE = 'view';

const ProductDetailsComponent = () => {
	const authState = useContext(AuthUserContext);
	console.log({ authState });
	let { productId } = useParams();
	const history = useHistory();

	const [imageState, setImageState] = useState(
		productId
			? ''
			: 'https://images.ray-ban.com/is/image/RayBan/805289346890_0000.png?impolicy=SEO_4x3'
	);
	const [nameState, setNameState] = useState(productId ? '' : 'Ray Ban');
	const [descriptionState, setDescriptionState] = useState(
		productId
			? ''
			: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida risus urna, vel elementum turpis ultrices volutpat. Nullam mollis massa eu tellus sollicitudin mattis. Quisque ac fringilla mauris, ac tempus tellus. Duis ligula mauris, bibendum et congue vel, ullamcorper id massa. Praesent sed tincidunt enim. Donec turpis est, sagittis ut nulla nec, congue consectetur libero. Nam sollicitudin justo leo, non eleifend libero aliquam vitae. Quisque vel condimentum odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec eget convallis quam.'
	);
	const [priceState, setPriceState] = useState(productId ? '' : 32);
	const [quantityState, setQuantityState] = useState(productId ? '' : 20);

	useEffect(() => {
		console.log('details mounted');
		fetchProduct();
	}, [productId]);

	const fetchProduct = async () => {
		const product = await appFetch({ url: `/products/${productId}` });
		console.log({ product });

		setImageState(product.image);
		setNameState(product.name);
		setDescriptionState(product.description);
		setPriceState(product.price);
		setQuantityState(product.quantity);
	};

	const handleAddToCart = async () => {
		if (!authState.authUser) {
			return history.push(SIGN_IN);
		}
		//else continue to add to cart
		const addToCart = await appFetch({
			url: `/cart/`,
			method: 'POST',
			body: {
				id: productId,
				name: nameState,
				description: descriptionState,
				price: priceState,
				quantity: quantityState,
				image: imageState,
			},
			token: authState.userToken,
		});

		console.log({ addToCart });
		// history.push('/product/' + createdProduct.id);
	};;

	if (
		!imageState ||
		!nameState ||
		// !descriptionState ||
		!priceState ||
		!quantityState
	) {
		console.log('render nothing');
		return <div></div>;
	}

	return (
		<Layout
			SidePanel={() => (
				<SidePanelContainer>
					<Button text="add to cart" boxed={false} onClick={handleAddToCart} />
					{authState?.userDetails?.admin && (
						<Button
							text="edit"
							boxed={false}
							onClick={() => history.push(window.location.pathname + '/edit')}
						/>
					)}
				</SidePanelContainer>
			)}
		>
			<div
				style={{
					flex: 1,
					width: '80%',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						marginBottom: 30,
					}}
				>
					<div
						style={{
							width: 200,
							border: '3.5px solid black',
							padding: '2rem',
							marginRight: 30,
						}}
					>
						<img
							src={imageState}
							style={{
								width: '100%',
								// cursor: 'pointer',

								// height: '100%',
							}}
						/>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<p>{nameState}</p>

						<p>USD {priceState}</p>

						<p>{quantityState} units</p>
					</div>
				</div>
				<div>
					<p>{descriptionState}</p>
				</div>
			</div>
		</Layout>
	);
};;

export const ProductDetails = withAuthentication(ProductDetailsComponent);
