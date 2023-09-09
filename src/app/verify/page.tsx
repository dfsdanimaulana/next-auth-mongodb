'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

export default function VerifyEmailPage() {
    const [token, setToken] = useState('')
    const [isVerified, setIsVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyEmail = async () => {
        try {
            await axios.post('/api/users/verify', { token })
            setIsVerified(true)
        } catch (error: any) {
            setError(true)
            console.log(error)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1]
        setToken(urlToken || '')
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyEmail()
        }
    }, [token])

    return (
        <div className='grid place-items-center min-h-screen'>
            <div>
                <p>
                    {isVerified
                        ? 'Email verified successfully'
                        : 'Email not verified'}
                </p>
                {token.length === 0 && <p>No Token</p>}
                {error && <p>Something went wrong</p>}
            </div>
        </div>
    )
}
