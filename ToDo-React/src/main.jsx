import React from 'react'
import ReactDOM from 'react-dom/client'
import {HelloWorldApp} from './HelloWorldApp'


const items = ['item1','item2','item3']

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <HelloWorldApp name='Reinhard' age={23} ></HelloWorldApp>
  </>
)
