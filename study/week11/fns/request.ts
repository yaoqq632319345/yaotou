import axios from 'axios';
export default function getUserName(id: number) {
  return axios
    .get(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((res: any) => {
      return res.data.username;
    });
}
