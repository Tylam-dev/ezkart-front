# PROYECTO FRONTEND EZKART
Este es un proyecto frontend de un mini e-commerce Angular. Consume el backend ezkart-back.

## Desiciones tecnicas consideradas
- Se utilizo libreria de estilos de Angular Material.
- Se uso dos interceptores. El de credenciales con Credentials true para incluir siempre las cookies ya que se recibe jwt por este medios, asi tambien el refreshToken. El interceptor de refreshToken para actualizar el jwt. 
- Se agrego un proveedor al iniciar la aplicacion para que cuando se refresque la pagina se haga una peticion para obtener los datos del usuario y aplicando flujo de interceptores de tokens antes mencionados. 
- En la consulta de productos se agregaron filtros y paginacions, tambien al hitorial de ordenes.
- Se agrego carpeta envioroments para la ejecucion del codigo en su debido ambiente. 
- Se creo un guard para denegar el acceso a paginas sin autenticacion y evitar que autenticados vuelvan a inciar sesion.

## Ejecucion del proyecto.
1. En la raiz instalar dependencias con:
``
    npm install
``
Luego levantar la aplicacin en desarrollo con:
``
    ng serve 
`` 