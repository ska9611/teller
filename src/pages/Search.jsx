import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Search() {
	const [books, setBooks] = useState([]);
	useEffect(() => {
		axios.get('http:192.168.10.100:3000/books').then((response) => {
			setBooks(response.data);
		});
	});
	return <div></div>;
}
