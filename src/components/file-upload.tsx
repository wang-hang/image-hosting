import * as React from 'react'
import { Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons';
import { DraggerProps } from 'antd/lib/upload';

import { uploadFile } from '@api/file.api'


const { useState } = React
const { Dragger } = Upload

const FileUpload = (props) => {
  const [url, setUrl] = useState('')

  const options: DraggerProps = {
    name: 'file',
    multiple: true,
    beforeUpload: () => true,
    customRequest: async (params) => {
      const { file, onProgress, onSuccess } = params
      console.log(params)
      const url = await uploadFile(file, file.name, ({percent}) => {
        onProgress({percent}, file)
      })
      setUrl(url)
      onSuccess({url}, file)
    }


  }
  return (
    <Dragger {...options}>
      <p><InboxOutlined /></p>
      <p>请添加图片:</p>
    </Dragger>
  )
}

export default FileUpload