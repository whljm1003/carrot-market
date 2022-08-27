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
  const product = await client.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word, // name을 공백 단위로 구분해서 해당 단어가 있는 지 확인.
    },
  }));
  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        // 현재 제품은 제외
        id: {
          not: product?.id,
        },
      },
    },
    take: 4, // UI를 생각해 최대 4개까지만 출력
  });
  const isLiked = Boolean(
    await client.fav.findFirst({
      where: {
        produtctId: product?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  res.json({ ok: true, product, isLiked, relatedProducts });
}

export default withApiSession(
  widthHandler({
    methods: ["GET"],
    handler,
  })
);
