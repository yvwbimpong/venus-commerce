import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import compose from 'recompose/compose';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Layout, SidePanelContainer } from '../../components/Layout';
import { ADMIN_PRODUCTS } from '../../config/router';
import { appFetch } from '../../config/utils/fetch';
import { getBase64 } from '../../config/utils/getBase64';
import { AuthUserContext, withAuthorization } from '../../hocs/Auth';

const EDIT_MODE = 'edit';
const VIEW_MODE = 'view';

const ProductEditComponent = () => {
	const authState = useContext(AuthUserContext);
	let { productId } = useParams();
	const history = useHistory();

	const inputFileRef = useRef(null);
	const productRef = useRef(null);
	const [imageState, setImageState] = useState(
		productId
			? ''
			: 'https://images.ray-ban.com/is/image/RayBan/805289346890_0000.png?impolicy=SEO_4x3'
	);
	const [selectedImageState, setSelectedImageState] = useState(null);
	const [nameState, setNameState] = useState(productId ? '' : 'Ray Ban');
	const [descriptionState, setDescriptionState] = useState(
		productId
			? ''
			: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida risus urna, vel elementum turpis ultrices volutpat. Nullam mollis massa eu tellus sollicitudin mattis. Quisque ac fringilla mauris, ac tempus tellus. Duis ligula mauris, bibendum et congue vel, ullamcorper id massa. Praesent sed tincidunt enim. Donec turpis est, sagittis ut nulla nec, congue consectetur libero. Nam sollicitudin justo leo, non eleifend libero aliquam vitae. Quisque vel condimentum odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec eget convallis quam.'
	);
	const [priceState, setPriceState] = useState(productId ? '' : 32);
	const [quantityState, setQuantityState] = useState(productId ? '' : 20);

	console.log('editor comp', { authState });
	useEffect(() => {
		productId !== 'new' && fetchProduct();
	}, [productId]);

	const fetchProduct = async () => {
		const product = await appFetch({ url: `/products/${productId}` });
		console.log({ product });

		productRef.current = product;
		setImageState(product.image);
		setNameState(product.name);
		setDescriptionState(product.description);
		setPriceState(product.price);
		setQuantityState(product.quantity);
	};

	const handleSaveProduct = async () => {
		if (productId !== 'new') {
			const updatedProduct = await appFetch({
				url: `/products/${productId}`,
				method: 'PATCH',
				body: {
					...(nameState !== productRef.current.name && { name: nameState }),
					...(descriptionState !== productRef.current.description && {
						description: descriptionState,
					}),
					...(priceState !== productRef.current.price && { price: priceState }),
					...(quantityState !== productRef.current.quantity && {
						quantity: quantityState,
					}),
					...(selectedImageState && { image_base64Obj: selectedImageState }),
				},
				token: authState.userToken,
			});

			console.log({ updatedProduct });
			history.push('/product/' + productId);
		} else {
			const createdProduct = await appFetch({
				url: `/products/`,
				method: 'POST',
				body: {
					name: nameState,
					description: descriptionState,
					price: priceState,
					quantity: quantityState,
					image_base64Obj: selectedImageState,
				},
				token: authState.userToken,
			});

			console.log({ createdProduct });
			history.push('/product/' + createdProduct.id);
		}
	};
	const onFileChangeCapture = async (e) => {
		console.log(e.target.files);

		const file = e.target.files[0];
		const b64 = await getBase64(file);
		console.log({
			b64,
			url: URL.createObjectURL(file),
			split: b64.split(','),
		});

		const base64Str = b64.split(',')[1];
		console.log({ base64Str });

		setSelectedImageState({
			fileName: file.name,
			base64: base64Str,
		});
		setImageState(URL.createObjectURL(file));
	};
	const onBtnClick = () => {
		inputFileRef.current.click();
	};

	if (
		(!imageState ||
			!nameState ||
			// !descriptionState ||
			!priceState ||
			!quantityState) &&
		!productRef.current &&
		productId !== 'new'
	) {
		console.log('render nothing');
		return <div></div>;
	}

	return (
		<Layout
			SidePanel={() => (
				<SidePanelContainer>
					<Button
						text="save"
						boxed={false}
						onClick={() => handleSaveProduct()}
					/>
					<Button
						text="cancel"
						boxed={false}
						onClick={() =>
							productId === 'new'
								? history.push(ADMIN_PRODUCTS)
								: history.push('/product/' + productId)
						}
					/>
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
						onClick={onBtnClick}
						style={{
							width: 200,
							border: '3.5px solid black',
							padding: '2rem',
							marginRight: 30,
							cursor: 'pointer',
						}}
					>
						<img
							src={imageState}
							style={{
								width: '100%',
							}}
						/>
						<input
							style={{
								display: 'none',
							}}
							type="file"
							ref={inputFileRef}
							onChangeCapture={onFileChangeCapture}
						/>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Input
							placeholder="Name"
							value={nameState}
							onChange={setNameState}
						/>
						<Input
							placeholder="Price"
							value={priceState}
							onChange={setPriceState}
						/>
						<Input
							placeholder="Quantity"
							value={quantityState}
							onChange={setQuantityState}
						/>
					</div>
				</div>
				<div>
					<Input
						placeholder="description"
						value={descriptionState}
						onChange={setDescriptionState}
						multiline
					/>
				</div>
			</div>
		</Layout>
	);
};

const condition = (authUser) => {
	console.log('cond', authUser);
	return authUser?.authUser && authUser?.userDetails?.admin;
};

export const ProductEdit = compose(withAuthorization(condition))(
	ProductEditComponent
);
