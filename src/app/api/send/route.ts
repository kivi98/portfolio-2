import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import ContactEmail from '@/components/emails/ContactEmail';
import { contactFormSchema } from '@/lib/schemas';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate the request body
        const result = contactFormSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: result.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { name, email, subject, message } = result.data;

        const data = await resend.emails.send({
            from: 'Portfolio Contact kiviamarakoon.me', // Change this to your verified domain
            to: ['kiviamarakoon@gmail.com'], // Sending to your personal email
            reply_to: email,
            subject: `Portfolio Contact: ${subject}`,
            react: ContactEmail({ name, email, subject, message }),
        });

        if (data.error) {
            return NextResponse.json({ error: data.error }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
