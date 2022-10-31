import getUserName from '../fns/request';
import axios from 'axios';

jest.mock('axios');
jest.spyOn(axios, 'get').mockResolvedValue({ data: { username: 'name' } });
it('test lib', () => {
  return getUserName(1).then((name: any) => {
    expect(name).toBe('name');
    expect(axios.get).toHaveBeenCalled();
  });
});
it('test lib', async () => {
  const res = await getUserName(1);
  expect(res).toBe('name');
  expect(axios.get).toHaveBeenCalled();
});
