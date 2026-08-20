import {useState} from "react";

function Login({onLogin}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({email, password})
        })

        const data = await response.json()

        if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken)
            onLogin(email)
        } else {
            console.log('Hibás email vagy jelszó!')
        }
    }

    return (<form onSubmit={handleSubmit}>
        <h2>Bejelentkezés</h2>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button type="submit">Bejelentkezés</button>
    </form>)
}

export default Login