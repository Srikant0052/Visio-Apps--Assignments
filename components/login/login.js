import { useState } from 'react'
import styles from './login.module.css'
import userLogin from '../../apis/userLogin'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async () => {
        try {

            console.log({ email })
            console.log({ password })

            const response = await userLogin({ email, password })
            if (!response.status) {
                alert("Login failed")
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className={styles.wrapper}>
            <h2>Login Here !</h2>
            <div className={styles.labelInput}>
                <p>Email:</p>
                <input className={styles.inputLogin} value={email} type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter your email here' />
            </div>
            <div className={styles.labelInput}>
                <p>Password:</p>
                <input className={styles.inputLogin} value={password} type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter your password here' />
            </div>
            <button className={styles.btn} onClick={handleSubmit}>Submit</button>
        </div>
    )
}