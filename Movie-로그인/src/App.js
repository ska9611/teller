import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Movies from './pages/Movies';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import Home from './pages/Home';
import Headers from './components/Header';
import MovieDetail from './pages/MovieDetail';
import Mypage from './pages/Mypage';
import Login from './pages/Login';
function App() {
  return (
    <div className="root-wrap">
      <BrowserRouter>
        <Headers />
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
