import * as React from 'react'
import {mount} from 'enzyme'
import AboutPage from '../pages/about'

describe('Pages', () => {
  describe('Index', () => {
    it('should render without throwing an error', function () {
      const wrap = mount(<AboutPage/>)
      expect(wrap.find('div').text()).toBe('Hello')
    })
  })  
})