// import { isLogin, loginUserInfo, setLoginUser, logout } from '../common/session'
import * as session from '../common/session'

let gamesMixin = {
  methods: {
    ...session
  }
}

export default gamesMixin
