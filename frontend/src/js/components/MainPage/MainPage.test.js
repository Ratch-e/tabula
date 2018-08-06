import React from 'react';
import { shallow } from 'enzyme';
import MainPage from './MainPage';

describe('Главная страница', () => {
  it('рендерится корректно', () => {
    const component = shallow(<MainPage />);
    expect(component.length).toMatchSnapshot();
  });
});
