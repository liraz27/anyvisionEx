import React from 'react';
import { Home } from './Home/Home';
import Login from './Login/Login';
import Register from './Register/Register';
import UserHomePage from './UserHomePage/UserHomePage';
import RtspGrid from './RtspGrid/RtspGrid';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/initStore';


const App = () => {
  return (
    <div className="App-intro">
      <Provider store={store}>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/' exact component={Home} />
        <Route path='/userHomePage' component={UserHomePage} />
        <Route path='/rtspGrid' component={RtspGrid} />
      </Provider>
    </div>

  );
}

export default App;
