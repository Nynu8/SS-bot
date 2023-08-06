import { CredentialBody } from "google-auth-library";
import { z } from "zod";

export const CredentialSchema = z.string().transform<CredentialBody>((str, ctx) => {
  try {
    return JSON.parse(str);
  } catch (err) {
    ctx.addIssue({ code: "custom", message: "Invalid credentials JSON" });
    return z.NEVER;
  }
});
