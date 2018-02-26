import * as React from "react";
import Header from "../../containers/Header/Header"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as personsAction from '../../actions/PersonsActions'
import {Helmet} from "react-helmet";


class ProfileCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      lastName: '',
      validated: true
    }
  }

  onSaveClick() {
    //Введенное имя
    let name = this.state.name;
    let lastName = this.state.lastName;
    let result = {
      name: name,
      lastName: lastName
    };

    //Если не пробел и не пустое - сохранить в стор
    if (name.trim().length && lastName.trim().length) {
      this.props.personActions.addPerson(result);
    } else {
      this.setState({validated: false});
    }
  }

  handleNameChange(e) {
    this.setState({validated: true});
    this.setState({name: e.target.value});
  }

  handleLastNameChange(e) {
    this.setState({validated: true});
    this.setState({lastName: e.target.value});
  }

  render() {
    return (
      <div className="page">

        <Helmet>
          <meta charSet="utf-8" />
          <title>Новый профиль - Tabula</title>
        </Helmet>

        <Header/>
        <div className="content profile">
          <div className="profile__input-row">
            <label className="label">
              <span className="profile__label-name">*Фамилия:</span>
              <input 
              className="input"
              type="text"
              value={this.state.lastName}
              onChange={this.handleLastNameChange.bind(this)}></input>
            </label>
          </div>
          <div className="profile__input-row">
            <label className="label">
              <span className="profile__label-name">*Имя:</span>
              <input 
                className="input"
                type="text"
                value={this.state.name}
                onChange={this.handleNameChange.bind(this)}></input>
            </label>
          </div>
          <div className="profile__options">
            <button className="button" onClick={this.onSaveClick.bind(this)}>Сохранить</button>
          </div>
          {
            this.state.validated ? <div className="error"></div> : <div className="error">Необходимо заполнить все обязательные поля(*)</div>
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCreate);