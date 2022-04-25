
# Instalación

Para la correcta ejecución del proyecto es necesario utilizar la versión de Node v14.

## Project setup

```bash

npm install

```

### Compiles and hot-reloads for development

```bash

npm run serve

```

### Compiles and minifies for production

```bash

npm run build

```

### Conexión con Api Rest

Copiar el archivo **.env** y renombrarlo como **.env.local** para desarrollo o **.env.production** para producción.

```bash

cp .env .env.local

```

Modificar el archivo y agregar:

```javascript

VUE_APP_API_URL=<API_URL>

```

Todas la variables de VUE tiene que iniciar con **VUE_APP_[NOMBRE_VARIABLE]**

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
