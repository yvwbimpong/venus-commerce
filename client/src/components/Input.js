import React, { useEffect, useState } from 'react';

export const Input = ({
	placeholder = 'Default Placeholder',
	value,
	onChange = (val) => console.log(val),
	style = {},
	multiline = false,
}) => {
	const [inputState, setInputeState] = useState('');
	useEffect(() => {
		value && setInputeState(value);
	}, []);

	const handleTextChange = (e) => {
		setInputeState(e.target.value);
		onChange?.(e.target.value);
	};

	return multiline ? (
		<textarea
			placeholder={placeholder}
			value={inputState}
			onChange={handleTextChange}
			style={{
				border: '0px',
				border: '3.5px solid black',
				outline: 'none',
				padding: 10,
				minWidth: 200,
				width: '100%',
				...style,
			}}
		/>
	) : (
		<input
			placeholder={placeholder}
			value={inputState}
			onChange={handleTextChange}
			style={{
				border: '0px',
				border: '3.5px solid black',
				outline: 'none',
				padding: 10,
				minWidth: 200,
				width: '100%',
				...style,
			}}
		/>
	);
};
