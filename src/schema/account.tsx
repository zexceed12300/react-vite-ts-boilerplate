import { z } from "zod";

export const accountSchema = z.object({
  server_id: z.number(),
  username: z.string().min(1, "Username tidak boleh kosong"),
  status: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]).default(1),
  quota_used: z.number().nullish(),
  quota: z.number().nullish(),
  expired_at: z.date().nullish(),
});

export type Account = z.infer<typeof accountSchema>;
