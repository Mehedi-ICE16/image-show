import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./router";
const app: Express = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});