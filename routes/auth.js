const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase_client");

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const { data: usuario, error } = await supabase
        .from("usuarios")
        .select("*")
        .ilike("email", email.trim())
        .single();

    console.log("Usuário encontrado no banco:", usuario);

    if (usuario && usuario.password === password) {
        console.log("LOGIN COM SUCESSO!");
        res.cookie("logado", "sim", { httpOnly: true });
        return res.redirect("/");
    } else {
        console.log("FALHA NO LOGIN: Senha não bate ou usuário nulo");
        return res.render("login", { 
            layout: "main", 
            error: "E-mail ou senha incorretos." 
        });
    }
});

module.exports = router;