# Forma de uso

Aquí se encontra la estructura del proyecto y los estandares de desarrollo que se implementaran.

## Tabla de contenido

- [Generalidades](#generalidades)
- [Componentes de vue](#componentes)
- [Servicios](#servicios)
- [Store](#store)
- [Validaciones](#validaciones)
- [Complementos para vscode](#complementos)

## Generalidades

La plantilla tiene configurado una serie de estandares para que el código sea limpio y de facil lectura, de igual forma en la parte inferior se establece el orden que todo archivo de vue debe de seguir para que sea facil para el desarrollador y sus compañeros encontrar secciones de código.

### Reglas de desarrollo

Algunas de las reglas que se deberan de cumplir al momento de desarrollar son:

1. No realizar declaraciones o importaciones de variables que no seran utilizadas.
2. Colocar punto y coma ( **;** ) al final de cada linea de código.
3. Colocar coma ( **,** ) en cada elemento interable (cada elemento dentro de un array u object).
4. Todos los nombres de funciones y variables deben de ser autoexplicativos, es decir, debe de entenderse que tarea realiza o que dato almacena.
5. Todos los nombres de funciones y variables deben de ser escritos en camelCase.
6. La plantilla cuenta con un sistema de linter con reglas adicionales que se deben de cumplir.
7. Todos los archivos deben de tener indentación de 2 (la plantilla cuenta con un editor config con esta configuración).
8. Todos los archivos deben de ser formateados utilizando Prettier (el archivo de configuración ya se encuentra dentro del proyecto).
9. Ninguna regla de eslint debe de ser deshabilitada (a excepción de algunos casos, preguntar cual si puede ser o no deshabilitada).
10. Comentar unicamente lo necesario, como por ejemplo tipos de datos que requiere un metodo, descripción del mismo o el tipo de respuesta.
11. Eliminar cada uno de los console.log que se agreguen durante la depuración cuando ya no sean necesarios.
12. No dejar bloques de código vacios.
13. Evitar el uso de try/catch si no es necesario.
14. Todos los errores o excepciones deberan de ser tratadas y lanzadas haciendo uso del temporalAlert del sistema.
15. NUNCA colocar un console.log dentro del bloque catch de un try/catch para el manejo de errores.

## Componentes

### Estructura y orden de un componente de vuejs

Para el desarrollo de componentes (tanto vistas como componentes) se seguira el siguiente orden dentro de la estructura:

```html
<template>
	<div></div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from  'vuex'; // SOLO SI SON NECESARIOS
import { /* Validaciones a importar */ } from  "vuelidate/lib/validators"; // Solo si se realizaran validaciones

export  default {
	name: 'NombreDelComponente',
	props: [] // Solo si es necesario,
	validations: {},
	data: () => ({}),
	methods: {},
	computed: {},
	beforeCreate() {},
	beforeMount() {},
	created() {},
	mounted() {},
}
</script>

<style scoped></style>
```

### Componentes de vuetify

Para el uso de componentes de Vuetify se recomienda leer la documentación oficial en [vuetifyjs.com](https://vuetifyjs.com/en/getting-started/installation/)

### Componentes personalizados

#### Componentes generales

Todos los componentes desarrollados que puedan y vayan a ser utilizados en diferentes partes del sistema deberan de ser registrados en la carpeta **src/components** y el nombre debe de seguir la siguiente estructura: **App[NombreComponente].vue**, el sistema detectara automaticamente el nuevo componente para utilizarlo sin necesidad de importarlo dentro de cada componente.

**Nota:** Si el nombre del componente no comienza "App" no será importado automaticamente y se tendra que declarar en cada componente que vaya a utilizarlo.

#### Componentes personalizados

Para los componentes personalizados estos deben ser declarados dentro de la carpeta del modulo ya sea en **src/modules/[NOMBREMODULO]/components** o en **src/views/[NOMBREMODULO]/components**. Lo ideal es hacerlo dentro de **src/views/[NOMBREMODULO]/components**. El nombre debe de estar escrito en camelCase

**NOTA: Todas las vistas y componentes deben de utilizar la estructura señalada en la parte superior**

## Servicios

### HttpClient

El archivo **httpClient** sera el encargado de realizar las peticiones a la api, se encuentra alojado en **src/plugins/http_client.js**. Este archivo realizara todas las peticiones haciendo uso del token de seguridad que se obtiene durante el login y se encargara de tratar las excepciones y errores que devuelvan desde el servidor.

Entre las propiedades que utiliza se encuentran:

1. **Url**: endpoint al que se realizara la petición, la url base no es necesaria porque se define en el archivo de enviroment.
2.  **Data:** Objeto con la información que se enviara en la petición, si el metodo es Get se enviara mediante query y si es post, put o delete sera mediante body.
3.  **Method:** (Opcional) Por defecto se realizan peticiones GET.
4. **Headers:** (Opcional) Headers custom para el sistema.
5. **sendToken** (Opcional, por defecto true) Booleano que define si el token se enviara en la petición o no.

### Crear servicios

Todos los archivos donde se definan los servicioes se encuentran en **src/services/***. El nombre que los archivos deben de tener será **modulo.services.js**. Seguido a esto debe de ser incluido dentro del archivo index.js que se encuentra en el mismo directorio.

```javascript
// index.js
import  Vue  from  'vue';
import  modulo  from  './modulo.services'; // Modulo a importar

Vue.prototype.services = {
	modulo,
};
```

Los archivos de servicios deben de contener todas las peticiones que se hagan al sistema, devolviendo algun valor para el consumo desde la vista.

Pudiendo devolver una promesa.

```javascript
import { httpClient } from  '../plugins/http_client';

const login = async (data) => await httpClient('/api/v1/login', data, 'post');
```

O uno o muchos datos.

```javascript
const  login = async (data) => {
	const  response = await  httpClient('/api/v1/login', data, 'post');
	return  response.data.username;
};
```

Para utilizar los servicios dentro de las vistas debe de hacerse de la siguiente forma:

```javascript
async login() {
	const data = {
		email: 'email@ejemplo.com',
		password: 'minsal'
	};

	const response = await this.services.modulo.login(data); // modulo.login hace referencia al nombre del modulo en el que se agregó el metodo y el nombre del metodo.

	...
}
```

## Store

Todos los archivos de store seran creados dentro de la ruta **src/modules/[NOMBREMODULO]**. El directorio contendra un archivo **index.js** en el que se definira states, actions, mutations y getters. Para más información ver la documentación de [vuex](https://vuex.vuejs.org/).

### Estructura del archivo index.js

Cuando se coloca toda la lógica dentro del archivo index.js del modulo, la estructura debe de ser la siguiente:

```javascript
import  Vue  from  'vue';
import { httpClient } from  '../../plugins/http_client';

export  default {
	namespaced:  true,
	state: { /* variables de estado */ },
	getters: { /* Utilizados solo si es necesario, uso principal: filtrar información de los states */ },
	mutations: { /* Modificadores de estados */ },
	actions: { /* Utilizado solo para hacer peticiones a la api y luego modificar su estado invocando una mutation */ }
},
```

**Nota:** Cuando se manejen grandes cantidades de estados, mutaciones o acciones se dividira este archivo en cuatro archivos distintos los cuales seran: states.js, mutations.js, actions.js e index.js. Para más información leer [Modulos Vuex](https://vuex.vuejs.org/guide/modules.html)

### Importar store

Para importar store dentro del sistema se debera de incluir el nuevo modulo dentro del archivo index.js que se encuentra en **src/store**.

```javascript
import  modulo  from  '../modules/modulo'; // Modulo a importar

...

export  default  new  Vuex.Store({
	...,
	modules: {
		modulo,
	},
});
```

## Validaciones

Para las validaciones se utilizara el paquete [Vuelidate](https://vuelidate.js.org/).

Ejemplo de validacion:

```html
<template>
	<div>
	  <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
	    <label class="form__label">Name</label>
	    <input class="form__input" v-model.trim="name" @input="setName($event.target.value)"/>
	  </div>
	  <div class="error" v-if="!$v.name.required">Field is required</div>
	  <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
	  <div class="form-group" :class="{ 'form-group--error': $v.age.$error }">
	    <label class="form__label">Age</label>
	    <input class="form__input" :value="age" @change="setAge($event.target.value)"/>
	  </div>
	  <div class="error" v-if="!$v.age.between">Must be between {{$v.age.$params.between.min}} and {{$v.age.$params.between.max}}</div><span tabindex="0">Blur to see changes</span>
	</div>
</template>

<script>
import { required, minLength, between } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      name: '',
      age: 0
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    age: {
      between: between(20, 30)
    }
  },
  methods: {
    setName(value) {
      this.name = value
      this.$v.name.$touch()
    },
    setAge(value) {
      this.age = value
      this.$v.age.$touch()
    }
  }
};
</script>
```

## Complementos

Para el correcto funcionamiento de la configuración de la plantilla es necesario tener las siguentes librerias  dentro de visual studio code (si no utiliza visual studio code buscar los equivalentes para su editor de texto).

- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
- [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Prettier ESlint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
