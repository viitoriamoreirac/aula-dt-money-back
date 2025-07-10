#!/bin/bash

echo "Testando a API de Transações"
echo "================================"

BASE_URL="http://localhost:3333"

echo ""
echo "1. Criando uma transação..."
CREATE_RESPONSE=$(curl -s -X POST "$BASE_URL/transaction" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Teste de Transação",
    "category": "Alimentação",
    "data": "2024-01-01T00:00:00.000Z",
    "price": 50.00,
    "type": "OUTCOME"
  }')

echo "Resposta: $CREATE_RESPONSE"
TRANSACTION_ID=$(echo $CREATE_RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

echo ""
echo "2. Listando transações (paginação)..."
curl -s -X GET "$BASE_URL/transaction?skip=0&take=5" | jq '.transactions | length'
echo "Total de transações:"
curl -s -X GET "$BASE_URL/transaction?skip=0&take=5" | jq '.totalCount'

echo ""
echo "3. Buscando transação específica..."
curl -s -X GET "$BASE_URL/transaction/$TRANSACTION_ID" | jq '.'

echo ""
echo "4. Atualizando transação..."
curl -s -X PATCH "$BASE_URL/transaction/$TRANSACTION_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Transação Atualizada",
    "price": 75.00
  }' | jq '.'

echo ""
echo "5. Listando novamente para ver a atualização..."
curl -s -X GET "$BASE_URL/transaction?skip=0&take=5" | jq '.transactions'

echo ""
echo "6. Excluindo transação..."
curl -s -X DELETE "$BASE_URL/transaction/$TRANSACTION_ID"

echo ""
echo "7. Verificando se foi excluída..."
curl -s -X GET "$BASE_URL/transaction/$TRANSACTION_ID"

echo ""
echo "Testes concluídos" 