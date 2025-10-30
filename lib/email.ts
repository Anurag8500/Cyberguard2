import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function sendPasswordResetEmail(
  email: string,
  otp: string
): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Password Reset - CyberGuard Academy',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #b537f2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .otp { font-size: 32px; font-weight: bold; color: #2563eb; text-align: center; padding: 20px; background: white; border-radius: 8px; margin: 20px 0; letter-spacing: 5px; }
            .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🛡️ CyberGuard Academy</h1>
              <p>Password Reset Request</p>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>We received a request to reset your password. Use the following One-Time Password (OTP) to complete the process:</p>
              
              <div class="otp">${otp}</div>
              
              <div class="warning">
                <strong>⚠️ Security Notice:</strong>
                <ul>
                  <li>This OTP is valid for 15 minutes only</li>
                  <li>Never share this code with anyone</li>
                  <li>CyberGuard will never ask for your OTP via email or phone</li>
                </ul>
              </div>
              
              <p>If you didn't request this password reset, please ignore this email and ensure your account is secure.</p>
              
              <p>Stay safe online!<br>The CyberGuard Academy Team</p>
            </div>
            <div class="footer">
              <p>This is an automated message, please do not reply to this email.</p>
              <p>&copy; ${new Date().getFullYear()} CyberGuard Academy. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })
    return true
  } catch (error) {
    console.error('Email send error:', error)
    return false
  }
}

export async function sendVerificationEmail(
  email: string,
  verificationLink: string
): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Verify Your Email - CyberGuard Academy',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #b537f2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 15px 30px; background: #2563eb; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🛡️ Welcome to CyberGuard Academy!</h1>
            </div>
            <div class="content">
              <p>Thank you for signing up! We're excited to have you join our cybersecurity learning community.</p>
              
              <p>To get started, please verify your email address by clicking the button below:</p>
              
              <div style="text-align: center;">
                <a href="${verificationLink}" class="button">Verify Email Address</a>
              </div>
              
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #2563eb;">${verificationLink}</p>
              
              <p>Once verified, you'll be able to:</p>
              <ul>
                <li>Access interactive learning modules</li>
                <li>Earn badges and achievements</li>
                <li>Track your progress</li>
                <li>Join our community</li>
              </ul>
              
              <p>Let's make the internet safer together!</p>
              
              <p>Best regards,<br>The CyberGuard Academy Team</p>
            </div>
            <div class="footer">
              <p>If you didn't create an account, you can safely ignore this email.</p>
              <p>&copy; ${new Date().getFullYear()} CyberGuard Academy. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })
    return true
  } catch (error) {
    console.error('Email send error:', error)
    return false
  }
}
