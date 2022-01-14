import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Homepage from './Components/Homepage'
import Login from './Components/Login'
const App = () => {
  return (
    <div>
    <div>
			<Router>
      <Routes>
    <Route exact path='/' element={< Login />}></Route>
    <Route exact path='/homepage' element={< Homepage />}></Route>
</Routes>
			</Router>
		</div>
    </div>
  )
}

export default App
