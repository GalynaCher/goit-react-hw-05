import { Route, Routes } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
// import HomePage from '../pages/HomePage/HomePage';
// import MoviesPage from '../pages/MoviesPage/MoviesPage'
// import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage'
import MovieCast from './MovieCast/MovieCast';
import MovieReviews from './MovieReviews/MovieReviews';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import css from "./App.module.css"
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../pages/MovieDetailsPage/MovieDetailsPage"));

function App() {
  return (
    <>
      <div className={css.container}>
        <Navigation />       
        <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route        path="/" element={<HomePage />}/>
          <Route        path="/movies" element={<MoviesPage />} />
          <Route        path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route    path="cast" element={<MovieCast /> } />
              <Route    path="reviews" element={<MovieReviews />} />
          </Route>
          <Route        path="*" element={<NotFoundPage />} />
          </Routes> 
        </Suspense>
      </div>
    </>
  )
}

export default App
