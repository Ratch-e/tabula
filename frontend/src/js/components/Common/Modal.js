import * as React from "react";
import * as classnames from "classnames"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as personsAction from '../../actions/PersonsActions'

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.deletePerson = this.deletePerson.bind(this);
  }

  deletePerson() {
    this.props.personActions.removePerson(this.getId());
  }

  getId() {
    return this.props.id;
  }

  render() {
    return (
      <div className={classnames('modal',{'modal_hidden': !this.props.active})}>
        <div className="modal__overlay" onClick={this.props.toggle}></div>
        <div className="modal__content">
          <div className="modal__close" onClick={this.props.toggle}>X</div>
          <div className="modal__text">Вы уверены что хотите удалить эту анкету? Это действие необратимо!</div>
          <div className="modal__options">
            <div className="button" onClick={this.props.toggle}>Отмена</div>
            <div className="button button_warning" onClick={this.deletePerson}>Удалить</div>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Modal);