import * as React from 'react'
import { UploadFileStatus } from 'antd/lib/upload/interface'
import { CopyOutlined } from '@ant-design/icons'
import { Progress } from 'antd'

import '@style/file-list-item.less'
import When from '@components/when'

const { Fragment, useState } = React

interface Props{
  name: string
  url: string
  percent?: number
  status?: UploadFileStatus
  onCopy?: (url:string) => void
  id: string
}


const FileListItem:React.FunctionComponent<Props> = (props) => {
  const [show, setShow] = useState(false)

  const { name, url, onCopy, id,status, percent } = props
  const handleCopyClick = () => {
    onCopy(id)
  }
  const showWrapper = show && ['success', 'done'].includes(status)
  return (
    <Fragment>
      <div className="file-list-item">
        <div className="container" onMouseMove={() => setShow(true)} onMouseLeave={() => setShow(false)}>
          <img src={url} />
          <When condition={showWrapper} >
            <div className="wrapper">
              <CopyOutlined style={{fontSize: 35, color: "#FFF"}} onClick={handleCopyClick} />
            </div>
          </When>
          <When condition={true}>
            <div className="wrapper">
              <Progress percent={percent} />
            </div>
          </When>
        </div>
        <p className="name">{name}</p>
      </div>
    </Fragment>
  )
}
export default FileListItem