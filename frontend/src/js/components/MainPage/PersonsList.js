/**
 * Список пользователей
 */
import * as React from "react";
import Person from "../../containers/MainPage/PersonsListItem";
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
import * as personsAction from '../../actions/PersonsActions'

class PersonsList extends React.Component {

  generatePersonList() {
    //Список людей из стора
    let list = this.props.persons.personList;

    return list.map((person, key) => {
      return <Person key={key} name={person.name} lastName={person.lastName} id={person._id}/>;
    });
  }

  /**
   * Загрузка списка пользователей при загрузке компонента
   */
  componentDidMount() {
    this.props.personActions.fetchPersons();
  }

  render() {
    return (
      <div className="person-list">{
        this.generatePersonList()
      }</div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonsList);