import { z } from "zod";
import { accountSchema } from "./account";

export const sshSchema = z.object({
  password: z.string().min(1, "Password tidak boleh kosong"),
  account: accountSchema,
});

export type Ssh = z.infer<typeof sshSchema>;
