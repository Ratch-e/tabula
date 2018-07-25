import * as React from "react";
import Header from "../../containers/Header/Header"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as occupationActions from '../../actions/OccupationActions'
import {Helmet} from "react-helmet";


class OccupationCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    }
  }

  /**
   * Загрузка должностей при загрузке
   */
  componentDidMount() {
    this.props.occupationActions.fetchOccupations();
  }

  generateOccupations() {
    const occupations = this.props.occupations.occupationsList;
    const list = occupations.map((item, key) => <li className="list__item" key={key}><button className="button button_small" onClick={() => this.onRemoveClick(item._id)}>удалить</button>{item.title}</li>);
    return <ul className="list">{list}</ul>
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  onSaveClick() {
    this.props.occupationActions.addOccupation(this.state.title);
    this.setState({title: ''});
  }

  onRemoveClick(id) {
    this.props.occupationActions.deleteOccupation(id);
  }

  render() {
    return (
      <div className="page">

        <Helmet>
          <meta charSet="utf-8" />
          <title>Должности - Tabula</title>
        </Helmet>

        <Header/>
        <div className="content profile">
          <div className="profile__input-row">
            <label className="label">
              <span className="profile__label-name">Новая должность:</span>
              <input
                className="input"
                type="text"
                value={this.state.title}
                onChange={this.handleTitleChange.bind(this)}></input>
            </label>

            <button className="button" onClick={this.onSaveClick.bind(this)}>Сохранить</button>
          </div>
          <div>
            {this.generateOccupations()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    occupations: state.occupations
  }
}

function mapDispatchToProps(dispatch) {
  return {
    occupationActions: bindActionCreators(occupationActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OccupationCreate);