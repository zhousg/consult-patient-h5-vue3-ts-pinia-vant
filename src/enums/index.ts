// export {}

// 枚举：一组可选的常量
// 需求：0 1 2 3 上下左右

// enum Direction {
//   Up = 0,
//   Down = 1,
//   Left = 2,
//   Right = 3
// }

// 值默认是从0开始以此类推
// enum Direction {
//   Up,
//   Down,
//   Left,
//   Right
// }

// 如果给了一个默认的数字，一样的
// enum Direction {
//   Up = 5,
//   Down,
//   Left,
//   Right
// }

// 可以是字符串
// enum Direction {
//   Up = 'Up',
//   Down = 'Down',
//   Left = 'Left',
//   Right = 'Right'
// }

// const changeDirection = (direction: Direction) => {
//   console.log(direction)
// }

// changeDirection(Direction.Right)

// 问诊类型
export enum ConsultType {
  Doctor = 1,
  Fast = 2,
  Medication = 3
}

// 问诊时间
export enum IllnessTime {
  Week = 1,
  Month,
  HalfYear,
  More
}
