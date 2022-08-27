import { NextApiRequest, NextApiResponse } from "next";
import widthHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;

  // produtctId 와 userId 체크
  const alreadyExists = await client.fav.findFirst({
    where: {
      produtctId: Number(id),
      userId: user?.id,
    },
  });

  if (alreadyExists) {
    // delete
    await client.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    // create
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
  }

  res.json({ ok: true });
}

export default withApiSession(
  widthHandler({
    methods: ["POST"],
    handler,
  })
);
