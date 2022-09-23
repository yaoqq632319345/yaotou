let age: number = 10;

// null 可以赋给任意类型，在tsconfig.json 中配置了 strickNullChecks 则不可以
let obj: { age: number } = null;
obj.age;

// 元组调用 push 不会报错
let arr: [string, number] = ['', 1];
arr.push(1);

// 函数参数的类型会符合
type fn = (x: number) => number;
const tst: fn = (a) => {
  return 1;
};

// partial 将对象的 key 置为可选
interface Obj {
  name: string;
  age: number;
}
type a = Partial<Obj>;
type myPartial<T> = {
  readonly [key in keyof T]?: T[key];
};
type b = myPartial<Obj>;

// pick 从对象中选定一些键来创建新的类型
type pick = Pick<Obj, 'age'>;

type aaa = 'name' | '1' | '2';
type bbb<T extends aaa> = T;
type ccc = bbb<'1'>;

// 声明文件
axios;
iAxion;

myFetch<number>('', 'GET').then((res) => {
  res.toFixed(0);
});
myFetch.get<string>('').then((res) => console.log(res));
