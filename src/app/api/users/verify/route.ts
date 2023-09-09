import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { connect } from '@/config/db'
import User from '@/models/userModel'

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { token } = reqBody

        const user = await User.findOne({
            verifyToken: token,
            verifyExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 400 }
            )
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyExpiry = undefined
        await user.save()

        return NextResponse.json({
            message: 'Email verified successfully',
            success: true
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
