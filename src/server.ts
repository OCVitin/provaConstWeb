import express from "express";
import UserRouter from "./routes/UserRoutes";

const port = 3000;

const app = express();
app.use(express.json());

app.use(UserRouter);

app.listen(port, function () {
  console.log("Servidor rodando na porta " + port);
});