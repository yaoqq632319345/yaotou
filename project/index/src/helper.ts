import { message } from 'ant-design-vue';
interface CheckCondition {
  format?: string[];
  // 使用多少 M 为单位
  size?: number;
}
type ErrorType = 'size' | 'format' | null;
export function beforeUploadCheck(file: File, condition: CheckCondition) {
  const { format, size } = condition;
  const isValidFormat = format ? format.includes(file.type) : true;
  const isValidSize = size ? file.size / 1024 / 1024 < size : true;
  let error: ErrorType = null;
  if (!isValidFormat) {
    error = 'format';
  }
  if (!isValidSize) {
    error = 'size';
  }
  return {
    passed: isValidFormat && isValidSize,
    error,
  };
}

export const commonUploadCheck = (file: File) => {
  const result = beforeUploadCheck(file, {
    format: ['image/jpeg', 'image/png'],
    size: 1,
  });
  const { passed, error } = result;
  if (error === 'format') {
    message.error('上传图片只能是 JPG/PNG 格式!');
  }
  if (error === 'size') {
    message.error('上传图片大小不能超过 1Mb');
  }
  return passed;
};

/**
 * 获取图片原始宽高
 * @param file 图片地址或者图片文件
 */
export function getImageDimensions(file: string | File) {
  return new Promise<{ width: number; height: number }>((res, rej) => {
    const img = new Image();
    img.src = typeof file === 'string' ? file : URL.createObjectURL(file);
    img.onload = () => {
      const { naturalWidth, naturalHeight } = img;
      res({
        width: naturalWidth,
        height: naturalHeight,
      });
    };
    img.onerror = () => rej(new Error('获取图片宽高失败'));
  });
}
