import { connect } from '@/config/db'
import User from '@/models/userModel'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { username, email, password } = reqBody

        console.log(reqBody)

        // check if user already exists
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            )
        }

        // hash password
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        // send verification email
        await sendEmail({ email, emailType: 'verify', userId: savedUser._id })

        return NextResponse.json(
            {
                message: 'User created successfully',
                success: true,
                user: savedUser
            },
            { status: 201 }
        )
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
