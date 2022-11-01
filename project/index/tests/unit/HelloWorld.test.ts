import { shallowMount, mount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';
import Hello from '@/components/Hello.vue';
import TemplateList from '@/components/TemplateList.vue';

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
});
