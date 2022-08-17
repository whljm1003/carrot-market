import mail from "@sendgrid/mail";
import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import widthHandler, { ResponseType } from "@libs/server/widthHandler";

mail.setApiKey(process.env.SENDGRID_KEY!);
const twilioClinet = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });

  if (phone) {
    const message = await twilioClinet.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      //이론적으론 req.body.phone을 적어야 하지만, 테스트용이기에 나의 폰번호를 적음
      to: process.env.MY_PHONE!,
      body: `Your login token is ${payload}`,
    });
    console.log(message);
  } else if (email) {
    const email = await mail.send({
      from: "jungmin@codingtest.co.kr",
      to: "whljm1003@gmail.com",
      subject: "Your Carrot Market Verification Email",
      text: `Your token is ${payload}`,
      html: `<strong>Your token is ${payload}</strong>`,
    });
    console.log(email);
  }
  return res.json({
    ok: true,
  });
}

export default widthHandler("POST", handler);
