import * as React from 'react'
import c from 'classnames'
import { Button } from 'antd'

import '@style/app.less'

const { useState } = React

const App = (props: any) => {
    const [state, setState] = useState(0)
    return (
        <div className={c('app')} id="app">
            <h1 className="title">Image Hosting</h1>
            <Button type="primary">Button</Button>
        </div>
    )
}

export default App 