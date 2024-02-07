import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Movies from './src/pages/Movies';
import NotFound from './src/pages/NotFound';
import Search from './src/pages/Search';
import Home from './src/pages/Home';
import Header from './src/components/Header';
import MovieDetail from './src/pages/MovieDetail';
import Mypage from './src/pages/Mypage';
import Login from './src/pages/Login';
function App() {
	return (
		<div className="root-wrap">
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/movie" element={<Movies />} />
					<Route path="/movie/:title" element={<MovieDetail />} />
					<Route path="/movie/:overview" element={<MovieDetail />} />
					<Route path="/search" element={<Search />} />
					<Route path="/*" element={<NotFound />} />
					<Route path="/mypage" element={<Mypage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
