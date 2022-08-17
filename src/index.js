import ReactDom from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from './App'



ReactDom.render(<BrowserRouter><div style={{ backgroundSize: '100vw', backgroundRepeat: 'no-repeat' }}><App/></div></BrowserRouter>, document.querySelector('#root'))