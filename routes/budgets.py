from flask import Blueprint, request, jsonify
from database.database import supabase

# Criamos o Blueprint
budgets_bp = Blueprint('budgets', __name__)

@budgets_bp.route('/api/budgets', methods=['POST'])
def criar_orcamento():
    dados = request.json
    
    try:
        # 1. Inserir o Orçamento principal
        res = supabase.table("budgets").insert({
            "enterprise_id": dados['enterprise_id'],
            "client_id": dados['client_id'],
            "user_id": dados['user_id'],
            "total_value": dados['total_value'],
            "valid_until": dados['valid_until']
        }).execute()
        
        if not res.data:
            raise Exception("Erro ao criar cabeçalho do orçamento")

        budget_id = res.data[0]['id']

        # 2. Inserir os itens apenas se o array não estiver vazio
        if dados.get('itens') and len(dados['itens']) > 0:
            itens_para_inserir = []
            for item in dados['itens']:
                itens_para_inserir.append({
                    "enterprise_id": dados['enterprise_id'],
                    "budget_id": budget_id,
                    "product_id": item['id'],
                    "quantity": item['qtd'],
                    "unit_price": item['preco']
                })
            
            supabase.table("document_items").insert(itens_para_inserir).execute()

        return jsonify({"message": "Sucesso!", "id": budget_id}), 201
    except Exception as e:
        print(f"Erro no servidor: {str(e)}") # Log para você ver no terminal
        return jsonify({"error": str(e)}), 500