const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/budgets", (req, res) => {
    res.render("budgets", {layout: false});
});

router.get("/services", (req, res) => {
    res.render("services", {layout: false});
});

router.get("/finances", (req, res) => {
    res.render("finances", {layout: false});
});

router.get("/calendar", (req, res) => {
    res.render("calendar", {layout: false});
});

router.get("/dash", (req, res) => {
    res.render("dash", {layout: false});
});

router.get("/stock", (req, res) => {
    res.render("stock", {layout: false});
});

router.get("/products", (req, res) => {
    res.render("products", {layout: false});
});

router.get("/price", (req, res) => {
    res.render("price", {layout: false});
});

router.get("/clients", (req, res) => {
    res.render("clients", {layout: false});
});

router.get("/employees", (req, res) => {
    res.render("employees", {layout: false});
});

router.get("/users", (req, res) => {
    res.render("users", {layout: false});
});

router.get("/unit_categories", (req, res) => {
    res.render("unit_categories", {layout: false});
});

module.exports = router;