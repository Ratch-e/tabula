/**
 * Кнопка создания нового пользователя
 */
import * as React from "react";

class AddPersonButton extends React.Component {
  render() {
    return (
        <a className="button" href="/new_profile">Добавить анкету</a>
    );
  }
}

export default AddPersonButton;