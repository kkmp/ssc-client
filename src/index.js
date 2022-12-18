import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

const Main = () => {
  const [call, setCall] = useState(0)
  return (
    <BrowserRouter>
    <App callback={() => setCall(call + 1)}/>
  </BrowserRouter>
  )
};


ReactDOM.render(
  <React.StrictMode>
      <Main></Main>
  </React.StrictMode>,
  document.getElementById('root')
)