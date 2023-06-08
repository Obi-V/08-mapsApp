# MapsApp
No usar directamente en AngularCLI (a menos que estén creadas las variables de entorno), ya que las variables de entorno se crean basados en el .env

Necesitarás un token de https://account.mapbox.com/ e introducirlo en las variables de entorno (.env), es gratuito pero por desgracia hay que poner una tarjeta de crédito.
Puede ser que se pueda encontrar por internet pero no lo creo porque solo es gratis hasta ciertas peticiones al mes.

## Pasos:
1. Clonar el .env.template y renombrarlo a .env
2. Llenar las variables de entorno acorde
3. Crear Angular Envs (opcional)
```
npm run envs
```

4. Para development ejecutar:
```
npm run start
```

5. Para producción ejecutar:
```
npm run build
```
