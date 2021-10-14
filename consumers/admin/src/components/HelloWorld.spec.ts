import { mount } from '@vue/test-utils'
import HelloWorld from './HelloWorld.vue'

describe('HelloWorld', () => {

  test('displays message', () => {
    // mount() returns a wrapped Vue component we can interact with
    const wrapper = mount(HelloWorld, {
      propsData: {
        msg: 'Hello world'
      }
    })
  })
})
