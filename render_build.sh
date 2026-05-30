#!/usr/bin/env bash
# exit on error
set -o errexit

cd frontend

npm install
npm run build

cd .. 

pip install -r requirements.txt
