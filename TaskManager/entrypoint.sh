#!/bin/bash

# Print the current working directory
echo "Current working directory: $(pwd)"

# Define the file path
pid_file="/app/tmp/pids/server.pid"

# Check if the file exists before removing it
if [ -e "$pid_file" ]; then
    echo "Removing existing PID file: $pid_file"
    rm "$pid_file"
    
    # Print debug information
    if [ -e "$pid_file" ]; then
        echo "Failed to remove PID file: $pid_file"
        exit 1
    else
        echo "PID file removed successfully"
    fi
fi

# Ensure the database is created and migrate
rails db:create db:migrate

echo "PostgreSQL is up - executing command"
# Execute the CMD from the Dockerfile
rails server -b 0.0.0.0 -p 3000
