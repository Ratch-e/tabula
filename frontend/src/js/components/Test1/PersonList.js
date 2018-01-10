/**
 * Список пользователей
 */

import * as React from "react";
import Person from "./Person";
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
import * as personsAction from '../../actions/PersonsActions'

class PersonList extends React.Component {

  generatePersonList() {
    //Список людей из стора
    let list = this.props.persons.personList;

    return list.map((person, key) => {
      return <Person key={key} name={person.name} id={person._id}/>;
    });
  }

  render() {
    return (
      <div className={"person-list"}>{
        this.generatePersonList()
      }</div>
    );
  }

  componentDidMount() {
    this.props.personActions.fetchPersons();
  }

}

function mapStateToProps (state) {
  return {
    persons: state.persons
  }
}

function mapDispatchToProps(dispatch) {
  return {
    personActions: bindActionCreators(personsAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonList);