import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // v2로 바꿔서 내용 바꿔야 할지도 모름.
  // 현재 유료 결제 안해서 토큰 값 없음.
  // -H "X-Auth-Email: user@example.com" \
  // -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41" \
  // -H "Content-Type: multipart/form-data" \
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
      }
    )
  ).json();

  console.log("file response==>", response);
  res.json({
    ok: true,
    ...response.result,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
