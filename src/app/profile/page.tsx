'use client'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const logout = async () => {
        setLoading(true)
        try {
            await axios.get('/api/users/logout')
            toast.success('User logged out successfully')
            router.push('/login')
        } catch (error: any) {
            console.log('Logout failed', error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const getUserDetails = async () => {
        const response = await axios.get('/api/users/user')
        setData(response.data.data._id)
    }

    return (
        <div className='grid place-items-center min-h-screen'>
            <div>
                <h1>Profile</h1>

                {data && <Link href={`/profile/${data}`}>See my profile</Link>}

                <button onClick={logout} className='form-button'>
                    {loading ? 'Loading...' : 'Logout'}
                </button>
                <button onClick={getUserDetails} className='form-button'>
                    Get User
                </button>
            </div>
            <Toaster />
        </div>
    )
}
