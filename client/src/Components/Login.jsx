import { useState } from 'react'
import "../css/Login.css"
function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('https://somesh4321.herokuapp.com/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.user) {

			alert('Login successful')
			window.location.href = '/homepage'
		} else {
			alert('Please check your username and password')
		}
	}

	return (
		<div className='main'>
			<h1>Login</h1>
			<form onSubmit={loginUser} className='form'>
				<input 
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<button type='submit' >Login</button>
			</form>
		</div>
	)
}

export default Login