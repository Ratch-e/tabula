/**
 * Список пользователей
 */
import * as React from "react";
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
import * as personsAction from '../../actions/PersonsActions'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class PersonsList extends React.Component {

  generatePersonList() {
    //Список людей из стора
    const list = this.props.persons.personList;
    let persons = list.map((person, key) => {
      let params = person.params || {};
      let catNames = Object.keys(params);
      return {
        id: key + 1,
        name:`${person.lastName} ${person.name}`,
        user_id: person._id,
        ...params,
        catNames: catNames
      }
    });

    function linkFormatter(cell, row) {
      return `<a href="profile/${row.user_id}">${cell}</a>`;
    }

    const arr = [
      <TableHeaderColumn 
      key= '1'
      dataField='id' 
      dataSort={ true }
      >№</TableHeaderColumn>,
      <TableHeaderColumn 
      key='2'
      dataField='name'
      dataSort={ true }
      dataFormat={ linkFormatter }
      >Имя</TableHeaderColumn>
    ];

    if(persons.length) {
      for (const item in persons[0].catNames) {
        arr.push(
          <TableHeaderColumn key={ item + 2 } dataField={persons[0].catNames[item]} dataSort={ true }>{ persons[0].catNames[item] }</TableHeaderColumn>
        );
      }
    }

    return ( persons.length ? 
      <BootstrapTable
        keyField='id'
        data={persons}
        search={true}
        pagination={true}
        striped
        hover>
        {
          arr
        }
      </BootstrapTable> : 0
    )
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