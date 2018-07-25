import * as React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../containers/Header/Header';
import Modal from '../Common/Modal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as personsAction from '../../actions/PersonsActions';
import Chart from 'chart.js';
import _ from 'lodash';
import moment from 'moment';
import categories from '../../testCategories';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      lastName: '',
      id: '',
      occupation: 'Должность не указана',
      birthday: 'Дата рождения не указана',
      passedTest: false,
      modalDelete: false,
    };

    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
  }

  getId() {
    let url = window.location.pathname;
    return url.substring(url.lastIndexOf('/') + 1);
  }

  toggleDeleteModal() {
    this.setState({
      modalDelete: !this.state.modalDelete,
    });
  }

  getTestLink() {
    let domain = window.location.hostname;
    return `${domain}/test/${this.getId()}`;
  }

  getFullName() {
    return `${this.state.lastName} ${this.state.name}`;
  }

  getOccupation() {
    return this.state.occupation;
  }

  getBirthday() {
    return moment(this.state.birthday).format('DD.MM.YYYY');
  }

  componentDidMount() {
    this.props.personActions.fetchPersonById(this.getId());
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.name !== nextProps.profile.name) {
      this.setState({ name: nextProps.profile.name });
    }
    if (this.state.lastName !== nextProps.profile.lastName) {
      this.setState({ lastName: nextProps.profile.lastName });
    }
    if (this.state.occupation !== nextProps.profile.occupation) {
      this.setState({ occupation: nextProps.profile.occupation });
    }
    if (this.state.birthday !== nextProps.profile.birthday) {
      this.setState({ birthday: nextProps.profile.birthday });
    }
    if (this.state.id !== nextProps.profile._id) {
      this.setState({ id: nextProps.profile._id });
    }
    if (nextProps.profile.params) {
      this.setState({ passedTest: true });
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
        datasets: [
          {
            label: `${lastName} ${name}`,
            borderColor: '#377a00',
            pointBorderColor: '#377a00',
            pointRadius: 6,
            pointHoverRadius: 10,
            data: data,
            pointStyle: 'circle',
            pointBackgroundColor: '#fff',
            pointHoverBackgroundColor: '#fff',
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scale: {
          ticks: {
            beginAtZero: true,
            max: 9,
          },
        },
      },
    });
  }

  analyzeResylts(results) {
    let grades = {};

    let stages = {
      low: 'low',
      medium: 'medium',
      high: 'high',
    };

    for (let key in results) {
      if (results[key] <= 3) {
        grades[key] = stages.low;
      } else if (results[key] > 3 && results[key] < 7) {
        grades[key] = stages.medium;
      } else {
        grades[key] = stages.high;
      }
    }

    let analyze = [];

    if (grades[categories.neurotic] === stages.low) {
      analyze.push(
        <p className="recommendations__text">
          Спокойствие, непринужденность, эмоциональная зрелость, объективность в оценке себя и других людей, постоянство
          в планах и привязанностях. Не скрывает от себя собственных недостатков и промахов, не расстраивается из-за
          пустяков, чувствует себя хорошо приспособленными, охотно подчиняются групповым нормам.
        </p>,
      );
    } else if (grades[categories.neurotic] === stages.medium) {
      analyze.push(<p className="recommendations__text">Вполне уравновешанная нервная система.</p>);
    } else {
      analyze.push(
        <p className="recommendations__text">
          Высокая тревожность, возбудимость, чувствительность. Обычно те функции, которые отмечаются повышенной
          возбудимостью, характеризуются повышенной истощаемостью и утомляемостью. Поэтому повышенная возбудимость
          сочетается с повышенной истощаемостью, что проявляется в быстром угасании вспышек возбуждения.
        </p>,
      );
    }

    if (grades[categories.aggro] === stages.low) {
      analyze.push(
        <p className="recommendations__text">
          Повышенная идентификация с социальными требованиями, конформность, уступчивость, сдержанность, осторожность
          поведения, возможно, сужение круга интересов и ослаблении влечений. Такому человеку все может представляться
          скучным и неинтересным, им все безразлично и надоело. Они не видят ничего притягательного в событиях,
          увлекающих окружающих, собственных увлечений тоже не имеют. Перемен не любят, к новому относятся осторожно, с
          предубеждением, больше ценят обязательность, чем одаренность.
        </p>,
      );
    } else if (grades[categories.aggro] === stages.high) {
      analyze.push(
        <p className="recommendations__text">
          Импульсивность. Сильно выражено влечение к острым аффективным переживаниям, при отсутствии которых преобладает
          чувство скуки. Потребность в стимуляции и возбуждающих ситуациях. Стремление удовлетворить свои желания сразу
          же в непосредственном поведении, серьезно не задумываясь о последствиях своих поступков, действует импульсивно
          и непродуманно. Разговорчив, охотно участвует в коллективных мероприятиях, живо откликается на любые
          происходящие события (сообщения, зрелища, происшествия и т.д.), находят новизну, интерес даже в повседневных
          мелких делах.{' '}
        </p>,
      );
    } else {
      analyze.push(<p className="recommendations__text">Средний уровень импульсивности</p>);
    }

    if (grades[categories.depression] === stages.low) {
      analyze.push(
        <p className="recommendations__text">
          Жизнерадостность, энергичность и предприимчивость. Богатство, гибкость и многосторонность психики,
          непринужденностьюв межличностных отношениях, уверенность в своих силах, успешность в выполнении различных
          видов деятельности, требующих активности, энтузиазма и решительности. Однако отсутствие скованности и
          недостаток контроля над своими импульсами могут привести к невыполнению обещаний, непоследовательности,
          беспечности.
        </p>,
      );
    } else if (grades[categories.depression] === stages.high) {
      analyze.push(
        <p className="recommendations__text">
          Переживателен, человека могут считать заносчивым, недоступным, избегающим общения из-за чрезмерного
          самомнения. Однако за внешним фасадом отчужденности и мрачности скрывается чуткость, душевная отзывчивость,
          постоянная готовность к самопожертвованию. Старательность, добросовестность, обязательность в сочетании с
          конформностью и нерешительностью, неспособностью принять решение без колебаний и неуверенности. Быстрое
          утомление.
        </p>,
      );
    } else {
      analyze.push(<p className="recommendations__text">Средний уровень переживательности</p>);
    }

    if (grades[categories.temper] === stages.low) {
      analyze.push(
        <p className="recommendations__text">
          Чувство ответственности, добросовестность, стойкость моральных принципов. В своем поведении руководствуется
          чувством долга, строго соблюдает этические стандарты, всегда стремится к выполнению социальных требований. С
          уважением относится к моральным нормам, точен и аккуратен в делах, во всем любит порядок, уважает законы, на
          нечестные поступки не идет, даже если это не грозит никакими последствиями. Высокая добросовестность обычно
          сочетается с высоким контролем и стремлением к утверждению общечеловеческих ценностей. Успешно обучается.
          Аккуратностен, обязателен и добросовестен.
        </p>,
      );
    } else if (grades[categories.temper] === stages.high) {
      analyze.push(
        <p className="recommendations__text">
          Раздражителен, непостояннен, легко теряется, впадает в отчаяние. Остро переживая свой неуспех, может наряду с
          самообвинительными реакциями демонстрировать враждебность по отношению к окружающим лицам. Конфликтное
          поведение как правило является наиболее часто избираемой формой защиты от травмирующих личность переживаний.
          Черты демонстративности могут сочетаться со стремлением к уходу из круга широких социальных контактов.
        </p>,
      );
    } else {
      analyze.push(<p className="recommendations__text">Средний уровень раздражительности.</p>);
    }

    if (grades[categories.social] === stages.low) {
      analyze.push(
        <p className="recommendations__text">
          Холодность, формальность по отношению к межличностным отношениям. Избегает близости, жизнью своих товарищей не
          интересуются, поддерживают лишь внешние формы товарищеских отношений, их знакомства поверхностны и формальны.
          Общество людей не привлекает, любит одиночество, контактами, общением тяготится, предпочитает «общаться» с
          книгами и вещами. По собственной инициативе не общаются ни с кем, кроме ближайших родственников.
        </p>,
      );
    } else if (grades[categories.social] === stages.high) {
      analyze.push(
        <p className="recommendations__text">
          Выраженная потребность в общении. Готовность к сотрудничеству, чуткое, внимательное отношение к людям, доброта
          и мягкосердечие. К таким людям тянутся, в их обществе все чувствуют себя уютно и спокойно. Сами они лучше себя
          чувствуют на людях, в одиночестве скучают, ищут общества, охотно принимают участие во всех групповых
          мероприятиях, любят работать и отдыхать в коллективе.
        </p>,
      );
    } else {
      analyze.push(<p className="recommendations__text">Умеренный уровень общительности</p>);
    }

    if (grades[categories.stability] === stages.low) {
      analyze.push(
        <p className="recommendations__text">
          Дезадаптации, тревожность, потерю контроля над влечениями, выраженную дезорганизацию поведения. Преобладают
          жалобы на бессонницу, хроническую усталость и изнуренность, собственную неполноценность и неприспособленность,
          беспомощность, упадок сил, невозможность сосредоточиться, разобраться в собственных переживаниях, чувство
          невыносимого одиночества и многое другое. Такие люди характеризуются окружающими как напряженные, нервные,
          конфликтные, упрямые, отгороженные, эгоистичные и неупорядоченные в поведении. Недостаток конформности и
          дисциплины является наиболее частой внешней характеристикой их поведения. Более детальная индивидуальная
          характеристика лиц с высоким уровнем неупорядоченности поведения может быть получена из оценок по шкалам
          нижнего уровня, формирующим данный фактор.
        </p>,
      );
    } else if (grades[categories.stability] === stages.high) {
      analyze.push(
        <p className="recommendations__text">
          Хорошая защищенность к воздействию стресс-факторов обычных жизненных ситуаций, базирующейся на уверенности в
          себе, оптимистичности и активности. Отсутствие внутренней напряженности, свободе от конфликтов,
          удовлетворенности собой и своими успехами, готовности следовать нормам и требованиям.
        </p>,
      );
    } else {
      analyze.push(<p className="recommendations__text">Личность вполне уравновешена</p>);
    }

    if (grades[categories.crazy] === stages.low) {
      analyze.push(
        <p className="recommendations__text">
          Повышенная идентификация с социальными нормами, конформность, уступчивость, скромность, зависимость, возможно,
          узость круга интересов. В деятельности не хватает напористости и упорства, особенно в достижении сугубо личных
          целей. Покорен, уступчив, чрезмерно легко соглашается с властью и авторитетом, всегда готов выслушать и
          принять совет от более старшего или опытного лица, собственная активность деятельности у них недостаточная.
        </p>,
      );
    } else if (grades[categories.crazy] === stages.high) {
      analyze.push(
        <p className="recommendations__text">
          Высоким уровне психопатизации, характеризующийся агрессивным отношением к социальному окружению и выраженным
          стремлением к доминированию. Свидетельство моральной неполноценности, отсутствия высших социальных чувств.
          Чувство гордости, долга, любви, стыда и т. п. для таких людей – пустые слова. Они равнодушны к похвале и
          наказаниям, пренебрегают обязанностями, не считаются с правилами общежития и морально-этическими нормами.
          Критику и замечания в свой адрес воспринимают как посягательство на личную свободу. Испытывают враждебные
          чувства по отношению к тем лицам, которые хоть в какой-то мере пытаются управлять их поведением, заставляют их
          держаться в социально допустимых рамках.
        </p>,
      );
    }

    if (grades[categories.shy] === stages.low) {
      analyze.push(
        <p className="recommendations__text">
          Смелы, решительны, склонны к риску, не теряется при столкновении с незнакомыми вещами и обстоятельствами.
          Решения принимает быстро и незамедлительно приступают к их осуществлению, не умеют терпеливо ждать, не
          переносит оттяжек и колебаний, двойственности и амбивалентности. В коллективе держется свободно, независимо,
          даже несколько нагловато, позволяет себе вольности, любят во все вмешиваться, быть всегда на виду.
        </p>,
      );
    } else if (grades[categories.shy] === stages.high) {
      analyze.push(
        <p className="recommendations__text">
          Наличие тревожности, скованности, неуверенности, следствием чего являются трудности в социальных контактах.
          Нерешительность и неуверенность в себе. Избегает рискованных ситуаций, неожиданные события встречает с
          беспокойством, от любых перемен ждет только неприятностей. При необходимости принять решение либо чрезмерно
          колеблется, либо подолгу оттягивает и не приступают к его выполнению. Фаза борьбы мотивов и колебаний затянута
          до невозможности перейти к решению. В общении застенчив, скованн, стеснительн, старается не выделяться,
          находиться в тени и ни во что не вмешиваться.
        </p>,
      );
    }

    if (grades[categories.open] === stages.high) {
      analyze.push(
        <p className="recommendations__text">
          Стремление к доверительно-откровенному взаимодействию с окружающими людьми при высоком уровне самокритичности.
        </p>,
      );
    }

    return analyze;
  }

  render() {
    return (
      <div className="page">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{this.getFullName()} - Tabula</title>
        </Helmet>

        <Header />
        <div className="content">
          <div className="profile">
            <div className="profile__item">
              <canvas className="profile__chart" ref="chart" width="650" height="550" />
              <div className="profile__block">
                <div className="profile__name">{this.getFullName()}</div>
                <div className="profile__text">Дата рождения: {this.getBirthday()}</div>
                <div className="profile__text">{this.getOccupation()}</div>
              </div>
            </div>

            <div className="profile__item">
              <div className="profile__link">
                Ссылка на тест: <code>{this.getTestLink()}</code>
              </div>
            </div>

            <div className="recommendations">
              <h2 className="recommendations__title">Анализ:</h2>
              {this.analyzeResylts(this.props.profile.params)}
            </div>

            <div className="profile__options">
              <div className="button button_warning" onClick={this.toggleDeleteModal.bind(this)}>
                Удалить анкету
              </div>
              <a className="button" href={`/edit/${this.getId()}`}>
                Редактировать анкету
              </a>
            </div>
          </div>
        </div>
        <Modal active={this.state.modalDelete} toggle={this.toggleDeleteModal} id={this.state.id} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.persons.personList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    personActions: bindActionCreators(personsAction, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
