import { NextApiRequest, NextApiResponse } from "next";
import widthHandler, { ResponseType } from "@libs/server/widthHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
  });
  if (!foundToken) return res.status(404).end();
  req.session.user = {
    id: foundToken?.userId,
  };
  await req.session.save();
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });
  res.json({ ok: true });
}

export default withApiSession(
  widthHandler({ method: "POST", handler, isPrivate: false })
);
