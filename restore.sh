#!/bin/bash

# Restore the file ./data/db.json with src/data/db.json
echo "Restoring ./data/db.json with src/data/db.json"
cp src/data/db.json ./data/db.json

echo "Restoration complete: ./data/db.json has been restored with src/data/db.json"