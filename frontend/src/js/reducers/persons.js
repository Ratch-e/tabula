/**
 * @type {{personList: Array}} - Пользователи
 */
import * as types from '../constants';

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
        loading: true,
      };

    case types.API_ADD_PERSON_SUCCESS:
      return {
        ...state,
        personList: [...state.personList, action.payload],
        loading: false,
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

    /**
     * Запрос профиля пользователя по апи
     */
    case types.FETCH_PERSON_BY_ID:
      return {
        ...state,
        loading: true,
        error: null,
      };

    /**
     * Удачный запрос профиля пользователя по апи
     */
    case types.FETCH_PERSON_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        personList: action.payload,
      };

    /**
     * Установка флага что тест пройден
     */
    case types.API_PASSED_TEST:
      return {
        ...state,
        testDone: true,
      };

    default:
      return state;
  }
}
