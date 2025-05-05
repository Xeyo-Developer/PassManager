import { config } from "dotenv";
import { type DesktopAppModesType } from "./types/EnvironmentVariablesTypes";

config();

const DESKTOP_APP_MODE: DesktopAppModesType = (process.env.DESKTOP_APP_MODE || "development") as DesktopAppModesType;
const DESKTOP_HASHING_SECRET_KEY: string = process.env.DESKTOP_HASHING_SECRET_KEY as string;

export { DESKTOP_APP_MODE, DESKTOP_HASHING_SECRET_KEY };