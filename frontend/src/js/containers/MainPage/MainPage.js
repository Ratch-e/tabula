/**
 * Главная страница
 */
import * as React from "react";
import Header from "../Header/Header"
import AddPersonButton from "./AddPersonButton"
import PersonsList from "../../components/MainPage/PersonsList"

class MainPage extends React.Component {
  render() {
    return (
      <div className="page">
        <Header/>
        <div className="content main-page">
          <div className="main-page__actions">
            <AddPersonButton/>
          </div>
          <PersonsList/>
        </div>
      </div>
    );
  }
}

export default MainPage;