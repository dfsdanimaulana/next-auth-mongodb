import { getTokenData } from '@/helpers/getTokenData'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import User from '@/models/userModel'
import { connect } from '@/config/db'

connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getTokenData(request)
        const user = await User.findOne({ _id: userId }).select('-password')
        return NextResponse.json({
            message: 'User found',
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
