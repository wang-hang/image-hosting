import * as React from "react";
import * as ReactDOM from "react-dom";
import * as path from 'path'

import App from './App'
import '@style/index.less'


ReactDOM.render(
  <App />,
  document.getElementById("root")
);

if(module.hot){ 
  module.hot.accept()
}