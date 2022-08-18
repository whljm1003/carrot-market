import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import widthHandler, { ResponseType } from "@libs/server/widthHandler";
import client from "@libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
  });
  if (!exists) res.status(404).end();
  console.log(exists);
  req.session.user = {
    id: exists?.userId,
  };
  await req.session.save();
  res.status(200).end();
  return res.status(200).end();
}

export default withIronSessionApiRoute(widthHandler("POST", handler), {
  cookieName: "carrotsession",
  password: "123213182975239872983sdkjnfksdjfhksdjy1398247skjskjhdfkjh",
});
