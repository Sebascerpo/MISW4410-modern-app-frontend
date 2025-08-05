

# RECETARIO FRONT END

📄 Esta carpeta contiene el código fuente para el FRONTEND de RECETARIO APP. El proyecto fue realizado utilizando [Angular CLI](https://github.com/angular/angular-cli) version 19.1.7.

## ✨ Mejoras Implementadas

### 🎯 Sistema de Notificaciones
- **Notificaciones visuales** con Material Snack Bar
- **Diferentes tipos**: Success, Error, Warning, Info
- **Colores distintivos** para cada tipo de notificación
- **Duración configurable** según el tipo de mensaje

### 🔄 Indicadores de Carga
- **Componente de loading** reutilizable
- **Estados de carga** globales con LoadingService
- **Feedback visual** durante operaciones asíncronas
- **Integración automática** en servicios HTTP

### 🛡️ Manejo Robusto de Errores
- **Captura centralizada** de errores HTTP
- **Mensajes de error** descriptivos y user-friendly
- **Logging detallado** para debugging
- **Recuperación graceful** de errores de red

### 📭 Estados Vacíos
- **Componente EmptyState** reutilizable
- **Mensajes informativos** cuando no hay datos
- **Call-to-action** claro para el usuario
- **Diseño consistente** con el resto de la aplicación

### 🚀 Lazy Loading
- **Carga bajo demanda** de módulos feature
- **Preloading inteligente** para mejor UX
- **Rutas modulares** organizadas por funcionalidad
- **Guards de autenticación** para protección de rutas
- **Interceptores HTTP** para manejo global de errores
- **Skeleton loading** para transiciones suaves

### ⚡ Tiempo Real
- **Actualizaciones automáticas** cuando el backend cambia
- **Polling inteligente** cada 3 segundos
- **Notificaciones en tiempo real** para cambios
- **Indicador de conexión** en la esquina inferior derecha
- **Sincronización inmediata** de datos

### 🎨 Mejoras de UX
- **Feedback inmediato** para todas las acciones
- **Estados de carga** visibles durante operaciones
- **Notificaciones no intrusivas** en la esquina superior derecha
- **Diseño responsive** mejorado
- **Estados vacíos** informativos cuando no hay datos
- **Carga elegante** sin parpadeos durante la inicialización
- **Actualizaciones en tiempo real** sin recargar la página
- **Diálogos modernos** con Material Design y animaciones


## Tabla de contenido

- [Pre-requisitos](#pre-requisitos)
- [Ejecucion local](#ejecucion-local)
- [Variables de entorno](#variables-de-entorno)
- [Ejecución con Docker](#ejecución-con-docker)
- [License](#license)


## Pre-requisitos

Antes de ejecutar cualquier comando en el proyecto, asegúrate de instalar todas las dependencias necesarias con:

```bash
npm install
```

## Ejecucion local

Para empezar el servidor local de desarrollo run:

```bash
ng serve
```

## Variables de entorno

En la carpeta environments configurar el archivo environment.ts (para desarrollo, con production: false), y environment.prod.ts (para produccion con   production: true). Ademas configurar el api y el apiToken con base en los datos del backend


## Ejecución con Docker
Correr
```bash
ng build
```
Posteriormente
```bash
docker compose up --build   
```


## License

Copyright © MISW4410 - Modernización de Software
