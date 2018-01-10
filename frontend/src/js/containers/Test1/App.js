import * as React from "react";
import PersonList from "../../components/Test1/PersonList"
import PersonAdder from "../../components/Test1/PersonAdder";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Person list App</h1>
        <PersonAdder/>
        <PersonList/>
      </div>
    );
  }
}

export default App;