import cors from "cors";
import express from "express";

import routes from "./routes";
import { initDB } from "./sequelize";

const app = express();

app.use(cors());

app.set("port", process.env.PORT || 3000);
app.set("views", "./views");
app.set("view engine", "ejs");

app.locals["assets_url"] = process.env.VITE_URL || "http://localhost:3001";

app.get("/", (_req, res) => {
  res.render("index.html.ejs");
});

app.use(express.json());

app.use("/api", routes);

app.listen(app.get("port"), async () => {
  await initDB();
  console.log("  App is running at http://localhost:%d", app.get("port"));
  console.log("  Press CTRL-C to stop\n");
});
