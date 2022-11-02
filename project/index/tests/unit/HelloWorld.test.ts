import {
  shallowMount,
  mount,
  flushPromises,
  type VueWrapper,
} from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';
import Hello from '@/components/Hello.vue';
import TemplateList from '@/components/TemplateList.vue';
import axios from 'axios';
import {
  beforeEach,
  describe,
  it,
  expect,
  type SpyInstance,
  vi,
  afterEach,
  beforeAll,
} from 'vitest';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const shallowWrapper = shallowMount(HelloWorld, {
      props: { msg },
    });

    expect(shallowWrapper.html()).toMatchSnapshot();
    expect(shallowWrapper.props().msg).toBe(msg);
    expect(shallowWrapper.findAllComponents(Hello)).toHaveLength(1);
    expect(shallowWrapper.findAllComponents(TemplateList)).toHaveLength(0);

    const wrapper = mount(HelloWorld, {
      props: { msg },
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.props().msg).toBe(msg);
    expect(wrapper.findAllComponents(Hello)).toHaveLength(1);
  });

  it('should update the count when clicking the button', async () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    await wrapper.get('button').trigger('click');
    expect(wrapper.get('button').text()).toBe('2');
  });

  it('should add todo when fill the input and click the add button', async () => {
    const msg = 'new message';
    const todoContent = 'buy milk';
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    await wrapper.get('input').setValue(todoContent);
    expect(wrapper.get('input').element.value).toBe(todoContent);
    await wrapper.get('.addTodo').trigger('click');
    expect(wrapper.findAll('li')).toHaveLength(1);
    expect(wrapper.get('li').text()).toBe(todoContent);
    expect(wrapper.emitted()).toHaveProperty('send');
    const events = wrapper.emitted('send');
    expect(events![0]).toEqual([todoContent]);

    // const events = wrapper.emitted();
    // expect(events).toHaveProperty('send');
    // const sendEvent = events.send;
    // expect(sendEvent[0]).toEqual([todoContent]);
  });
});

describe('components axios', () => {
  let viSpyAxios: SpyInstance<any>;
  let wrapper: VueWrapper<any>;
  beforeEach(async () => {
    viSpyAxios = vi.spyOn(axios, 'get');
    wrapper = await mount(HelloWorld);
  });
  afterEach(() => {
    viSpyAxios.mockRestore();
  });
  it('mock', async () => {
    const res = { data: { username: 'mock name' } };
    viSpyAxios.mockResolvedValue(res);
    await wrapper.get('.loadUser').trigger('click');
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users/1'
    );

    expect(wrapper.find('.loading').exists()).toBeTruthy();
    // 等promise走完
    await flushPromises();
    expect(wrapper.find('.loading').exists()).toBeFalsy();
    expect(wrapper.get('.userName').text()).toBe('mock name');
  });

  it('mock error', async () => {
    viSpyAxios.mockRejectedValue('error mock');
    await wrapper.get('.loadUser').trigger('click');
    expect(axios.get).toHaveBeenCalled();
    expect(wrapper.find('.loading').exists()).toBeTruthy();
    // 等promise走完
    await flushPromises();
    expect(wrapper.find('.loading').exists()).toBeFalsy();
    expect(wrapper.find('.error').exists()).toBeTruthy();
  });
});

beforeEach(() => {
  // console.log('beforeEach');
});
beforeAll(() => {
  // console.log('beforeAll');
});
