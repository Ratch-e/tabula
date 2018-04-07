/**
 * @type {{personList: Array}} - Должности
 */
import * as types from '../constants'

const initialState = {
  occupationsList: [],
  error: null,
  loading: false,
};

export default function occupations(state = initialState, action) {

  switch (action.type) {

    /**
     * Добавление должности
     */
    case types.ADD_OCCUPATION:
      return {
        ...state,
        loading: true
      };

    case types.ADD_OCCUPATION_SUCCESS:
      return {
        ...state,
        occupationsList: [...state.occupationsList, action.payload],
        loading: false,
      };

    /**
     * Запрос списка должностей
     */
    case types.FETCH_OCCUPATIONS:
      return {
        ...state,
        loading: true,
        error: null,
      };

    /**
     * Удачный запрос списка должностей
     */
    case types.FETCH_OCCUPATIONS_SUCCESS:
      return {
        ...state,
        occupationsList: action.payload,
        loading: false,
      };

    default:
      return state;
  }

}