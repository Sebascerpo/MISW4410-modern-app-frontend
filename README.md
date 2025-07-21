

# RECETARIO FRONT END

📄 Esta carpeta contiene el código fuente para el FRONTEND de RECETARIO APP. El proyecto fue realizado utilizando [Angular CLI](https://github.com/angular/angular-cli) version 19.1.7.


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
