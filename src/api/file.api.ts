import * as AV from 'leancloud-storage'
import { appId, appKey, serverURL } from '../../app.config'

AV.init({
  appId,
  appKey,
  serverURL,
})

export async function uploadFile(fileRaw: File, name: string, onprogress: (event:{percent: number}) => void): Promise<string>{
  const file = new AV.File(name, fileRaw)
  const f = await file.save({keepFileName: true, onprogress})
  return f.url()
}

