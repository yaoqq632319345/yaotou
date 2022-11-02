import { mount, type VueWrapper } from '@vue/test-utils';
import UserProfile from '@/components/UserProfile.vue';
import { afterAll, beforeAll, vi, describe, it, expect } from 'vitest';
let wrapper: VueWrapper<any>;
beforeAll(() => {
  vi.mock('vuex');
  vi.mock('vue-router');
});
afterAll(() => {
  vi.resetModules();
});
const mockComponent = {
  template: '<div><slot></slot></div>',
};
const mockComponent2 = {
  template: '<div><slot></slot><slot name="overlay"></slot></div>',
};
const globalComponents = {
  'a-button': mockComponent,
  'a-dropdown-button': mockComponent2,
  'router-link': mockComponent,
  'a-menu': mockComponent,
  'a-menu-item': mockComponent,
};

describe('UserProfile component', () => {
  beforeAll(() => {
    wrapper = mount(UserProfile, {
      props: {
        user: { isLogin: false },
      },
      global: {
        components: globalComponents,
      },
    });
  });
  it('should render login button when login is false', () => {
    expect(wrapper.get('div').text()).toBe('登录');
  });
  it('should render username when login is true', async () => {
    await wrapper.setProps({
      user: { isLogin: true, userName: 'viking' },
    });
    expect(wrapper.get('.user-profile-component').html()).toContain('viking');
    expect(wrapper.find('.user-profile-dropdown').exists()).toBeTruthy();
  });
});
