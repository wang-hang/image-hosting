import * as React from 'react'
import c from 'classnames'
import FileUpload from '@components/file-upload'

import '@style/app.less'

const { useState } = React

const App = (props: any) => {
    return (
        <div className={c('app')} id="app">
            <h1 className="title">Image Hosting</h1>
            <FileUpload></FileUpload>
        </div>
    )
}

export default App 