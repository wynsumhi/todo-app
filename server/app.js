const express = require("express");
const app = express();
const PORT = 8080;
const todoRouter = require("./routes/todo"); // todo에 연결을 해서 app.js에서 사용

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 기본주소 : localhost:PORT/
app.use("/", todoRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
