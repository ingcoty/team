# team
Prueba de concepto

*Arquitectura:
1. La aplicación se divide en 2 partes:
   1. Frontend: Desarrollado en React Js
   2. Backend: Desarrollado en Flask y subdividido en:
      1-modelos utilizando el ORM SQLAlchemy (models.py)
      2-esquemas utilizando Marsmallow como serializer (schemas.py)
      3-recursos o endpoints, desarrollados en Flask-Restfull, usando los verbos (GET, POST, PUT, DELETE) (endpints.py)
      4-autenticación por token JWT

2. Mejoras:
  1. En el frontend: se puede mejorar mucho en los estilos y validación de datos antes de ser enviados al backend.
  2. En el backend: se pueden mejorar las pruebas unitarias y empaquetar mejor los datos con métodos para pasear.
  3. Swagger: agregar el token de acceso.

3. Pendientes:
  1. En el backend quedó por desarrollar el procedimiento almacenado.

4. Problemas:
  1. Aunque no lo solicitaba la prueba, para garantizar la ejecución de la Web App decidí contenerizar los servicios backend y frontend. fué compleja
   la configuración del docker.
  2. Para probar los servicios de backend desde alguna herramienta externa, se requiere de un token JWT. Se puede solicitar a la url "localhost:5000/   login" con los datos: { "data": { "user":"user", "password":"user" } } el toker obtenido agregarlo al header 'Authorization' de la herramienta.
	

5. Para ejecutar la app:
  1. Tener docker y docker-compose instalados
  2. Ejecutar "docker-compose up --build" dentro de la carpeta team
  3. Abrir el navegador en la url "localhost:3000"
  4. hacer el login con usuario:user y password:user


 


