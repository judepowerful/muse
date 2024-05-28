#!/bin/bash

# Define installation directory
INSTALL_DIR="$HOME/bin"

# Create installation directory if it doesn't exist
mkdir -p "$INSTALL_DIR" || { echo "Error: Failed to create directory $INSTALL_DIR"; exit 1; }

# Change to installation directory
cd "$INSTALL_DIR" || { echo "Error: Failed to change directory to $INSTALL_DIR"; exit 1; }

# Download yt-dlp
echo "Downloading yt-dlp..."
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o yt-dlp || { echo "Error: Failed to download yt-dlp"; exit 1; }

# Make yt-dlp executable
chmod +x yt-dlp || { echo "Error: Failed to make yt-dlp executable"; exit 1; }

# Add yt-dlp directory to PATH
echo "export PATH=\"$INSTALL_DIR:\$PATH\"" >> "$HOME/.bashrc"
source "$HOME/.bashrc" || source "$HOME/.bash_profile" || source "$HOME/.profile"

# Test yt-dlp
echo "Testing yt-dlp..."
yt-dlp --version || { echo "Error: Failed to execute yt-dlp"; exit 1; }

echo "yt-dlp installed successfully in $INSTALL_DIR"
