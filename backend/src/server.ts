
import "dotenv/config";
import app from "./app";
import { connectToDatabase } from "./config/database";

const PORT = Number(process.env.PORT) || 5000;

async function startServer(): Promise<void> {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`CampusConnect API: http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error("Failed to start CampusConnect backend:", error);
    process.exit(1);
  }
}

void startServer();
