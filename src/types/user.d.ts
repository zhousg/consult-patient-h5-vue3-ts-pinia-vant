export type User = {
  /** token令牌 */
  token: string
  /** 用户ID */
  id: string
  /** 用户名称 */
  account: string
  /** 手机号 */
  mobile: string
  /** 头像 */
  avatar: string
}

// login登录register注册changeMobile更换手机号forgetPassword找回密码,bindMobile绑定三方登录
export type CodeType =
  | 'login'
  | 'register'
  | 'changeMobile'
  | 'forgetPassword'
  | 'bindMobile'

type OmitUser = Omit<User, 'token'>
export type UserInfo = OmitUser & {
  /** 关注 */
  likeNumber: number
  /** 收藏 */
  collectionNumber: number
  /** 积分 */
  score: number
  /** 优惠券 */
  couponNumber: number
  orderInfo: {
    /** 待付款 */
    paidNumber: number
    /** 待发货 */
    receivedNumber: number
    /** 待收货 */
    shippedNumber: number
    /** 已完成 */
    finishedNumber: number
  }
}

// Omit Pick TS的内置类型
// type Person = {
//   name: string
//   age: number
//   gender: 0 | 1
// }
// // Omit 是从对象中排出一些属性，得到对象类型
// type OmitPerson = Omit<Person, 'age' | 'gender'>
// // Pick 是从对象中摘取一些属性，得到对象类型
// type PickPerson = Pick<Person, 'gender' | 'age'>

// 家庭档案-患者信息
export type Patient = {
  /** 患者ID */
  id?: string
  /** 患者名称 */
  name: string
  /** 身份证号 */
  idCard: string
  /** 0不默认  1默认 */
  defaultFlag: 0 | 1
  /** 0 女  1 男 */
  gender: 0 | 1
  /** 性别文字 */
  genderValue?: string
  /** 年龄 */
  age?: number
}

// 家庭档案-患者信息列表
export type PatientList = Patient[]
