import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
from werkzeug.security import check_password_hash
from routes.budgets import budgets_bp

# Carregar variáveis de ambiente
load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "chave-padrao-segura")
CORS(app)

app.register_blueprint(budgets_bp)

# Configurações do Supabase
SUPABASE_URL = os.environ.get("CHAVE_URL")
SUPABASE_KEY = os.environ.get("CHAVE_API")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route('/api/login', methods=['POST'])
def login():
    dados = request.json
    email = dados.get('email')
    senha_enviada = dados.get('password')

    if not email or not senha_enviada:
        return jsonify({"error": "E-mail e senha são obrigatórios"}), 400

    try:
        # 1. Busca o usuário no Supabase
        query = supabase.table("users").select("*, enterprise(status)").eq("email", email).single().execute()
        user = query.data

        if not user:
            return jsonify({"error": "Usuário não encontrado"}), 401

        # 2. Verifica se a empresa está ativa
        if user.get('enterprise', {}).get('status') != 'active':
            return jsonify({"error": "Assinatura da empresa suspensa ou inativa"}), 403

        # 3. Verifica a senha
        if check_password_hash(user['password_hash'], senha_enviada):
            user_data = {
                "id": user['id'],
                "name": user['full_name'],
                "email": user['email'],
                "enterprise_id": user['enterprise_id']
            }
            
            return jsonify({
                "message": "Login realizado com sucesso!",
                "user": user_data
            }), 200
        else:
            return jsonify({"error": "Senha incorreta"}), 401

    except Exception as e:
        print(f"Erro no login: {e}")
        return jsonify({"error": "Erro interno no servidor"}), 500

if __name__ == '__main__':
    app.run(debug=True)