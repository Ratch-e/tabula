import React from 'react';
import { shallow } from 'enzyme';
import AddPersonButton from './AddPersonButton';

describe('Кнопка добавления пользователя', () => {
  it('рендерится корректно', () => {
    const component = shallow(<AddPersonButton />);
    expect(component.length).toMatchSnapshot();
  });

  it('переходит на нужную страницу', () => {
    const component = shallow(<AddPersonButton />);
    expect(component.find('.button').prop('href')).toBe('/new_profile');
  });
});
