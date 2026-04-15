const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase_client");

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    console.log("Dados recebidos:", req.body);
    const { email, password } = req.body;

    const { data: usuario, error} = await supabase
        .from("usuarios")
        .select("*")
        .eq("email", email)
        .single();

    if(usuario && usuario.senha === password){
        res.cookie("logado", "sim");
        return res.redirect("/");
    }
    else{
        return res.render("login", { 
            layout: "main", 
            error: "E-mail ou senha incorretos." 
        });
    }
});

module.exports = router;