import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load env
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/auth", authRouter);

app.get("/", (_req, res) => {
  res.send("School Management API (TypeScript) ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
