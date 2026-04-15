// middlewares/authMiddleware.js
const supabase = require("../config/supabase_client");

const protegerRota = async (req, res, next) => {
    const token = req.cookies["sb-access-token"]; // Vamos salvar o token com esse nome

    if (!token) {
        return res.redirect("/login");
    }

    // Verifica se o token ainda é válido no Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        return res.redirect("/login");
    }

    // Se estiver tudo ok, salva o usuário na requisição e segue em frente
    req.user = user;
    next();
};

const verificarLogin = (req, res, next) => {
    if (req.cookies.logado === "sim") {
        next(); // Está logado, pode passar
    } else {
        res.redirect("/login"); // Não está logado, volta pro login
    }
};

module.exports = {
    protegerRota,
    verificarLogin,
};