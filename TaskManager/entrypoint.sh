#!/bin/bash
# Ensure the database is created and migrate
rails db:create db:migrate

echo "PostgreSQL is up - executing command"
# Execute the CMD from the Dockerfile
rails server -b 0.0.0.0 -p 3000
