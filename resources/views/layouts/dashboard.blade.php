<?php
    session_start();

    // Tu array
    $miArray = array("apple", "banana", "orange");

    // Guarda el array en la sesión
    $_SESSION['users'] = session('users');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0 "></script>
    <script src="{{ asset('assets/js/usersChart.js') }}"></script>
    @vite('resources/css/dashboard.css')
    @vite('resources/css/login.css')
    @vite('resources/css/keyframes.css')
    <title>dashboard</title>
</head>
<body class="body">
    <nav>
        <div class="">
            <form id="logOut" action="logout" method="POST">
                @csrf
                <button id="logOutButton" href="/dashboard" type="submit" class="buttonNav"> Cerrar Sesión </button>
            </form>
        </div>
    </nav>
    <div>
        <h1 class="titleWelcome">
            Dashboard
        </h1>
        <div class="line transparentColor"></div>
        <br>
    </div>
    <table class="table">
        <tr>
            <td>
                <div class="panel">
                    <div class="panelContent">
                        <p class="panelTittle">
                            Usuarios
                        </p>
                        <div class="line"></div>
                        <p>
                            Usuarios deshabilitados: {{session('inactiveUsers')}}
                        </p>
                        <p>
                            Usuarios habilitados: {{session('activeUsers')}}
                        </p>
                        <div class="charts">
                            <canvas id="myChart"></canvas>
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div class="panel">
                    <div class="panelContent">
                        <p class="panelTittle">
                            Posts
                        </p>
                        <div class="line"></div>
                        <p>
                            Cantidad de posts: {{session('postsCount')}}
                        </p>
                        <p class="panelTittle"> 
                            Post más popular:
                        </p>
                        <div class="postDiv">
                            <p class="username">...</p>
                            <div class="line"></div>
                            <p class="center">No hay posts disponibles</p>
                            <div class="line image"></div>
                            <p class="heart">❤ ❑</p>
                        </div>
                    </div>
                </div>
            </td>
            <td>
              <div class="panel">
                    <div class="panelContent">
                        <p class="panelTittle">
                            Buscar, habilitar y deshabilitar usuarios
                        </p>
                        <div class="line"></div>
                        <p class="errorMsg font" id="message"></p>
                            <div class="flexSection">
                                <p for="" class="findLabel">
                                    Nombre de usuario: 
                                </p>
                                <input type="text" class="findInput" name="username" id="username">
                                <div class="buttonDiv">
                                    <button type="button" class="findButton" onclick="findUser()">Buscar</button>
                                </div>
                            </div>
                        <div class="userFoundData">
                            <p>username:  <span id="user"></span></p>
                            <p>nombre:  <span id="name"></p>
                            <p>apellido:  <span id="lastname"></p>
                            <p>correo:  <span id="email"></p>  
                        </div> 
                        <div>
                            <br>
                            <button class="activeButton">
                                habilitar
                            </button>
                            <button class="activeButton">
                                deshabilitar
                            </button>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    </table>
    <div id="data" data-array="<?php echo htmlspecialchars(json_encode($_SESSION['users'])); ?>"></div>
    <script>
        function findUser(){

            let users = JSON.parse(document.getElementById('data').getAttribute('data-array'));
            var username = document.getElementById("username").value;
            var error = "Usuario no encontrado";
            var found = false;

            users.forEach(function(user) {
                if(username === user["username"]){
                    document.getElementById('user').innerHTML = user["username"] === "" ? "N/A" : user["username"];
                    document.getElementById('name').innerHTML = user["name"] === "" ? "N/A" : user["name"];
                    document.getElementById('lastname').innerHTML = user["lastname"] === "" ? "N/A" : user["lastname"];
                    document.getElementById('email').innerHTML = user["email"] === "" ? "N/A" : user["email"];
                    found = true;
                    return;
                }
            });
            if(!found){
                document.getElementById('message').innerHTML = "⚠ usuario no encontrado";
                document.getElementById('user').innerHTML = "N/A";
                document.getElementById('name').innerHTML = "N/A";
                document.getElementById('lastname').innerHTML = "N/A";
                document.getElementById('email').innerHTML = "N/A";
            }
        }
    </script>
</body>
</html>