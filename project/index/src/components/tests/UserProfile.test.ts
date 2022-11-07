import { mount, type VueWrapper } from '@vue/test-utils';
import UserProfile from '@/components/UserProfile.vue';
import {
  afterAll,
  beforeAll,
  vi,
  describe,
  it,
  expect,
  afterEach,
  type Mocked,
} from 'vitest';
import { message } from 'ant-design-vue';
import store from '@/storeVuex';

let wrapper: VueWrapper<any>;
// vue-router mock
const mockedRoutes: string[] = [];
beforeAll(() => {
  vi.mock('vue-router', () => ({
    useRouter: () => ({
      push: (url: string) => mockedRoutes.push(url),
    }),
  }));
  vi.mock('ant-design-vue', () => ({
    message: {
      success: vi.fn(),
    },
  }));
});

afterAll(() => {
  vi.clearAllMocks();
});
afterEach(() => {
  (message as Mocked<typeof message>).success.mockReset();
});

// component mock start
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
// component mock end

describe('UserProfile component', () => {
  beforeAll(() => {
    wrapper = mount(UserProfile, {
      props: {
        user: { isLogin: false },
      },
      global: {
        provide: { store },
        components: globalComponents,
      },
    });
  });
  it('should render login button when login is false', async () => {
    expect(wrapper.get('div').text()).toBe('登录');
    await wrapper.get('div').trigger('click');
    expect(message.success).toHaveBeenCalled();
    expect(store.state.user.userName).toBe('viking');
  });
  it('login', async () => {
    await wrapper.setProps({
      user: { isLogin: true, userName: 'viking' },
    });
    expect(wrapper.get('.user-profile-component').html()).toContain('viking');
    expect(wrapper.find('.user-profile-dropdown').exists()).toBeTruthy();
  });
  it('logout', async () => {
    vi.useFakeTimers();
    await wrapper.get('.user-profile-dropdown div').trigger('click');
    expect(store.state.user.isLogin).toBeFalsy();
    expect(message.success).toHaveBeenCalled();
    vi.runAllTimers();
    expect(mockedRoutes).toEqual(['/']);
  });
});
