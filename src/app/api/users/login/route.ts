import { connect } from '@/config/db'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { email, password } = reqBody

        // find user
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json(
                { error: 'User does not exist' },
                { status: 400 }
            )
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return NextResponse.json(
                { error: 'Incorrect password' },
                { status: 400 }
            )
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
            expiresIn: '1h'
        })

        const response = NextResponse.json({
            message: 'User logged in successfully',
            success: true
        })

        response.cookies.set('token', token, {
            httpOnly: true
        })

        return response
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
