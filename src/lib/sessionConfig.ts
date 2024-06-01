import { SessionOptions } from "iron-session";

export interface SessionData {
  consent?: boolean;
}

export const defaultSession: SessionData = {
  consent: false,
};
export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "privacy-consent",
  cookieOptions: {
    secure: false,
  },
};
