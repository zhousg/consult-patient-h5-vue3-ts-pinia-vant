interface Window {
  _AMapSecurityConfig: {
    securityJsCode: string
  }
}

type QCType = {
  Login: {
    check(): boolean
    getMe(cb: (openId: string) => void): void
  }
}

declare const QC: QCType

interface ImportMetaEnv {
  VITE_APP_CALLBACK: string
  VITE_APP_TITLE: string
}
