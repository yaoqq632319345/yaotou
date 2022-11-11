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
    Object.defineProperty(fileInput, 'files', {
      value: files,
      writable: false,
    });
    await wrapper.get('input').trigger('change');
    expect(axios.post).toHaveBeenCalledTimes(1);
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
    expect(wrapper.get('button span').text()).toBe('正在上传');
    await flushPromises();
    expect(wrapper.get('button span').text()).toBe('上传失败');
  });
});
