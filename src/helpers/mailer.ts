import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '@/models/userModel'
import nodemailer from 'nodemailer'

export async function sendEmail({ email, emailType, userId }: any) {
    try {
        // create a hash token
        const token = await bcrypt.hash(userId.toString(), 12)

        // update user token

        if (emailType === 'verify') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: token,
                verifyExpiry: new Date(Date.now() + 60 * 60 * 1000)
            })
        } else if (emailType === 'forgot') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: token,
                forgotPasswordExpiry: new Date(Date.now() + 60 * 60 * 1000)
            })
        }

        const transport = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: process.env.MAILER_USERNAME,
                pass: process.env.MAILER_PASSWORD
            }
        })

        const verifyLink = `${process.env.DOMAIN}/verify?token=${token}`
        const resetLink = `${process.env.DOMAIN}/reset?token=${token}`

        const mailOptions = {
            from: 'nW7jE@example.com',
            to: email,
            subject:
                emailType === 'verify'
                    ? 'Verify your email'
                    : 'Reset your password',
            html: emailType === 'verify' ? `Copy this link to verify your email ${verifyLink}` : `Copy this link to reset your password ${resetLink}`
        }

        const mailResponse = await transport.sendMail(mailOptions)

        return mailResponse
    } catch (error: any) {
        throw new Error(error.message)
    }
}
