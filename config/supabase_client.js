// require("dotenv").config();

const {createClient} = require("@supabase/supabase-js");

const supabaseUrl = process.env.CHAVE_URL;
const supabaseKey = process.env.CHAVE_API;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;