/**
 * Добавлятель нового юзера
 *
 * @class PersonAdder
 * @extends {React.Component}
 */

import * as React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as personsAction from '../../actions/PersonsActions'

class PersonAdder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ''
    }
  }

  onAddClick() {
    //Введенное имя
    let name = this.state.input;

    //Если не пробел и не пустое - сохранить в стор
    if (name.trim().length) {
      this.props.personActions.addPerson(name);
      this.setState({input: ""});
    }
  }

  handleChange(e) {
    this.setState({input: e.target.value});
  }

  render() {
    return (
      <div className="person-adder">
        <input
          className="person-adder__input"
          type="text"
          value={this.state.input}
          onChange={this.handleChange.bind(this)}
        />
        <button className="person-adder__button" onClick={this.onAddClick.bind(this)}>Добавить</button>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonAdder);