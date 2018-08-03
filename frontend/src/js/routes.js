import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import MainPage from './components/MainPage/MainPage';
import ProfileCreate from './containers/Profile/ProfileCreate';
import OccupationCreate from './containers/Occupation/OccupationCreate';
import Profile from './containers/Profile/Profile';
import Edit from './containers/Profile/ProfileEdit';
import Test from './containers/Test/Test';

const Routes = (props) => (

  <BrowserRouter {...props}>
    <div className="app-wrap">
      <Route exact path="/" component={MainPage} />
      <Route exact path="/new_profile" component={ProfileCreate} />
      <Route exact path="/occupations" component={OccupationCreate} />
      <Route path="/profile/" component={Profile} />
      <Route path="/edit/" component={Edit} />
      <Route path="/test/" component={Test} />
    </div>
  </BrowserRouter>

);

export default Routes;