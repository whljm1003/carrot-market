import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  res.json({
    ok: true,
    // CF에서 받은 빈 URL
    url: "",
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
