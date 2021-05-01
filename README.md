# Documentación nodepop API 

## Introducción

Bienvenido a la documentación de nodepop API. Esta documentación trata de facilitar el uso de la misma, mostrando la forma de usarla
con los métodos disponibles y la forma de uso. La mayoría de los problemas que puedan surgir deberían solucionarse leyendo el actual documento. 
Cualquier incidencia contacte en emgg2222@gmail.com

## Cómo empezar con nodepop

Clonar el repositorio 

``` https://github.com/emgg2/nodepop.git ```

Situarse dentro del directorio nodepop. Ejecutar la siguiente instrucción para instalar todas las dependencias de la API

``` npm install ``` 

Para arrancar la aplicación

``` npm run dev ```

La aplicación arranca en la siguiente URL:

``` http://localhost:3000 ```

Para aplicar cualquier filtro

``` http://localhost:3000/?min_price=10&max_price=100&name=B&sort=name&limit=20&skip=4 ```

Un datos a tener en cuenta es que si no se indica un limit por defecto es 10 y muestra la primera página (skip)

## Base Datos 

Una vez arrancado MongoDB hay que lanzar el script

``` load("/home/eva/keepcoding/practicas/IntroNode/nodepop/lib/bbdd/install_db.js") ```
Inicializar Usuarios 
``` node init
```

Inicializar Usuarios

```
npm run init-db
```

## Start Server


    npm start
```

## Start thumbnail Service

```
    npm run thumbnailService
```



## API 

Puede encontrar documentación completa con todos los métodos e incluso probar cada uno de ellos en la siguiente dirección. Está disponible el esquema de base de datos utilizado y los parámetros necesarios y disponibles en cada uno de ellos

``` http://localhost:3000/api-docs/ ```




