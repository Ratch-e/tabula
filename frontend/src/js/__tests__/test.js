import React from 'react';
import Header from '../containers/Header/Header.js';
import renderer from 'react-test-renderer';

describe('Шапка', () => {

  it('Рендерится корректно', () => {
    const tree = renderer.create(<Header/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

});
