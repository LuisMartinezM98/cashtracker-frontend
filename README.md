# 📊 CashTrackr

A sleek, minimalist, and highly efficient budget management application designed to give you absolute control over your finances in real-time.

[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://cashtracker-frontend-mauve.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## 🎯 El Corazón del Proyecto

**CashTrackr** resuelve el problema clásico de la pérdida de control financiero diario. Te permite asignar un presupuesto inicial específico para cualquier categoría o meta de gasto, e ir registrando tus consumos sobre la marcha. 

A través de una interfaz limpia y libre de distracciones, la aplicación calcula instantáneamente el saldo restante y proyecta tus hábitos financieros de forma visual para que tomes decisiones informadas al momento.

---

## ✨ Características Principales

* **📊 Dashboard Interactivo en Tiempo Real:** Visualiza la distribución de tus gastos y el estado de tu presupuesto mediante gráficos dinámicos que se actualizan de inmediato.
* **⚙️ CRUD Completo de Gastos:** Control total para ingresar, editar, actualizar y eliminar cualquier registro de gasto o presupuesto de manera fluida.
* **🔒 Autenticación Segura (JWT):** Resguardo de sesiones y endpoints utilizando JSON Web Tokens para garantizar la privacidad de tus datos financieros.
* **🛡️ Validaciones Robustas con Zod:** Integridad de datos impecable tanto en el cliente como en el servidor gracias al tipado estricto de esquemas.
* **📱 Diseño 100% Responsivo:** Una experiencia de usuario móvil nativa creada con Tailwind CSS, optimizada para gestionar tus finanzas desde cualquier dispositivo.

---

## 🛠️ Stack Tecnológico

El proyecto está construido bajo una arquitectura moderna desacoplada, utilizando tecnologías robustas y de alto rendimiento:

### Frontend
* **Next.js** – Renderizado optimizado y enrutamiento basado en archivos.
* **TypeScript** – Código seguro, autodocumentado y libre de errores en tiempo de ejecución.
* **Tailwind CSS** – Diseño visual responsivo y sistema de diseño minimalista.
* **Zod** – Validación estricta de formularios y payloads.

### Backend & Base de Datos
* **Node.js** – Entorno de ejecución rápido y escalable.
* **Sequelize** – ORM robusto para el mapeo y consulta de datos.
* **PostgreSQL** – Base de datos relacional potente para un almacenamiento estructurado y seguro.
* **JWT (JSON Web Tokens)** – Estrategia stateless para el manejo y protección de sesiones.

---

## 🚀 Instalación y Configuración Local

Sigue estos pasos para clonar y ejecutar el proyecto en tu entorno local:

### Requisitos Previos
Asegúrate de tener instalado **Node.js** y el gestor de paquetes **pnpm**.

### 1. Clonar el repositorio
```bash
git clone [https://github.com/tu-usuario/cashtrackr.git](https://github.com/tu-usuario/cashtrackr.git)
cd cashtrackr
```
### 2. Instalar dependencias
```bash
pnpm install
```
### 3. Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto basándote en la siguiente estructura:
# URL de la API del Backend
NEXT_PUBLIC_API_URL=http://localhost:4000/api

# URL base del Frontend
NEXT_PUBLIC_URL=http://localhost:3000

### 4. Inicia el servidor de desarrollo
```bash
pnpm run dev
```
Abre http://localhost:3000 en tu navegador para ver la aplicación en acción.

### Estructura del proyecto

```text
├── src/
│   ├── app/            # App Router (Páginas y rutas principales)
│   ├── auth/           # funciones de autenticacion como dal y token.
│   ├── components/     # Componentes de UI reutilizables
│   ├── i18n/           # Traduccion de páginas
│   ├── schemas/        # Validaciones de Zod (Login, Registro, Gastos)
│   ├── services/       # Clientes de API y peticiones HTTP
│   └── utils/          # funciones de apoyo para formatear cantidades
