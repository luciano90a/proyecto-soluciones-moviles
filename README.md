## Como Iniciar la Aplicación WEB

Se debe tener el proyecto de la aplicación WEB y la API abiertos y ejecutar:

1. Aplicación WEB:
- `npm install`
- `npm install chart.js`
- `php artisan serve`    (Terminal 1)
- `npm run dev`          (Terminal 2)
  
2. API
- `php artisan serve --host 0.0.0.0`
- 
4. XAMPP
- Debe iniciar XAMPP con MySQL (puerto: 3306) y Apache (puerto: 80 - 443)

En la aplicación WEB, debe modificar el archivo `LoginController.php` (app/Http/Controllers/LoginController.php) en la línea 33. Debe modificar la IP utilizada para la conexión con la API por la IP local de su equipo. Puede ver su IP local usando CMD (windows) ejecutando:
- `ipconfig`
