import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './containers/Test1/App';
import MainPage from './containers/MainPage/MainPage';
import ProfileCreate from './components/Profile/ProfileCreate';

const Routes = (props) => (

  <BrowserRouter {...props}>
    <div className="app-wrap">
      <Route exact path="/" component={MainPage} />
      <Route exact path="/profile/new" component={ProfileCreate} />
      <Route path="/test/1" component={App} />
    </div>
  </BrowserRouter>

);

export default Routes;