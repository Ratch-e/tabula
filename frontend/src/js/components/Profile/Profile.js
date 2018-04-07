import * as React from "react";
import {Helmet} from "react-helmet";
import Header from "../../containers/Header/Header"
import Modal from "../Common/Modal"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as personsAction from '../../actions/PersonsActions'
import Chart from 'chart.js';
import _ from 'lodash'
import moment from 'moment';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      lastName: "",
      id: "",
      occupation: "Должность не указана",
      birthday: 'Дата рождения не указана',
      passedTest: false,
      modalDelete: false
    };

    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
  }

  getId() {
    let url = window.location.pathname;
    return url.substring(url.lastIndexOf('/') + 1);
  }

  toggleDeleteModal() {
    this.setState({
      modalDelete: !this.state.modalDelete
    })
  }

  getTestLink() {
    let domain = window.location.hostname;
    return `${domain}/test/${this.getId()}`
  }

  getFullName() {
    return `${this.state.lastName} ${this.state.name}`;
  }

  getOccupation() {
    return this.state.occupation;
  }

  getBirthday() {
    return moment(this.state.birthday).format("DD.MM.YYYY");
  }

  componentDidMount() {
    this.props.personActions.fetchPersonById(this.getId());
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.name !== nextProps.profile.name) {
      this.setState({name: nextProps.profile.name});
    }
    if (this.state.lastName !== nextProps.profile.lastName) {
      this.setState({lastName: nextProps.profile.lastName});
    }
    if (this.state.occupation !== nextProps.profile.occupation) {
      this.setState({occupation: nextProps.profile.occupation});
    }
    if (this.state.birthday !== nextProps.profile.birthday) {
      this.setState({birthday: nextProps.profile.birthday});
    }
    if (this.state.id !== nextProps.profile._id) {
      this.setState({id: nextProps.profile._id});
    }
    if (nextProps.profile.params) {
      this.setState({passedTest: true});
      this.createChart(nextProps.profile.params, nextProps.profile.name, nextProps.profile.lastName);
    }
  }

  createChart(arr, name, lastName) {
    const labels = _.keys(arr);
    const data = _.values(arr);

    const ctx = this.refs.chart;
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: `${lastName} ${name}`,
          borderColor: '#377a00',
          pointBorderColor: '#377a00',
          pointRadius: 6,
          pointHoverRadius: 10,
          data: data,
          pointStyle: 'circle',
          pointBackgroundColor: '#fff',
          pointHoverBackgroundColor: '#fff'
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scale: {
          ticks: {
            beginAtZero: true,
            max: 3
          }
        }
      }
    })
  }

  render() {
    return (
      <div className="page">

        <Helmet>
          <meta charSet="utf-8" />
          <title>{this.getFullName()} - Tabula</title>
        </Helmet>

        <Header/>
        <div className="content">
          <div className="profile">
            <div className="profile__item">
              <canvas className="profile__chart" ref="chart" width="400" height="400"></canvas>
              <div className="profile__block">
                <div className="profile__name">{this.getFullName()}</div>
                <div className="profile__text">{this.getBirthday()}</div>
                <div className="profile__text">{this.getOccupation()}</div>
              </div>
            </div>
            <div className="profile__item">
              <div className="profile__link">{this.getTestLink()}</div>
            </div>
            <div className="profile__options">
              <div className="button button_warning" onClick={this.toggleDeleteModal.bind(this)}>Удалить анкету</div>
              <a className="button" href={`/edit/${this.getId()}`}>Редактировать анкету</a>
            </div>
          </div>
        </div>
        <Modal
          active={this.state.modalDelete}
          toggle={this.toggleDeleteModal}
          id={this.state.id}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.persons.personList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    personActions: bindActionCreators(personsAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);