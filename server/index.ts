import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { mkdir, appendFile } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function writeAccessLog(payload: unknown, req: express.Request) {
  const logDir = path.resolve(process.cwd(), "access-submissions");
  await mkdir(logDir, { recursive: true });
  await appendFile(
    path.join(logDir, "prototype-access.jsonl"),
    `${JSON.stringify({
      payload,
      receivedAt: new Date().toISOString(),
      ip: req.headers["x-forwarded-for"] ?? req.socket.remoteAddress ?? "unknown",
    })}\n`,
    "utf8",
  );
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "64kb" }));

  app.post(["/api/access-log", "/SPRK_Prototype/api/access-log"], async (req, res) => {
    try {
      await writeAccessLog(req.body, req);
      res.status(200).json({ ok: true });
    } catch (error) {
      console.error("Failed to write prototype access log", error);
      res.status(500).json({ ok: false });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use("/SPRK_Prototype", express.static(staticPath));
  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
