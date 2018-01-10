/**
 * Вывод имени отдельного человека
 *
 * @class Person
 * @extends {React.Component}
 */
import * as React from "react";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as personsAction from '../../actions/PersonsActions'

class Person extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      id: props.id
    };

    this.deletePerson = this.deletePerson.bind(this);
  }

  getName() {
    return this.state.name;
  }

  getId() {
    return this.state.id;
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.name !== nextProps.name) {
      this.setState({ name: nextProps.name });
    }
    if(this.state.id !== nextProps.id) {
      this.setState({ id: nextProps.id });
    }
  }

  deletePerson() {
    this.props.personActions.removePerson(this.getId());
  }

  render() {
    return(
      <p className={'person-list__item'}>
        <button className={"person-list__button"} onClick={this.deletePerson}>Удалить</button>
        {this.getName()}
      </p>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Person);