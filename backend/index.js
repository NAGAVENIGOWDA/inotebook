const connectToMongo = require("./db");
const express = require("express");
const cors=require('cors')

connectToMongo();
const app = express();
app.use(cors());
const port = 5000;

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`inotebook listening on port ${port}`);
});
