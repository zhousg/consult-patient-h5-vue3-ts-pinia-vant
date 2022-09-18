export type User = {
  id: string
  account: string
  avatar: string
  mobile: string
  token: string
}

// 验证码类型
export type CodeType = 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'

// 排出token得到对象类型
type OmitUser = Omit<User, 'token'>
type UserInfo = OmitUser & {
  likeNumber: number
  collectionNumber: number
  score: number
  couponNumber: number
  orderInfo: {
    paidNumber: number
    receivedNumber: number
    shippedNumber: number
    finishedNumber: number
  }
}

// 患者类型
type Patient = {
  id?: string
  name: string
  idCard: string
  gender: 0 | 1
  genderValue?: string
  age?: number
  defaultFlag: 0 | 1
}
