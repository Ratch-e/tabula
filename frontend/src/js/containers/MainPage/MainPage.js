import * as React from "react";
import Header from "../Header/Header"
import AddPersonButton from "../../components/MainPage/AddPersonButton"


class MainPage extends React.Component {
  render() {
    return (
      <div className="page">
        <Header/>
        <div className="content">
            <AddPersonButton/>
        </div>
      </div>
    );
  }
}

export default MainPage;