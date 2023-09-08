'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

export default function LoginPage() {
     const router = useRouter()
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

     const onLogin = async () => {
        if (buttonDisabled) return
        setLoading(true)
        try {
            const res = await axios.post('/api/users/login', user)

            console.log('Login success', res.data)

            router.push('/')
        } catch (error: any) {
            console.log('Login failed', error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])  

    return (
        <div className='grid place-content-center min-h-screen py-2'>
            <div className='form'>
                <h1 className='form-title'>Login</h1>
                <label className='form-label' htmlFor='email'>
                    Email :
                </label>
                <input
                    className='form-input'
                    type='email'
                    name='email'
                    id='email'
                    value={user.email}
                    placeholder='Your Email'
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                />
                <label className='form-label' htmlFor='password'>
                    Password :
                </label>
                <input
                    className='form-input'
                    type='password'
                    name='password'
                    id='password'
                    value={user.password}
                    placeholder='Your Password'
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                />
                <button
                    className={`form-button ${buttonDisabled && 'opacity-50'}`}
                    onClick={onLogin}>
                     {loading ? 'Loading...' : 'Login'}
                </button>
                <Link className='form-link' href='/signup'>
                    Signup here
                </Link>
            </div>
            <Toaster />
        </div>
    )
}
