import * as React from "react";

class PersonsListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      lastname: props.lastName,
      id: props.id
    };
  }

  getFullname() {
    return `${this.state.lastname} ${this.state.name}`
  }

  render() {
    return (
      <div className="person-list__item">
        <a className="person-list__link" href={`/profile/${this.state.id}`}>       {this.getFullname()}
        </a>
      </div>
    );
  }
}

export default PersonsListItem;