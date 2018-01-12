import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './containers/Test1/App';
import MainPage from './containers/MainPage/MainPage';
import ProfileCreate from './components/Profile/ProfileCreate';
import Profile from './components/Profile/Profile';

const Routes = (props) => (

  <BrowserRouter {...props}>
    <div className="app-wrap">
      <Route exact path="/" component={MainPage} />
      <Route exact path="/new_profile" component={ProfileCreate} />
      <Route path="/profile/" component={Profile} />
      <Route path="/test/1" component={App} />
    </div>
  </BrowserRouter>

);

export default Routes;