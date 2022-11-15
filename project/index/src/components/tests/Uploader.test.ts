import {
  flushPromises,
  shallowMount,
  VueWrapper,
  mount,
} from '@vue/test-utils';
import Uploader from '@/components/Uploader.vue';
import axios from 'axios';
import {
  describe,
  it,
  expect,
  type SpyInstance,
  vi,
  afterEach,
  beforeEach,
} from 'vitest';

describe('Uploader Component', () => {
  const actionURL = 'xxxxxxxxxxxxxx';
  let viSpyAxios: SpyInstance<any>;
  let wrapper: VueWrapper<any>;
  beforeEach(async () => {
    viSpyAxios = vi.spyOn(axios, 'post');
    wrapper = await shallowMount(Uploader, {
      props: {
        action: actionURL,
      },
    });
  });
  afterEach(() => {
    wrapper.unmount();
    // 重置调用次数等等..., 可以在配置中配置clearMocks
    viSpyAxios.mockReset();
  });
  it('basic layout before uploading', () => {
    expect(wrapper.find('button').exists()).toBeTruthy();
    expect(wrapper.get('button').text()).toBe('点击上传');
    expect(wrapper.get('input').isVisible()).toBeFalsy();
  });
  it('upload process should works fine', async () => {
    viSpyAxios.mockResolvedValueOnce({ status: 'success' });
    const fileInput = wrapper.get('input').element as HTMLInputElement;
    const testFile = setInputValue(fileInput);
    await wrapper.get('input').trigger('change');
    expect(axios.post).toHaveBeenCalledTimes(1);
    // 已知参数个数判断部分调用函数，其他未知
    expect(axios.post).toHaveBeenCalledWith(
      actionURL,
      expect.any(Object),
      expect.any(Object)
    );

    expect(wrapper.get('button').text()).toBe('正在上传');
    // button 为 disabled
    expect(wrapper.get('button').attributes()).toHaveProperty('disabled');
    // 列表长度修改，并且有正确的 class
    expect(wrapper.findAll('li').length).toBe(1);
    const firstItem = wrapper.get('li:first-child');
    expect(firstItem.classes()).toContain('upload-loading');
    await flushPromises();
    expect(wrapper.get('button').text()).toBe('点击上传');
    // 有正确的 class，并且文件名称相对应
    expect(firstItem.classes()).toContain('upload-success');
    expect(firstItem.get('.filename').text()).toBe(testFile.name);
  });
  it('should return error text when post is rejected', async () => {
    viSpyAxios.mockRejectedValueOnce({ error: 'error' });
    // 每个测试用例互不影响
    const fileInput = wrapper.get('input').element as HTMLInputElement;
    setInputValue(fileInput);
    await wrapper.get('input').trigger('change');
    expect(axios.post).toHaveBeenCalledTimes(1);
    // 未知参数个数，判断部分参数
    // SpyInstance.mock.calls 所有调用的参数数组
    // SpyInstance.mock.lastCall 最后一次调用的参数
    expect(viSpyAxios.mock.lastCall).toEqual(
      expect.arrayContaining([actionURL])
    );
    expect(viSpyAxios.mock.lastCall).toContain(actionURL);
    expect(wrapper.get('button').text()).toBe('正在上传');
    await flushPromises();
    expect(wrapper.get('button').text()).toBe('点击上传');
    // 列表长度增加，并且列表的最后一项有正确的 class 名
    expect(wrapper.findAll('li').length).toBe(1);
    const lastItem = wrapper.get('li:last-child');
    expect(lastItem.classes()).toContain('upload-error');
    // 点击列表中右侧的 button，可以删除这一项
    await lastItem.get('.delete-icon').trigger('click');
    expect(wrapper.findAll('li').length).toBe(0);
  });

  it('should show the correct interface when using custom slot', async () => {
    viSpyAxios.mockResolvedValueOnce({ data: { url: 'dummy.url' } });
    const wrapper = mount(Uploader, {
      props: {
        action: 'test.url',
      },
      slots: {
        default: '<button>Custom button</button>',
        loading: '<div class="loading">custom loading</div>',
        uploaded: `<template #uploaded="{ uploadedData }">
          <div class="custom-loaded">{{uploadedData.url}}</div>
        </template>`,
      },
    });
    expect(wrapper.get('button').text()).toBe('Custom button');
    const fileInput = wrapper.get('input').element as HTMLInputElement;
    setInputValue(fileInput);
    await wrapper.get('input').trigger('change');
    expect(wrapper.get('.loading').text()).toBe('custom loading');
    await flushPromises();
    expect(wrapper.get('.custom-loaded').text()).toBe('dummy.url');
  });

  it('before upload check', async () => {
    const callback = vi.fn();
    viSpyAxios.mockResolvedValueOnce({ data: { url: 'dummy.url' } });
    const checkFileSize = (file: File) => {
      if (file.size > 2) {
        callback();
        return false;
      }
      return true;
    };
    const wrapper = shallowMount(Uploader, {
      props: {
        action: 'test.url',
        beforeUpload: checkFileSize,
      },
    });
    const fileInput = wrapper.get('input').element as HTMLInputElement;
    setInputValue(fileInput);
    await wrapper.get('input').trigger('change');
    expect(axios.post).not.toHaveBeenCalled();
    expect(wrapper.findAll('li').length).toBe(0);
    expect(callback).toHaveBeenCalled();
  });
  it('before upload check using Promise', async () => {
    viSpyAxios.mockResolvedValueOnce({ data: { url: 'dummy.url' } });
    const failedPromise = (file: File) => {
      return Promise.reject('wrong type');
    };
    const successPromise = (file: File) => {
      const newFile = new File([file], 'new_name.docx', { type: file.type });
      return Promise.resolve(newFile);
    };
    const successPromiseWithWrongType = () => {
      return Promise.resolve('abcd');
    };

    const wrapper = shallowMount(Uploader, {
      props: {
        action: 'test.url',
        beforeUpload: failedPromise,
      },
    });
    // failed promise
    const fileInput = wrapper.get('input').element as HTMLInputElement;
    setInputValue(fileInput);
    await wrapper.get('input').trigger('change');
    await flushPromises();
    expect(axios.post).not.toHaveBeenCalled();
    expect(wrapper.findAll('li').length).toBe(0);
    // success promise with wrong file
    await wrapper.setProps({ beforeUpload: successPromiseWithWrongType });
    await wrapper.get('input').trigger('change');
    await flushPromises();
    expect(axios.post).not.toHaveBeenCalled();
    expect(wrapper.findAll('li').length).toBe(0);
    // success promise with file
    await wrapper.setProps({ beforeUpload: successPromise });
    await wrapper.get('input').trigger('change');
    await flushPromises();
    expect(axios.post).toHaveBeenCalled();
    const firstItem = wrapper.get('li:first-child');
    expect(firstItem.classes()).toContain('upload-success');
    expect(firstItem.get('.filename').text()).toBe('new_name.docx');
  });

  it('testing drag and drop function', async () => {
    viSpyAxios.mockResolvedValueOnce({ data: { url: 'dummy.url' } });
    const wrapper = shallowMount(Uploader, {
      props: {
        action: 'test.url',
        drag: true,
      },
    });
    const uploadArea = wrapper.get('.upload-area');
    await uploadArea.trigger('dragover');
    expect(uploadArea.classes()).toContain('is-dragover');
    await uploadArea.trigger('dragleave');
    expect(uploadArea.classes()).not.toContain('is-dragover');
    await uploadArea.trigger('drop', {
      dataTransfer: { files: [setInputValue()] },
    });
    expect(axios.post).toHaveBeenCalled();
    await flushPromises();
    expect(wrapper.findAll('li').length).toBe(1);
  });

  it('testing manual upload process', async () => {
    viSpyAxios.mockResolvedValueOnce({ data: { url: 'dummy.url' } });
    const wrapper = shallowMount(Uploader, {
      props: {
        action: 'test.url',
        drag: true,
        autoUpload: false,
      },
    });
    const fileInput = wrapper.get('input').element as HTMLInputElement;
    setInputValue(fileInput);
    await wrapper.get('input').trigger('change');
    expect(wrapper.findAll('li').length).toBe(1);
    const firstItem = wrapper.get('li:first-child');
    expect(firstItem.classes()).toContain('upload-ready');
    wrapper.vm.uploadFiles();
    expect(axios.post).toHaveBeenCalled();
    await flushPromises();
    expect(firstItem.classes()).toContain('upload-success');
  });
});

const setInputValue = (input?: HTMLInputElement) => {
  const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });
  if (!input) return testFile;
  const files = [testFile] as any;
  Object.defineProperty(input, 'files', {
    value: files,
    writable: false,
  });
  return testFile;
};
