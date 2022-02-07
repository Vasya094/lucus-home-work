import logo from "./logo.svg"
import "./App.css"
import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./components/auth/SignIn.js"
import Signup from "./components/auth/SignUp"
import DataTable from "./components/pages/DataTable"
import PrivateRoute from "./components/PrivateRoute"
import Sidebar from "./components/SideBar"
import Gallery from "./components/pages/Gallery"
import Todo from "./components/pages/Todo"

function App() {
  return (
    <div className='App'>
      <Router>
        <Sidebar />

        <Container
          className='d-flex align-items-center justify-content-center'
          style={{ minHeight: "100vh", overflow: "scroll" }}
        >
          <div
            className='w-100 overflow-scroll'
            style={{ maxWidth: "900px", maxHeight: "100vh" }}
          >
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <PrivateRoute exact path='/tables' component={DataTable} />
            <PrivateRoute exact path='/gallery' component={Gallery} />
            <PrivateRoute exact path='/todo' component={Todo} />
          </div>
        </Container>
      </Router>
    </div>
  )
}

export default App
