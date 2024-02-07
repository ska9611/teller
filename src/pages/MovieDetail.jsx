import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IMG_BASE_URL } from '../components/Movie';

export default function MovieDetail() {
	const { title, overview, release_date } = useParams();
	const { state } = useLocation();
	console.log(title);
	console.log(state);
	console.log(overview);

	return (
		<div className="page-container">
			<div style={{ display: 'flex' }}>
				<img
					style={{ width: '300px', height: '450px' }}
					src={IMG_BASE_URL + state.poster_path}
					alt="영화 포스터 이미지"
				/>
				<div style={{ fontSize: '32px', margin: '25px', padding: '10px' }}>
					{title}
				</div>

				<div style={{ fontSize: '20px', margin: '25px', padding: '10px' }}>
					{state.overview}
				</div>
				<div>{state.release_date}</div>
			</div>
		</div>
	);
}
