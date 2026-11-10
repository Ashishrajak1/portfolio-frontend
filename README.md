# Ashish Kumar Rajak — Portfolio

A responsive React, Vite, and Tailwind CSS v4 portfolio.

## Development

Install dependencies with `npm install`, then start the development server with
`npm run dev`. Run `npm run lint` and `npm run build` before deployment.

## Contact form email setup

The contact form sends messages through EmailJS. To configure it:

1. Create an account at [EmailJS](https://www.emailjs.com/) and add an email
   service connected to the inbox that should receive messages. Connect the
   mailbox using EmailJS's provider authorization flow; do not use or store your
   email account password in this project.
2. Create an EmailJS email template with these template variables:
   `to_email`, `user_name`, `user_email`, `subject`, `message`, and `reply_to`.
   Set the template's **To Email** to `{{to_email}}` and its **Reply To** to
   `{{reply_to}}`.
3. Copy `.env.example` to `.env.local` and fill in the EmailJS **Service ID**,
   **Template ID**, and **Public Key** from the EmailJS dashboard. Set
   `VITE_CONTACT_EMAIL` to the recipient inbox.
4. Add the same variables to your deployment platform and rebuild/redeploy.
   Restart the local Vite server after changing environment variables.
5. Restrict allowed origins in the EmailJS dashboard to your deployed domain
   and localhost during development, then send a test from the contact form.

The EmailJS public key is intended for browser use and is visible in the
compiled site; never place an email password, private key, or other secret in a
`VITE_` variable. EmailJS credentials are required before the form can send.
