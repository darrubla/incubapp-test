import React from 'react'
import { render } from '@testing-library/react'

import Button from '../index'

describe('<Button />', () => {
  it('Should render properly', () => {
    const props = {
      id: 'test button',
      action: jest.fn(),
      text: 'test',
    }
    const { getByText } = render(<Button {...props} />)
    expect(getByText('test')).toBeTruthy()
  })

  it('Should render and match the snapshot', () => {
    const props = {
      id: 'test button',
      action: jest.fn(),
      text: 'test',
    }
    const {
      container: { firstChild },
    } = render(<Button {...props} />)
    expect(firstChild).toMatchSnapshot()
  })
})
