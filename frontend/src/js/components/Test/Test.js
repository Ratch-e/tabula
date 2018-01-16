import * as React from "react";
import * as classnames from "classnames"
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
      error: false
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
    let arr = [...this.state.answers];
    arr[num].answer = value;
    this.setState({ answers: arr, error: false });
  }

  generateResult() {
    const arr = [...this.state.answers];
    let result = {};
    arr.map((item) => {
      if(item.answer === "") {
        return this.setState({error: true})
      } else {
        if(result.hasOwnProperty(item.category)) {
          return result[item.category] = +item.answer + result[item.category];
        } else {
          return result[item.category] = +item.answer;
        }
      }
    })
    if(!this.state.error) {
      this.props.personActions.passTest(this.getId(), result);
    }
  }

  renderQuestions(q) {
    const questions = q.map((question, num) => {
      return (
        <li className="test__item" key={num}>
          <p className="test__question">{question.question}</p>
          <div className="test__actions">
            <label className="test__answer">
              <input 
                onClick={this.clickedAnswer.bind(this)} 
                data-index={num} 
                type="radio" 
                name={`q${num}`} 
                value={question.reverse ? 0 : 1}
              />
              Да
            </label>
            <label className="test__answer">
              <input 
                onClick={this.clickedAnswer.bind(this)} 
                data-index={num}
                type="radio" 
                name={`q${num}`} 
                value={question.reverse ? 1 : 0} 
              />
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
            <button 
              className="button test__submit" 
              onClick={this.generateResult.bind(this)}
            >Закончить тест</button>
          </ol>
          <p className={classnames('error',{'error_hidden': !this.state.error})}>Вы ответили не на все вопросы!</p>
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
