# LicitaLAB - Plataforma de Gestión de Oportunidades

## Descripción del Proyecto

LicitaLAB es una aplicación web para gestionar y seguir oportunidades de negocio, permitiendo a los usuarios visualizar, filtrar y marcar oportunidades de interés.

## Características Principales

- Listado de oportunidades vigentes
- Filtros por tipo y fecha de publicación
- Marcado de oportunidades en seguimiento
- Vista de oportunidades en seguimiento
- Autenticación de usuarios
- Responsive design

## Tecnologías Utilizadas

### Frontend

- Next.js 15
- React 19
- Redux Toolkit
- Tailwind CSS
- NextAuth
- Recharts

### Backend

- NestJS
- Prisma ORM
- PostgreSQL
- Passport.js
- TypeScript

## Requisitos Previos

- Docker
- Docker Compose
- Git

## Instalación y Configuración

### Clonar el Repositorio

```bash
git clone https://github.com/kevinlindoames/The-List.git
cd licitalab
```

### Variables de Entorno

Crea los siguientes archivos de entorno:

#### Backend (licitalab-backend2/.env.docker)

```
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/licitalab?schema=public
PORT=4000
JWT_SECRET=tu_secreto_muy_largo_y_complejo
```

#### Frontend (licitalab-opportunities/.env.docker)

```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_clave_secreta_segura
DOCKER_ENVIRONMENT=true
```

### Levantar Proyecto con Docker

```bash
# Construir y levantar servicios
docker-compose up --build

# Para detener los servicios
docker-compose down
```

## Acceso a la Aplicación

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:4000

### Credenciales de Prueba

- **Email**: test@licitalab.com
- **Contraseña**: LicitaLAB2024!

## Estructura del Proyecto

```
licitalab/
├── licitalab-backend2/     # Backend NestJS
│   ├── Dockerfile
│   ├── prisma/             # Modelos y migraciones de base de datos
│   └── src/                # Código fuente del backend
│
├── licitalab-opportunities/  # Frontend Next.js
│   ├── Dockerfile
│   └── src/                # Código fuente del frontend
│
└── docker-compose.yml      # Configuración de servicios Docker
```

## Desarrollo

### Modo Desarrollo

#### Backend

```bash
cd licitalab-backend2
npm run start:dev
```

#### Frontend

```bash
cd licitalab-opportunities
npm run dev
```

## Comandos Útiles

### Backend

- `npm run build`: Compilar TypeScript
- `npm run start:prod`: Iniciar en producción
- `npm run prisma:migrate`: Realizar migración de base de datos
- `npm run seed`: Poblar base de datos con datos de prueba

### Frontend

- `npm run build`: Compilar aplicación
- `npm run lint`: Verificar código
- `npm run test`: Ejecutar pruebas

## Contribución

1. Haz un fork del proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Distribuido bajo Licencia MIT.

## Contacto

- Nombre del Desarrollador
- Email: kevinlindo@hotmail.com
- Link del Proyecto: [https://github.com/kevinlindoames/The-List](https://github.com/kevinlindoames/The-List)

```

```
