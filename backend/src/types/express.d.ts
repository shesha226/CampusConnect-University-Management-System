import type { AuthPayload } from "../middleware/auth";

declare global {
  namespace Express {
    interface Locals {
      auth?: AuthPayload;
      validated?: unknown;
    }
  }
}

export {};