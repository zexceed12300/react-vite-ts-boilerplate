import { z } from "zod";
import { accountSchema } from "./account";

export const xraySchema = z.object({
  uuid: z.string().nullish(),
  vmess: z.union([z.literal(0), z.literal(1)]).default(0),
  vless: z.union([z.literal(0), z.literal(1)]).default(0),
  trojan: z.union([z.literal(0), z.literal(1)]).default(0),
  account: accountSchema,
});

export type Xray = z.infer<typeof xraySchema>;
