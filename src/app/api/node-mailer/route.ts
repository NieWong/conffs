import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { to, subject, text } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'st.sukhe@gmail.com',
      pass: 'qmsrxhzzjwyrnayv', 
    },
  });

  try {
    await transporter.sendMail({
      from: '"Proposal App" <st.sukhe@gmail.com>',
      to,
      subject,
      text,
    });

    return NextResponse.json({ message: 'Email sent!' });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
