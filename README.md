# 📊 CashTrackr

Aplicación web moderna para la administración de presupuestos y control de gastos personales. Diseñada con un enfoque **mobile-first**, ofrece una experiencia fluida para gestionar tus finanzas en tiempo real desde cualquier dispositivo.

[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://cashtracker-frontend-mauve.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## 🎯 Propósito

**CashTrackr** resuelve el problema clásico de la pérdida de control financiero diario. Te permite asignar un presupuesto inicial a cualquier categoría de gasto e ir registrando tus consumos sobre la marcha. La aplicación calcula al instante el saldo restante y proyecta visualmente tus hábitos financieros para que tomes decisiones informadas al momento.

---

## ✨ Características

- **📊 Dashboard en Tiempo Real** — Visualiza la distribución de tus gastos y el estado de tu presupuesto con gráficos dinámicos de progreso circular.
- **⚙️ CRUD Completo** — Control total para crear, editar, visualizar y eliminar presupuestos y gastos de manera fluida.
- **🔐 Autenticación Segura (JWT)** — Sesiones protegidas con JSON Web Tokens almacenados en cookies HTTP.
- **📧 Flujo de Recuperación Completo** — Registro, confirmación de cuenta por código, recuperación de contraseña y reestablecimiento.
- **🛡️ Validaciones Robustas con Zod** — Esquemas de validación tipados tanto en cliente como en servidor.
- **🌐 Internacionalización (i18n)** — Soporte multiidioma (Español / Inglés) con `next-intl`.
- **📱 Diseño 100% Responsivo** — Interfaz adaptativa con Tailwind CSS y esquema de color morado/ámbar.
- **🔔 Notificaciones Toast** — Feedback visual inmediato con `react-toastify`.

---

## 🛠️ Stack Tecnológico

### Frontend

| Tecnología | Versión | Propósito |
|---|---|---|
| **Next.js** | 16.2.6 | Framework React con App Router y React Compiler |
| **React** | 19.2.4 | Librería de UI con Server Components y Server Actions |
| **TypeScript** | 5.x | Tipado estático y seguridad en tiempo de desarrollo |
| **Tailwind CSS** | 4.x | Estilizado utilitario y diseño responsivo |
| **Zod** | 4.4.3 | Validación de esquemas tanto en cliente como servidor |
| **SWR** | 2.4.1 | Data fetching y caché en el cliente |
| **next-intl** | 4.13.0 | Internacionalización y traducciones |
| **@headlessui/react** | 2.2.10 | Componentes de UI accesibles (Dialog, Menu, Popover, Transition) |
| **@heroicons/react** | 2.2.0 | Iconos SVG |
| **react-circular-progressbar** | 2.2.0 | Gráfico de progreso circular para presupuestos |
| **react-toastify** | 11.1.0 | Notificaciones toast |
| **@chakra-ui/pin-input** | 2.1.0 | Input de código PIN para confirmación |

### Backend (API externa)

El backend es un proyecto independiente que expone una API REST construida con:

- **Node.js** — Entorno de ejecución
- **Sequelize** — ORM para la base de datos
- **PostgreSQL** — Base de datos relacional
- **JWT** — Autenticación stateless

---

## 🗺️ Rutas de la Aplicación

### Públicas

| Ruta | Descripción |
|---|---|
| `/` | Landing page con información del producto |
| `/auth/login` | Inicio de sesión |
| `/auth/register` | Creación de cuenta |
| `/auth/confirm-account` | Confirmación de cuenta mediante código |
| `/auth/forgot-password` | Solicitud de restablecimiento de contraseña |
| `/auth/new-password` | Restablecimiento de contraseña con token |

### Protegidas (requieren autenticación)

| Ruta | Descripción |
|---|---|
| `/admin` | Dashboard con listado de presupuestos |
| `/admin/budgets/new` | Creación de nuevo presupuesto |
| `/admin/budgets/[id]` | Detalle del presupuesto y gestión de gastos |
| `/admin/budgets/[id]/edit` | Edición de presupuesto |
| `/admin/profile/settings` | Actualización de perfil (nombre, email) |
| `/admin/profile/password` | Cambio de contraseña |

### API Route (Next.js)

| Ruta | Método | Propósito |
|---|---|---|
| `/admin/api/budgets/[budgetId]/expenses/[expenseId]` | `GET` | Obtener un gasto por ID (consumido por SWR) |

---

## 🏗️ Estructura del Proyecto

```text
src/
├── actions/                  # Server Actions (mutaciones)
│   ├── autenticate-user-action.ts
│   ├── create-account-action.ts
│   ├── confirm-account-action.ts
│   ├── create-budget-action.ts
│   ├── delete-budget-action.ts
│   ├── edit-budget-action.ts
│   ├── create-expense-action.ts
│   ├── edit-expense-action.ts
│   ├── delete-expense-action.ts
│   ├── forgot-password-action.ts
│   ├── reset-password-user-action.ts
│   ├── validate-token-action.ts
│   ├── update-password-action.ts
│   ├── update-user-info-action.ts
│   └── logout-user-action.ts
│
├── app/                      # App Router
│   ├── admin/                # Sección protegida
│   │   ├── budgets/
│   │   │   ├── [id]/
│   │   │   │   ├── edit/     # Editar presupuesto
│   │   │   │   └── page.tsx  # Detalle del presupuesto
│   │   │   └── new/          # Crear presupuesto
│   │   ├── profile/
│   │   │   ├── password/     # Cambiar contraseña
│   │   │   └── settings/     # Editar perfil
│   │   ├── api/              # API Routes
│   │   ├── layout.tsx
│   │   └── page.tsx          # Dashboard principal
│   ├── auth/                 # Sección de autenticación
│   │   ├── login/
│   │   ├── register/
│   │   ├── confirm-account/
│   │   ├── forgot-password/
│   │   ├── new-password/
│   │   └── layout.tsx
│   ├── layout.tsx            # Layout raíz
│   ├── page.tsx              # Landing page
│   └── globals.css           # Estilos globales + Tailwind
│
├── auth/                     # Utilidades de autenticación
│   ├── dal.ts                # Data Access Layer (verificación de sesión)
│   └── token.ts              # Obtención del token JWT desde cookies
│
├── components/               # Componentes React
│   ├── admin/
│   │   └── AdminMenu.tsx     # Menú de navegación del dashboard
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── ConfirmAccountForm.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   ├── ResetPasswordForm.tsx
│   │   ├── PasswordResetHandler.tsx
│   │   └── ValidateTokenForm.tsx
│   ├── budgets/
│   │   ├── BudgetForm.tsx
│   │   ├── BudgetMenu.tsx
│   │   ├── CreateBudgetForm.tsx
│   │   ├── EditBudgetForm.tsx
│   │   ├── DeleteBudgetModa.tsx
│   │   └── ConfirmPassword.tsx
│   ├── expenses/
│   │   ├── ExpenseForm.tsx
│   │   ├── AddExpenseForm.tsx
│   │   ├── EditExpensesForm.tsx
│   │   ├── DeleteExpenseForm.tsx
│   │   ├── AddExpenesesButton.tsx
│   │   ├── ExpenseMenu.tsx
│   │   └── ProgressBar.tsx
│   ├── profile/
│   │   ├── ProfileForm.tsx
│   │   ├── ChangePasswordForm.tsx
│   │   └── ProfileTabs.tsx
│   └── ui/
│       ├── Logo.tsx
│       ├── Amount.tsx
│       ├── ErrorMessage.tsx
│       ├── SuccessMessage.tsx
│       ├── ModalContainer.tsx
│       └── ToastNotification.tsx
│
├── i18n/                     # Configuración de internacionalización
│   └── request.ts
│
├── messages/                 # Archivos de traducción
│   ├── en.json               # Inglés
│   └── es.json               # Español
│
├── schemas/                  # Esquemas de validación Zod
│   └── index.ts
│
├── services/                 # Servicios de datos del lado servidor
│   └── budgets.ts
│
└── utils/                    # Funciones auxiliares
    └── index.ts              # formatCurrency, formatDate
```

---

## 🚀 Instalación y Configuración Local

### Requisitos Previos

- **Node.js** (v20 o superior)
- **pnpm** (gestor de paquetes)

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/cashtrackr.git
cd cashtrackr
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# URL de la API del Backend
NEXT_PUBLIC_API_URL=http://localhost:4000

# URL base del Frontend
NEXT_PUBLIC_URL=http://localhost:3000
```

### 4. Iniciar el servidor de desarrollo

```bash
pnpm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 5. Scripts disponibles

| Comando | Descripción |
|---|---|
| `pnpm run dev` | Inicia servidor de desarrollo |
| `pnpm run build` | Construye la aplicación para producción |
| `pnpm run start` | Inicia servidor de producción |
| `pnpm run lint` | Ejecuta el linter ESLint |

---

## 🔐 Flujo de Autenticación

1. **Registro** — El usuario crea una cuenta con nombre, email y contraseña
2. **Confirmación** — Recibe un código de 6 dígitos por email para confirmar la cuenta
3. **Inicio de sesión** — Autenticación con email y contraseña, se genera un JWT
4. **Sesión** — El token se almacena en una cookie (`CASHTRACKR_TOKEN`) y se verifica en cada request protegido
5. **Recuperación** — Flujo completo de olvido de contraseña con envío de token por email

---

## 📄 Licencia

Este proyecto es parte del curso **Next.js Fullstack** y tiene fines educativos.
