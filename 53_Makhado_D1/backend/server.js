import express from "express";
import path from "path";
// CREATE APP
const app = express();

app.use(express.json());
app.use(express.static("./frontend/public"));

app.post("/signup/validate", (req, res) => {
  res.json({
    success: true,

    user: { email: req.body.email },
  });
});

app.post("/signin/validate", (req, res) => {
  res.json({
    success: true,
    session: "1234",
  });
});

app.use((req, res) => {
  res.sendFile("index.html", { root: "frontend/public" });
});

app.listen(3000, () => {
  console.log("Listening on localhost:3000");
});
