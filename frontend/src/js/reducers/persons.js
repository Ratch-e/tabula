/**
 * @type {{personList: Array}} - Пользователи
 */
import * as types from '../constants'

const initialState = {
  personList: [],
  error: null,
  loading: false,
};

export default function persons(state = initialState, action) {

  switch (action.type) {

    /**
     * Добавление пользователя
     */
    case types.ADD_PERSON:
      return {
        ...state,
        loading: true
      };

    case types.API_ADD_PERSON_SUCCESS:
      return {
        ...state,
        personList: [...state.personList, action.payload],
        loading: false,
      };

    /**
     * Удаление пользователя
     */
    case types.REMOVE_PERSON:
      return {
        ...state,
        personList: state.personList.filter(item => item._id !== action.payload),
      };

    /**
     * Запрос списка пользователей по апи
     */
    case types.FETCH_PERSONS:
      return {
        ...state,
        loading: true,
        error: null,
      };

    /**
     * Удачный запрос пользователей по апи
     */
    case types.FETCH_PERSONS_SUCCESS:
      return {
        ...state,
        personList: action.payload,
        loading: false,
      };

    default:
      return state;
  }

}