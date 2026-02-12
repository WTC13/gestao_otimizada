from flask import Flask, request, jsonify
from supabase import create_client, Client
from werkzeug.security import check_password_hash, generate_password_hash
from flask import Flask, request, jsonify
from flask_cors import CORS # Adicione isso

app = Flask(__name__)
CORS(app)

SUPABASE_URL = "https://amqkryyzvcrnejyyuwcr.supabase.co"
SUPABASE_KEY = "sb_publishable_IqqaDoPDk9dCEG-BkwQADA_Mz7Dfr4g" # Use a service_role para buscar usuários
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route('/api/login', methods=['POST'])
def login():
    dados = request.json
    email = dados.get('email')
    senha_enviada = dados.get('password')

    if not email or not senha_enviada:
        return jsonify({"error": "E-mail e senha são obrigatórios"}), 400

    try:
        # 1. Busca o usuário no Supabase pelo e-mail
        # Também trazemos o enterprise_id e as permissions que definimos no JSONB
        query = supabase.table("users").select("*, enterprise(status)").eq("email", email).single().execute()
        user = query.data

        if not user:
            return jsonify({"error": "Usuário não encontrado"}), 401

        # 2. Verifica se a empresa dele está ativa (Regra de negócio SaaS)
        if user.get('enterprise', {}).get('status') != 'active':
            return jsonify({"error": "Assinatura da empresa suspensa ou inativa"}), 403

        # 3. Verifica a senha (usando o hash seguro)
        # Nota: No cadastro, você deve usar generate_password_hash(senha)
        if check_password_hash(user['password_hash'], senha_enviada):
            
            # Montamos o objeto de resposta com o que o Front-end precisa
            user_data = {
                "id": user['id'],
                "name": user['full_name'],
                "email": user['email'],
                "enterprise_id": user['enterprise_id']
            }
            
            return jsonify({
                "message": "Login realizado com sucesso",
                "user": user_data
            }), 200
        else:
            return jsonify({"error": "Senha incorreta"}), 401

    except Exception as e:
        print(f"Erro no login: {e}")
        return jsonify({"error": "Erro interno no servidor"}), 500

if __name__ == '__main__':
    app.run(debug=True)