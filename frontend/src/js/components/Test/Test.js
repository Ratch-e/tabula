import * as React from "react";
import Header from "../../containers/Header/Header";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as personsAction from "../../actions/PersonsActions";
import questions from "../../test";

class Test extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
      result: []
    };
  }

  getId() {
    let url = window.location.pathname;
    return url.substring(url.lastIndexOf("/") + 1);
  }

  componentDidMount() {
    this.props.personActions.fetchPersonById(this.getId());

    questions.map((question, num) => {
      let elem = {
        category: question.category,
        answer: ''
      }
      return this.setState(
        prevState => ({
          answers: [
            ...prevState.answers, 
            elem
          ]
        })
      )
    })
  }

  clickedAnswer(e) {
    const num = e.target.dataset.index;
    const value = e.target.value;
    let arr = [...this.state.answers]
    arr[num].answer = value;
    this.setState({ answers: arr })
  }

  renderQuestions(q) {
    const questions = q.map((question, num) => {
      return (
        <li className="test__item" key={num}>
          <p className="test__question">{question.question}</p>
          <div className="test__actions">
            <label className="test__answer">
              <input onClick={this.clickedAnswer.bind(this)} data-index={num} type="radio" name={`q${num}`} value={question.reverse ? 0 : 1}/>
              Да
            </label>
            <label className="test__answer">
              <input onClick={this.clickedAnswer.bind(this)} data-index={num}type="radio" name={`q${num}`} value={question.reverse ? 1 : 0} />
              Нет
            </label>
          </div>
        </li>
      );
    });

    return questions;
  }

  render() {
    return (
      <div className="page">
        <Header />
        <div className="content">
          <ol className="test">
            {this.renderQuestions(questions)}
            <button className="button test__submit">Закончить тест</button>
          </ol>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.persons.personList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    personActions: bindActionCreators(personsAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
