import Navbar from 'components/Navbar';
import Home from 'pages/Home';
import { Switch, Route, Router } from 'react-router-dom';
import history from 'util/history';

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/movies" exact>
        <h1>movies</h1>
      </Route>
      <Route path="/movies/:movieId">
        <h1>movie detail</h1>
      </Route>
    </Switch>
  </Router>
);

export default Routes;
