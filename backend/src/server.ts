import app from "./app";
import connectDatabase from "./config/database";
import { env } from "./config/environment";

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(env.PORT, () => {
      console.log(
        `CampusConnect API running on http://localhost:${env.PORT}`
      );
      console.log(`Environment: ${env.NODE_ENV}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

void startServer();