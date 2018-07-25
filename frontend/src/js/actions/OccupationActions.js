import * as types from '../constants'
import axios from 'axios';

/**
 * Добавление должности
 *
 * @param result
 * @returns {{type: string, payload: *}}
 */
export function addOccupation(result) {
  return function action(dispatch) {
    dispatch({type: types.FETCH_PERSONS});
    const request = axios.post('/api/occupation', {
      title: result,
    });

    return request.then(
      response => dispatch(addOccupationSuccess(response.data)),
      err => dispatch(addOccupationFailure(err))
    );

  };
}

export function addOccupationSuccess(item) {
  return {
    type: types.ADD_OCCUPATION_SUCCESS,
    payload: item
  };
}

export function addOccupationFailure () {

}

/**
 * Запрос всех должностей
 *
 * @returns {action}
 */
export function fetchOccupations() {
  return function action(dispatch) {
    dispatch({type: types.FETCH_OCCUPATIONS});

    const request = axios.get(`/api/occupation`);

    return request.then(
      response => dispatch(fetchOccupationsSuccess(response.data)),
      err => console.log(err)
    );
  };
}

export function fetchOccupationsSuccess(occupations) {
  return {
    type: types.FETCH_OCCUPATIONS_SUCCESS,
    payload: occupations
  };
}

export function deleteOccupation(id) {
  return function action(dispatch) {
    dispatch({
      type: types.DELETE_OCCUPATION,
      payload: id
    });

    const request = axios.delete(`/api/occupation/${id}`);

    return request.then(
      response => dispatch(deleteOccupationSuccess(id)),
      err => console.log(err)
    );

  };
}

export function deleteOccupationSuccess(id) {
  return {
    type: types.DELETE_OCCUPATION_SUCCESS,
    payload: id
  };
}


