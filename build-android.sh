#!/bin/bash
# Script para automatizar build y despliegue en Android
npm run build && npx cap copy android && npx cap open android
