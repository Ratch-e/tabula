import * as React from "react";
import Header from "../../containers/Header/Header"
import Modal from "../Common/Modal"
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
import * as personsAction from '../../actions/PersonsActions'

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      lastname: "",
      id: "",
      modalDelete: false
    };
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

  getFullName() {
      return `${this.state.lastname} ${this.state.name}`
  }

  componentDidMount() {
    this.props.personActions.fetchPersonById(this.getId());
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.name !== nextProps.profile.name) {
      this.setState({ name: nextProps.profile.name });
    }
    if(this.state.lastname !== nextProps.profile.lastname) {
      this.setState({ lastname: nextProps.profile.lastName });
    }
    if(this.state.id !== nextProps.profile._id) {
      this.setState({ id: nextProps.profile._id });
    }
  }

  render() {
    return (
        <div className="page">
            <Header/>
            <div className="content">
                <div className="profile">
                    <div className="profile__item">
                        <div className="profile__name">{this.getFullName()}</div>
                    </div>
                    <div className="profile__options">
                        <div className="button button_warning" onClick={this.toggleDeleteModal.bind(this)}>Удалить анкету</div>
                        <div className="button">Редактировать анкету</div>
                    </div>
                </div>
            </div>
            <Modal 
              active={this.state.modalDelete} 
              toggle={this.toggleDeleteModal.bind(this)}
              id={this.state.id}/>
        </div>
    );
  }
}

function mapStateToProps (state) {
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