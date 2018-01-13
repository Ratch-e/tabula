import * as types from '../constants'
import axios from 'axios';

/**
 * Добавление пользователя в список
 *
 * @param name
 * @returns {{type: string, payload: *}}
 */
export function addPerson(result) {
  return function action(dispatch) {
    dispatch({
      type: types.ADD_PERSON
    });
    const request = axios.post('/api/users', {
      name: result.name,
      lastName: result.lastName
    });

    return request.then(
      window.location.href = "/"
    );
  };

}

export function addPersonsSuccess(persons) {
  return {
    type: types.API_ADD_PERSON_SUCCESS,
    payload: persons
  };
}

/**
 * Удаление пользователя из списка
 *
 * @param name
 * @returns {{type: string, payload: *}}
 */
export function removePerson(id) {
  return function action(dispatch) {
    dispatch({
      type: types.REMOVE_PERSON,
      payload: id
    });

    const request = axios.delete(`/api/users/${id}`);

    return request.then(
      window.location.href = "/"
    );
  };
}

/**
 * Запрос списка пользователей
 *
 * @returns {action}
 */
export function fetchPersons() {
  return function action(dispatch) {
    dispatch({type: types.FETCH_PERSONS});

    const request = axios.get(`/api/users`);

    return request.then(
      response => dispatch(fetchPersonsSuccess(response.data)),
      err => dispatch(fetchPersonsFailure(err))
    );
  };
}

/**
 * Удачный запрос на список пользователей
 *
 * @param persons
 * @returns {{type, payload: *}}
 */
export function fetchPersonsSuccess(persons) {
  return {
    type: types.FETCH_PERSONS_SUCCESS,
    payload: persons
  };
}

/**
 * Ошибка запроса на список пользователей
 *
 * @param error
 * @returns {{type, payload: *}}
 */
export function fetchPersonsFailure(error) {
  return {
    type: types.FETCH_PERSONS_FAILURE,
    payload: error
  };
}


/**
 * Запрос пользователя по ID
 *
 * @returns {action}
 */
export function fetchPersonById(id) {
  return function action(dispatch) {
    dispatch({type: types.FETCH_PERSON_BY_ID});

    const request = axios.get(`/api/users/${id}`);
    return request.then(
      response => dispatch(fetchPersonByIdSuccess(response.data)),
      err => dispatch(fetchPersonByIdFailure(err))
    );
  };
}

/**
 * Удачный запрос на пользователя
 *
 * @param persons
 * @returns {{type, payload: *}}
 */
export function fetchPersonByIdSuccess(person) {
  return {
    type: types.FETCH_PERSON_BY_ID_SUCCESS,
    payload: person
  };
}

/**
 * Ошибка запроса на пользователя
 *
 * @param error
 * @returns {{type, payload: *}}
 */
export function fetchPersonByIdFailure(error) {
  return {
    type: types.FETCH_PERSON_BY_ID_FAILURE,
    payload: error
  };
}
