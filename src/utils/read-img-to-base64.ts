import * as fs from 'fs'

export default function readFileToBase64(file: File | Blob):Promise<string>{
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result as string)
    }
  })
}