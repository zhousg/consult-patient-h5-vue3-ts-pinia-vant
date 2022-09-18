declare module 'id-validator' {
  export default class {
    isValid(id: string): boolean
    getInfo(id: string): {
      sex: number
    }
  }
}

// 1. 根据使用方法知道默认导出的是一个构造函数或者是类
// 构造函数  new  对象实例    现在是ES6   类  new  对象实例
// 类
// class Person {
//   name = 'jack'
//   say() {
//     console.log('名字', this.name)
//   }
// }
// // 对象实例
// const p = new Person()
// p.say()
