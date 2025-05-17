#!/bin/bash

# Script para corrigir problemas com o lockfile do PNPM
echo "Corrigindo problemas com o lockfile do PNPM..."

# Remover node_modules e cache
rm -rf node_modules
rm -rf .pnpm-store

# Remover o lockfile existente
rm -f pnpm-lock.yaml

# Reinstalar as dependências com as configurações corretas
pnpm install --no-frozen-lockfile

echo "Lockfile corrigido com sucesso!"
