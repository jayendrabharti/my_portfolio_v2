import { getPayload, Payload } from "payload";
import config from "@/payload.config";

let cachedPayload: Payload | null = null;

export const getPayloadInstance = async (): Promise<Payload> => {
  if (cachedPayload) {
    return cachedPayload;
  }

  cachedPayload = await getPayload({ config });
  return cachedPayload;
};

export default getPayloadInstance;
