import "reflect-metadata";
import "./src/Utils/injection/DI.container";
import dotenv from "dotenv";
dotenv.config();
import app from "./src/app";
import DatabaseConnect from "./config/db.config";

DatabaseConnect();
const port = process.env.LIVE_URL ??  process.env.PORT;

app.listen(port, () => {
   console.log(`server listening at port:${port}`);
});
