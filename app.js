const express = require("express");
const app = express();
const path = require("path");
const hbs = require("express-handlebars");
const router = require("./routes/routes");
const auth = require("./routes/auth");
const cookieParser = require("cookie-parser");
const protegerRota = require("./middleware/auth_middleware");
const { verificarLogin } = require("./middleware/auth_middleware");
require("dotenv").config();
const port = process.env.PORT;


app.engine("hbs", hbs.engine({extname: ".hbs"}));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", auth);
// app.use("/", protegerRota, router);
app.use("/", verificarLogin, router);
app.use("/", router);

app.listen(port, function(req, res){
    console.log(`Server running in: http://localhost:${port}`);
})