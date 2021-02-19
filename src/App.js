import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CharacterDetails, Home, WishList } from './pages';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

// import wishList from './reducers/wishList';
import characterNumber from './reducers/characterNumber';

const store = createStore(combineReducers({ characterNumber }));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={CharacterDetails} path="/character" exact />
          <Route component={WishList} path="/wishlist" exact />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
