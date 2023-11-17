import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

const sendMail = (res: NextApiResponse, req: NextApiRequest) => {
  const  { to, from, subject, htmlString } = req.body

  const msg = {
    to,
    from,
    subject,
    html: htmlString
  };
  sgMail
    .send(msg)
    .then(() => {
      res.send({ message: 'Email sent sucessfully', status: 200 });
    })
    .catch((error) => {
      console.error(error);
      res.send({ message: 'Failed to send' });
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

  await sendMail(res, req);

  res.status(200);


}
