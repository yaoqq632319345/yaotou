declare function axios(url: string): string;

declare interface IAxios {
  get: (url: string) => string;
  post: (url: number) => number;
}

declare const iAxion: IAxios;

type method = 'GET' | 'POST';
declare function myFetch<T = any>(
  url: string,
  method: method,
  data?: any
): Promise<T>;

declare namespace myFetch {
  const get: <T>(url: string) => Promise<T>;
  const post: <T>(url: string, data?: any) => Promise<T>;
}
