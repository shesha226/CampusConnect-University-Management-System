import type { CorsOptions } from "cors";
import { env } from "./environment";

const corsOptions: CorsOptions = {
    origin: env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsOptions;