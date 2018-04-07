import * as React from "react";
import Header from "../../containers/Header/Header"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as personsAction from '../../actions/PersonsActions'
import * as occupationAction from '../../actions/OccupationActions'
import {Helmet} from "react-helmet";
import moment from 'moment';



class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      lastName: '',
      id: '',
      birthday: '',
      occupation: '',
      validated: true
    }
  }

  /**
   * Загрузка информации о пользователе при загрузке
   */
  componentDidMount() {
    this.props.personActions.fetchPersonById(this.getId());
    this.props.occupationActions.fetchOccupations();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.name !== nextProps.person.personList.name) {
      this.setState({name: nextProps.person.personList.name});
    }

    if (this.state.lastName !== nextProps.person.personList.lastName) {
      this.setState({lastName: nextProps.person.personList.lastName});
    }

    if (this.state.id !== nextProps.person.personList._id) {
      this.setState({id: nextProps.person.personList._id});
    }

    if (this.state.occupation !== nextProps.person.personList.occupation) {
      this.setState({occupation: nextProps.person.personList.occupation});
    }

    if (this.state.birthday !== nextProps.person.personList.birthday) {
      this.setState({birthday: nextProps.person.personList.birthday});
    }
  }

  /**
   * Вставить в инпуты информацию
   */
  generateOccupations() {
    const occupations = this.props.occupations.occupationsList;
    const list = occupations.map((item, key) => <option key={key + 1}>{item.title}</option>);
    return <select className="select" onChange={this.change.bind(this)} value={this.state.occupation}>
      <option key={1}>Должность не указана</option>
      {list}
      </select>
  }

  change(e) {
    this.setState({occupation: e.target.value});
  }

  /**
   * Получение ID пользователя
   *
   * @returns {string}
   */
  getId() {
    let url = window.location.pathname;
    return url.substring(url.lastIndexOf('/') + 1);
  }

  onSaveClick() {
    //Введенное имя
    let name = this.state.name;
    let lastName = this.state.lastName;
    let occupation = this.state.occupation;
    let birthday = this.state.birthday;
    let result = {
      name,
      lastName,
      occupation,
      birthday
    };

    if (name.trim().length && lastName.trim().length) {
      this.props.personActions.editPerson(this.getId(), result);
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

  handleBirthdayChange(e) {
    this.setState({birthday: e.target.value});
  }
  handleOccupationChange(e) {
    this.setState({occupation: e.target.value});
  }

  render() {
    return (
      <div className="page">

        <Helmet>
          <meta charSet="utf-8"/>
          <title>Редактирование профиля - Tabula</title>
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
          <div className="profile__input-row">
            <label className="label">
              <span className="profile__label-name">Дата рождения:</span>
              <input
                className="input"
                type="date"
                value={moment(this.state.birthday).format("YYYY-MM-DD")}
                onChange={this.handleBirthdayChange.bind(this)}></input>
            </label>
          </div>
          <div className="profile__input-row">
            <label className="label">
              <span className="profile__label-name">Профессия:</span>
              {this.generateOccupations()}
            </label>
          </div>
          <div className="profile__options">
            <button className="button" onClick={this.onSaveClick.bind(this)}>Сохранить</button>
          </div>
          {
            this.state.validated ? <div className="error"></div> :
              <div className="error">Необходимо заполнить все обязательные поля(*)</div>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    person: state.persons,
    occupations: state.occupations
  }
}

function mapDispatchToProps(dispatch) {
  return {
    personActions: bindActionCreators(personsAction, dispatch),
    occupationActions: bindActionCreators(occupationAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);