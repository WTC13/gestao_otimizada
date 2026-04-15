router.get("/logout", (req, res) => {
    res.clearCookie("sb-access-token");
    res.redirect("/login");
});

module.exports = router;