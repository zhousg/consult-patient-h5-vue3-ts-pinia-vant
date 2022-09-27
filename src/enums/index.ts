export {}

// 1. 枚举的语法

// 一组数据，Up Down Left Right 对应的值分布式 0  1  2  3 你的类型只能在这组数组中使用其中一个。
// enum Direction {
//   Up = 0,
//   Down = 1,
//   Left = 2,
//   Right = 3
// }

// 值从0开始，以此类推
// enum Direction {
//   Up,
//   Down,
//   Left,
//   Right
// }

// 第一个值5开始，从5开始加
// enum Direction {
//   Up = 5,
//   Down,
//   Left,
//   Right
// }

// 可以是字符串吗？
// enum Direction {
//   Up = 'Up',
//   Down = 'Down',
//   Left = 'Left',
//   Right = 'Right'
// }

// const changeDirection = (d: Direction) => {
//   console.log('方向值', d)
// }

// changeDirection(Direction.Left)

// 2. 枚举的使用场景，几个小例子

// 男是 0  女是 1
// enum Gender {
//   Boy,
//   Girl
// }

// const changeGender = (gender: Gender) => {
//   if (gender === Gender.Boy) {
//     console.log('男')
//   }
// }

// changeGender(Gender.Boy)

// // 待付款 1  已付款  5   已完成  8
// enum OrderStatus {
//   Unpay = 1,
//   Payed = 5,
//   Complete = 8
// }

// const changeStatus = (status: OrderStatus) => {
//   if (status === OrderStatus.Complete) {
//     console.log('订单完成')
//   }
// }

// changeStatus(OrderStatus.Complete)

// 3. 业务上的枚举类型

// 问诊类型
export enum ConsultType {
  Doctor = 1,
  Fast = 2,
  Medication = 3
}

export enum ConsultTime {
  Week = 1,
  Month,
  HalfYear,
  More
}

// 消息类型
export enum MsgType {
  // 文字
  MsgText = 1,
  // 图片
  MsgImage = 4,
  // 患者
  CardPat = 21,
  // 处方
  CardPre = 22,
  // 未评价
  CardEvaForm = 23,
  // 已评价
  CardEva = 24,
  // 通用系统
  Notify = 31,
  // 温馨提示
  NotifyTip = 32,
  // 取消订单
  NotifyCancel = 33
}

// 处方状态
export enum PrescriptionStatus {
  // 未支付
  NotPayment = 1,
  // 已支付
  Payment = 2,
  // 无效
  Invalid = 3
}

// 订单状态
export enum OrderType {
  // 待支付
  ConsultPay = 1,
  // 待接诊
  ConsultWait = 2,
  // 咨询中
  ConsultChat = 3,
  // 已完成
  ConsultComplete = 4,
  // 已取消
  ConsultCancel = 5,
  // ------------------------------------------
  MedicinePay = 10,
  MedicineSend = 11,
  MedicineTake = 12,
  MedicineComplete = 13,
  MedicineCancel = 14
}

export enum ExpressStatus {
  // 已发货
  Delivered = 1,
  // 已揽件
  Received = 2,
  // 运输中
  Transit = 3,
  // 派送中
  Delivery = 4,
  // 已签收
  Signed = 5
}
