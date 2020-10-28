import * as React from 'react'
import { Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons';
import { clipboard } from 'electron'
import { CopyOutlined } from '@ant-design/icons'

// Types
import { DraggerProps } from 'antd/lib/upload/Dragger';
import { UploadFileStatus  } from 'antd/lib/upload/interface'

import * as FileAPI from '@api/file.api'
import $msg from '@/utils/message-helper'
import FileListItem from '@components/file-list-item'
import readFileToBase64 from '@utils/read-img-to-base64';

import '@style/file-upload.less'


const { useState, useEffect } = React
const { Dragger } = Upload
const Fragment = React.Fragment
interface File {
  name: string
  percent: number
  status: UploadFileStatus
  uid: string
  localUrl: string
}


const imgUrlMap: {[uid:string]: string} = {}
const FileUpload = () => {
  const [fileList, setFileList] = useState<File[]>([])

  const options: DraggerProps = {
    name: 'file',
    multiple: true,
    listType: 'picture-card',
    showUploadList: {
      showRemoveIcon: false,
      showPreviewIcon: false,
      showDownloadIcon: true,
      downloadIcon: (f) => {
        return (<CopyOutlined style={{fontSize: 20, color: "#FFF"}} onClick={() => handleCopy(f.uid)} />)
      }
    },
    beforeUpload: () => true,
    onChange : async (info ) => {
      const { name, percent, status, uid } = info.file
      const base64Url = await readFileToBase64(info.file.originFileObj)
      const index = fileList.findIndex(f => f.name === name)
      const newFile = {name, localUrl: base64Url, percent, status, uid }
      if(index > -1 ){
        fileList[index] = newFile
      }else {
        fileList.push(newFile)
      }
      setFileList([...fileList])
    },
    customRequest: async (params) => {
      const { file, onProgress, onSuccess } = params
      const url = await FileAPI.uploadFile(file, file.name, ({percent}) => {
        onProgress({percent}, file)
      })
      imgUrlMap[file.uid] = url
      onSuccess({url}, file)
      copyUrl(url)
    }
  }

  const copyUrl = (url:string) => {
    clipboard.writeText(url)
    $msg.success('图片链接已经复制到剪贴板啦~~~')
  }
  const handleCopy = (id:string) => {
    const url = imgUrlMap[id]
    copyUrl(url)
  }
  const fileListDom = (
      <div className="file-list">
        {
          fileList.map(f => {
            return <FileListItem key={f.uid} id={f.uid} name={f.name} url={f.localUrl} onCopy={handleCopy}  />
          })
        }
      </div>)

  return (
    <Fragment>
      <Dragger {...options}>
        <p><InboxOutlined /></p>
        <p>请添加图片:</p>
      </Dragger>
      {/* {fileListDom} */}
    </Fragment>
  )
}

export default FileUpload