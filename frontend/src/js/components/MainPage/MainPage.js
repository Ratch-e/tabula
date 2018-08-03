/**
 * Главная страница
 */
import * as React from "react";
import Header from "../Header/Header"
import PersonsList from "../../containers/MainPage/PersonsList"

class MainPage extends React.Component {
  render() {
    return (
      <div className="page">
        <Header/>
        <div className="content main-page">
          <div className="main-page__actions">
            <a className="button" href="/new_profile">Добавить анкету</a>
            <a className="button" href="/occupations">Добавить профессию</a>
          </div>
          <PersonsList/>
        </div>
      </div>
    );
  }
}

export default MainPage;