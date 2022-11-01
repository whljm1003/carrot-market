import { NextApiRequest, NextApiResponse } from "next";

async function handle(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
  } = req;
  // const stream = await client.stream;
}
