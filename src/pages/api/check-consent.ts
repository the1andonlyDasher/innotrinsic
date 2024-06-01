import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { SessionData, sessionOptions } from "../../lib/sessionConfig";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    const consent = session?.consent ?? false;
    res.status(200).json({ consent });
  } catch (error) {
    console.error("Error checking consent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
