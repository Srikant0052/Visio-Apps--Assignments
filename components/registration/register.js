import { useState } from 'react';
import styles from './register.module.css';
import userRegistration from '../../apis/userRegistration'


export default function register() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {

            console.log({ name });
            console.log({ age });
            console.log({ email });
            console.log({ password });

            const response = await userRegistration({ name, age, email, password })
            if (!response.status) {
                alert("Registration failed")
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className={styles.wrapper}>
            <h2>Register Here !</h2>
            <div className={styles.labelInput}>
                <p>Full Name:</p>
                <input className={styles.inputRegister} value={name} type="text" onChange={(e) => { setName(e.target.value) }} placeholder='Enter your full name here' />
            </div>
            <div className={styles.labelInput}>
                <p>Age:</p>
                <input className={styles.inputRegister} value={age} type="age" onChange={(e) => { setAge(e.target.value) }} placeholder='Enter your age here' />
            </div>
            <div className={styles.labelInput}>
                <p>Email:</p>
                <input className={styles.inputRegister} value={email} type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter your email here' />
            </div>
            <div className={styles.labelInput}>
                <p>Password:</p>
                <input className={styles.inputRegister} value={password} type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter your password here' />
            </div>
            <button className={styles.btn} onClick={handleSubmit}>Submit</button>
        </div>
    );
}
