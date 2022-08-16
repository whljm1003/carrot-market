import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import widthHandler from "@libs/server/widthHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  res.status(200).end();
}

export default widthHandler("POST", handler);
