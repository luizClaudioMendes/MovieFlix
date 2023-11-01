import Navbar from 'components/Navbar';
import PrivateRoute from 'components/PrivateRoute';
import Home from 'pages/Home';
import MovieCatalog from 'pages/private/MovieCatalog';
import { Switch, Route, Router } from 'react-router-dom';
import history from 'util/history';

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <PrivateRoute path="/movies">
        <Route path="/movies" exact>
          <MovieCatalog />
        </Route>
        <Route path="/movies/:movieId">
        <h1>movie detail</h1>
        {/* <MovieDetails /> */}
      </Route>
      </PrivateRoute>
      
    </Switch>
  </Router>
);

export default Routes;
