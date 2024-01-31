import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Celebrity from './pages/Celebrity';
import Movies from './pages/Movies';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import Home from './pages/Home';
import Headers from './components/Header';
import MovieDetail from './pages/MovieDetail';
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
          {/* <Route path="/movie/:overview" element={<MovieDetail />} /> */}
          <Route path="/search" element={<Search />} />
          <Route path="/celebrity" element={<Celebrity />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
// 안녕
