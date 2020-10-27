import * as React from 'react'
import { Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons';
import { DraggerProps } from 'antd/lib/upload';

const { useState } = React
const { Dragger } = Upload

const FileUpload = (props) => {
  const [fileList, setFileList] = useState([])

  const options: DraggerProps = {
    name: 'file',
    multiple: true,
    action: '',
    onChange: info => {
      console.log(info)
      const { fileList } = info
      setFileList(fileList)
    },
    beforeUpload: () => true,
    customRequest: (params) => {
      const { file, filename } = params
      console.log(fileList)
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