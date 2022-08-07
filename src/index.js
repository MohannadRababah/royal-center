import ReactDom from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from './App'


ReactDom.render(
    <BrowserRouter><div style={{backgroundImage:`url('../public/logo-removebg-preview.png')`}}><App/></div></BrowserRouter>,document.querySelector('#root')
)