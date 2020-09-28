# team
Prueba de concepto

*Arquitectura:
1. La aplicación se divide en 2 partes:
   - Frontend: Desarrollado en React Js
   - Backend: Desarrollado en Flask y subdividido en:
      - modelos utilizando el ORM SQLAlchemy (models.py)<br>
      - esquemas utilizando Marsmallow como serializer (schemas.py)
      - recursos o endpoints, desarrollados en Flask-Restfull, usando los verbos (GET, POST, PUT, DELETE) (endpints.py)
      - autenticación por token JWT

2. Mejoras:
  - En el frontend: se puede mejorar mucho en los estilos y validación de datos antes de ser enviados al backend.
  - En el backend: se pueden mejorar las pruebas unitarias y empaquetar mejor los datos con métodos para pasear.
  - Swagger: agregar el token de acceso.

3. Pendientes:
  - En el backend quedó por desarrollar el procedimiento almacenado.

4. Problemas:
  - Aunque no lo solicitaba la prueba, para garantizar la ejecución de la Web App decidí contenerizar los servicios backend y frontend. fué compleja
   la configuración del docker.
  - Para probar los servicios de backend desde alguna herramienta externa, se requiere de un token JWT. Se puede solicitar a la url "localhost:5000/   login" con los datos: { "data": { "user":"user", "password":"user" } } el toker obtenido agregarlo al header 'Authorization' de la herramienta.
	

5. Para ejecutar la app:
  - Tener docker y docker-compose instalados
  - Ejecutar "docker-compose up --build" dentro de la carpeta team
  - Abrir el navegador en la url "localhost:3000"
  - hacer el login con usuario:user y password:user


 


