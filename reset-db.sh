#!/bin/bash

echo "🔄 Reiniciando la base de datos y recreando contenedores..."

# Detener contenedores y eliminar volúmenes (limpia la base de datos)
docker-compose down -v

# Levantar todo de nuevo, forzando la construcción
docker-compose up --build -d

echo "✅ Sistema reiniciado. Los seeders se están ejecutando en el backend."
echo "📺 Puedes ver el progreso con: docker logs -f gopass_backend"
