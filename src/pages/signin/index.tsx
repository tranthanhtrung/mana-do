import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import Message from '../../components/message';

import Service from '../../service'
import './signInPage.css'

const SignInPage = () => {
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });
    const history = useHistory();
    const [validateMessages, setMessage] = useState<string>('')

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (form.userId.length === 0) {
            setMessage('Username is requied field')
            return
        }

        if (form.password.length === 0) {
            setMessage('Password is requied field')
            return
        }

        try {
            const resp = await Service.signIn(form.userId, form.password)
            localStorage.setItem('token', resp)
            history.push('/todo')
        } catch (err) {
            setMessage(err)
        }
    }

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setForm(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="wrapper">
            <div className="Signin__form">
                <h2 className="Signin__header">SIGN IN</h2>
                <form onSubmit={signIn}>
                    <input
                        className="Signin__input"
                        id="user_id"
                        name="userId"
                        placeholder="Username"
                        value={form.userId}
                        onChange={onChangeField}
                    />
                    <br/>
                    <input
                        className="Signin__input"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={onChangeField}
                    />
                    <br />
                    {validateMessages.length > 0 ? 
                        <Message
                            className='Signin__message'
                            message={validateMessages}
                        /> : <div/>
                    }
                    <button type="submit" className="Signin__btn">
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;