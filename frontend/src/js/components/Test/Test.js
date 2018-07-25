import * as React from "react";
import * as classnames from "classnames"
import Header from "../../containers/Header/Header";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as personsAction from "../../actions/PersonsActions";
import questions from "../../test-questions";
import categories from "../../testCategories";
import {Helmet} from "react-helmet";

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
    //получаем id пользователя, проходящего тест
    this.props.personActions.fetchPersonById(this.getId());

    questions.map((question) => {
      let elem = {
        category: question.category,
        answer: ''
      };
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
    this.setState({answers: arr, error: false});
  }

  generateResult() {
    const arr = [...this.state.answers];
    let result = {};
    arr.map((item) => {
      if (item.answer === "") {
        return this.setState({error: true})
      } else {
        if(item.category !== '') {
          if (result.hasOwnProperty(item.category)) {
            return result[item.category] = +item.answer + result[item.category];
          } else {
            return result[item.category] = +item.answer;
          }
        }
      }
    });

    let finalResult = this.prettifyResults(result);

    if (!this.state.error) {
      this.props.personActions.passTest(this.getId(), finalResult);
    }

  }

  prettifyResults(result) {

    let finalResult = {};

    if(result[categories.neurotic] <= 1) {
      finalResult[categories.neurotic] = 1;
    } else if (result[categories.neurotic] >= 2 && result[categories.neurotic] <= 3) {
      finalResult[categories.neurotic] = 4;
    } else if (result[categories.neurotic] >= 4 && result[categories.neurotic] <= 5) {
      finalResult[categories.neurotic] = 5;
    } else if (result[categories.neurotic] == 6) {
      finalResult[categories.neurotic] = 6;
    } else if (result[categories.neurotic] >= 7 && result[categories.neurotic] <= 8) {
      finalResult[categories.neurotic] = 7;
    } else if (result[categories.neurotic] >= 9 && result[categories.neurotic] <= 12) {
      finalResult[categories.neurotic] = 8;
    } else {
      finalResult[categories.neurotic] = 9;
    }

    if(result[categories.aggro] <= 1) {
      finalResult[categories.aggro] = 1;
    } else if (result[categories.aggro] == 2) {
      finalResult[categories.aggro] = 3;
    } else if (result[categories.aggro] == 5) {
      finalResult[categories.aggro] = 4;
    } else if (result[categories.aggro] >= 4 && result[categories.aggro] <= 5) {
      finalResult[categories.aggro] = 5;
    } else if (result[categories.aggro] == 6) {
      finalResult[categories.aggro] = 7;
    } else if (result[categories.aggro] >= 7 && result[categories.aggro] <= 9) {
      finalResult[categories.aggro] = 8;
    } else {
      finalResult[categories.aggro] = 9;
    }

    if(result[categories.depression] < 1) {
      finalResult[categories.depression] = 1;
    } else if (result[categories.depression] == 1) {
      finalResult[categories.depression] = 3;
    } else if (result[categories.depression] >= 2 && result[categories.depression] <= 3) {
      finalResult[categories.depression] = 4;
    } else if (result[categories.depression] == 4) {
      finalResult[categories.depression] = 5;
    } else if (result[categories.depression] >= 5 && result[categories.depression] <= 6) {
      finalResult[categories.depression] = 6;
    } else if (result[categories.depression] >= 7 && result[categories.depression] <= 8) {
      finalResult[categories.depression] = 7;
    } else if (result[categories.depression] >= 9 && result[categories.depression] <= 11) {
      finalResult[categories.depression] = 8;
    } else {
      finalResult[categories.depression] = 9;
    }

    if(result[categories.temper] < 1) {
      finalResult[categories.temper] = 1;
    } else if (result[categories.temper] == 1) {
      finalResult[categories.temper] = 3;
    } else if (result[categories.temper] == 2) {
      finalResult[categories.temper] = 4;
    } else if (result[categories.temper] == 3) {
      finalResult[categories.temper] = 5;
    } else if (result[categories.temper] == 4) {
      finalResult[categories.temper] = 6;
    } else if (result[categories.temper] >= 5 && result[categories.temper] <= 6) {
      finalResult[categories.temper] = 7;
    } else if (result[categories.temper] >= 7 && result[categories.temper] <= 8) {
      finalResult[categories.temper] = 8;
    } else {
      finalResult[categories.temper] = 9;
    }

    if(result[categories.social] <= 3) {
      finalResult[categories.social] = 1;
    } else if (result[categories.social] >= 4 && result[categories.social] <= 5) {
      finalResult[categories.social] = 2;
    } else if (result[categories.social] == 6) {
      finalResult[categories.social] = 3;
    } else if (result[categories.social] >= 7 && result[categories.social] <= 8) {
      finalResult[categories.social] = 4;
    } else if (result[categories.social] >= 9 && result[categories.social] <= 10) {
      finalResult[categories.social] = 6;
    } else if (result[categories.social] == 11) {
      finalResult[categories.social] = 6;
    } else if (result[categories.social] == 12) {
      finalResult[categories.social] = 7;
    } else if (result[categories.social] == 13) {
      finalResult[categories.social] = 8;
    } else {
      finalResult[categories.social] = 9;
    }

    if(result[categories.stability] <= 1) {
      finalResult[categories.stability] = 1;
    } else if (result[categories.stability] == 2) {
      finalResult[categories.stability] = 2;
    } else if (result[categories.stability] == 3) {
      finalResult[categories.stability] = 3;
    } else if (result[categories.stability] == 4) {
      finalResult[categories.stability] = 4;
    } else if (result[categories.stability] == 5) {
      finalResult[categories.stability] = 5;
    } else if (result[categories.stability] == 6) {
      finalResult[categories.stability] = 6;
    } else if (result[categories.stability] >= 7 && result[categories.stability] <= 8) {
      finalResult[categories.stability] = 8;
    } else {
      finalResult[categories.stability] = 9;
    }

    if(result[categories.crazy] < 1) {
      finalResult[categories.crazy] = 1;
    } else if (result[categories.crazy] == 1) {
      finalResult[categories.crazy] = 3;
    } else if (result[categories.crazy] == 2) {
      finalResult[categories.crazy] = 4;
    } else if (result[categories.crazy] == 3) {
      finalResult[categories.crazy] = 5;
    } else if (result[categories.crazy] == 4) {
      finalResult[categories.crazy] = 6;
    } else if (result[categories.crazy] == 5) {
      finalResult[categories.crazy] = 7;
    } else if (result[categories.crazy] == 6) {
      finalResult[categories.crazy] = 8;
    } else {
      finalResult[categories.crazy] = 9;
    }

    if(result[categories.shy] < 1) {
      finalResult[categories.shy] = 1;
    } else if (result[categories.shy] == 1) {
      finalResult[categories.shy] = 3;
    } else if (result[categories.shy] == 2) {
      finalResult[categories.shy] = 5;
    } else if (result[categories.shy] >= 3 && result[categories.shy] <= 4) {
      finalResult[categories.shy] = 6;
    } else if (result[categories.shy] >= 5 && result[categories.shy] <= 6) {
      finalResult[categories.shy] = 7;
    } else {
      finalResult[categories.shy] = 9;
    }

    if(result[categories.open] <= 2) {
      finalResult[categories.open] = 1;
    } else if (result[categories.open] == 3) {
      finalResult[categories.open] = 2;
    } else if (result[categories.open] >= 4 && result[categories.open] <= 5) {
      finalResult[categories.open] = 3;
    } else if (result[categories.open] == 6) {
      finalResult[categories.open] = 4;
    } else if (result[categories.open] >= 7 && result[categories.open] <= 8) {
      finalResult[categories.open] = 5;
    } else if (result[categories.open] == 9) {
      finalResult[categories.open] = 6;
    } else if (result[categories.open] >= 10 && result[categories.open] <= 11) {
      finalResult[categories.open] = 8;
    } else {
      finalResult[categories.open] = 9;
    }

    return finalResult;

  }

  renderQuestions(q) {
    return q.map((question, num) => {
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
  }

  render() {
    return (
      <div className="page">

        <Helmet>
          <meta charSet="utf-8"/>
          <title>Тестирование - Tabula</title>
        </Helmet>

        <Header/>
        <div className="content">
          <ol className="test">
            {this.renderQuestions(questions)}
            <button
              className="button test__submit"
              onClick={this.generateResult.bind(this)}
            >Закончить тест
            </button>
          </ol>
          <p className={classnames('error', {'error_hidden': !this.state.error})}>Вы ответили не на все вопросы!</p>
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
