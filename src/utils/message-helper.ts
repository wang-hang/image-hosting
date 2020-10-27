import { message } from 'antd'

type cb = (content: string, duration?: number) => Promise<any>

interface MSG {
  success?: cb,
  info?: cb,
  error?: cb,
  warning?: cb,
}

const $msg:MSG = {}

const DEFAULT_DURATION = 3

const msgTypes = ['success', 'info', 'error', 'warning']
msgTypes.forEach(name => {
  $msg[name] = (content, duration = DEFAULT_DURATION) => {
    return new Promise(resolve => {
      message[name](content, duration, () => {
        resolve()
      })
    })
  }
})

export default $msg