import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface Subscriber {
  email: string;
  subscribedAt: string;
  ipHash: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const SUBSCRIBERS_PATH = path.join(DATA_DIR, "subscribers.json");

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getSubscribers(): Subscriber[] {
  try {
    const data = fs.readFileSync(SUBSCRIBERS_PATH, "utf-8");
    return JSON.parse(data) as Subscriber[];
  } catch {
    return [];
  }
}

export function isAlreadySubscribed(email: string): boolean {
  const subscribers = getSubscribers();
  const normalizedEmail = email.toLowerCase().trim();
  return subscribers.some((s) => s.email === normalizedEmail);
}

export function addSubscriber(
  email: string,
  ipHash: string
): { success: boolean; message: string } {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    const subscribers = getSubscribers();

    if (subscribers.some((s) => s.email === normalizedEmail)) {
      return { success: true, message: "You're already subscribed!" };
    }

    const newSubscriber: Subscriber = {
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
      ipHash,
    };

    subscribers.push(newSubscriber);

    // Ensure data directory exists before writing
    ensureDataDir();

    // Write atomically via temp file + rename
    const tmpPath = SUBSCRIBERS_PATH + ".tmp";
    fs.writeFileSync(tmpPath, JSON.stringify(subscribers, null, 2) + "\n", "utf-8");
    fs.renameSync(tmpPath, SUBSCRIBERS_PATH);

    return { success: true, message: "Thanks for subscribing!" };
  } catch {
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

export function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
}
