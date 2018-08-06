import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Modal from './Modal';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Модальное окно', () => {
  it('рендерится корректно', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const component = shallow(
      <Provider store={store}>
        <Modal />
      </Provider>,
    )
      .dive({ context: { store } })
      .dive();
  
    expect(component.length).toMatchSnapshot();
  });
});
