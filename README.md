# BatoiBooks — Unai Martinez Pinteño

Aplicación web para vender libros de texto y apuntes entre estudiantes del CIP FP Batoi.

Proyecto desarrollado para el módulo de **Desarrollo Web en Entorno Cliente (DWEC)** con **Vite + JavaScript Vanilla** y **Vitest**.

## 📋 Descripción

En esta práctica (`4-ajax`) hemos conectado la aplicación a un servidor backend (json-server). Los datos ya no se guardan en un fichero local, sino que se solicitan mediante peticiones HTTP asíncronas (`fetch`).

## 🚀 Cómo arrancar

### 1. Arrancar el servidor simulado (json-server)
Abre una terminal y ejecuta:
```bash
cd ~/Escritorio/2DAW/DWEC/batoibooks-server
npx json-server --watch batoibooks.json --port 3000