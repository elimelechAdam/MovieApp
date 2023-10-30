require("./config/db");
const express = require("express");
const app = express();
const cors = require("cors");
const usersRouter = require("./routers/usersRouter");
const loginRouter = require("./routers/loginRouter");
const moviesRouter = require("./routers/moviesRouter");
const membersRouter = require("./routers/memberRouter");
const subsRouter = require("./routers/subsRouter");

app.use(cors());
app.use(express.json());

app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/movies", moviesRouter);
app.use("/members", membersRouter);
app.use("/subs", subsRouter);

app.listen(9000, () => {
  console.log("Connected to port 9000");
});
