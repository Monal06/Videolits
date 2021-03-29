import './App.css';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/movie-details' component={MovieDetails}></Route>
      </Switch>
    </Router>
  );
}

export default App;
