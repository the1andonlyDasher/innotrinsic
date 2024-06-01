import { SessionData, sessionOptions } from "@/lib/sessionConfig";
import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    // Check if the session exists
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { consent } = req.body;
    session.consent = consent;
    await session.save();
    res.status(200).json({ message: "Consent set successfully" });
  } catch (error) {
    console.error("Error setting consent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
