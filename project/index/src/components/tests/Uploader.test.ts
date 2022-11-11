import { flushPromises, shallowMount, VueWrapper } from '@vue/test-utils';
import Uploader from '@/components/Uploader.vue';
import axios from 'axios';
import {
  describe,
  it,
  expect,
  beforeAll,
  type SpyInstance,
  vi,
  afterEach,
} from 'vitest';

describe('Uploader Component', () => {
  const actionURL = 'xxxxxxxxxxxxxx';
  let viSpyAxios: SpyInstance<any>;
  let wrapper: VueWrapper<any>;
  beforeAll(async () => {
    viSpyAxios = vi.spyOn(axios, 'post');
    wrapper = await shallowMount(Uploader, {
      props: {
        action: actionURL,
      },
    });
  });
  afterEach(() => {
    // 重置调用次数等等..., 可以在配置中配置clearMocks
    viSpyAxios.mockReset();
  });
  it('basic layout before uploading', () => {
    expect(wrapper.find('button').exists()).toBeTruthy();
    expect(wrapper.get('button span').text()).toBe('点击上传');
    expect(wrapper.get('input').isVisible()).toBeFalsy();
  });
  it('upload process should works fine', async () => {
    viSpyAxios.mockResolvedValueOnce({ status: 'success' });
    const fileInput = wrapper.get('input').element as HTMLInputElement;
    const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });
    const files = [testFile];
    // input files 是只读的，所以只能用这种方式赋值
    Object.defineProperty(fileInput, 'files', {
      value: files,
      writable: false,
    });
    await wrapper.get('input').trigger('change');
    expect(axios.post).toHaveBeenCalledTimes(1);
    // 已知参数个数判断部分调用函数，其他未知
    expect(axios.post).toHaveBeenCalledWith(
      actionURL,
      expect.any(Object),
      expect.any(Object)
    );

    expect(wrapper.get('button span').text()).toBe('正在上传');
    await flushPromises();
    expect(wrapper.get('button span').text()).toBe('上传成功');
  });
  it('should return error text when post is rejected', async () => {
    viSpyAxios.mockRejectedValueOnce({ error: 'error' });
    await wrapper.get('input').trigger('change');
    expect(axios.post).toHaveBeenCalledTimes(1);
    // 未知参数个数，判断部分参数
    // SpyInstance.mock.calls 所有调用的参数数组
    // SpyInstance.mock.lastCall 最后一次调用的参数
    expect(viSpyAxios.mock.lastCall).toEqual(
      expect.arrayContaining([actionURL])
    );
    expect(wrapper.get('button span').text()).toBe('正在上传');
    await flushPromises();
    expect(wrapper.get('button span').text()).toBe('上传失败');
  });
});
