<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite('resources/css/dashboard.css')
    @vite('resources/css/login.css')
    @vite('resources/css/keyframes.css')
    <title>login</title>
</head>
<body class="body">
    <div class="backgroundText">
            <p>
                import java.awt.*;
                import javax.swing.*;
                import java.awt.event.*; // needed for event handling
            </p>
            <p>
                public boolean checkBodyPositions(SnakeSection s) {
                boolean collision=false;
            </p>
            <p>
                for (int i=1; i< snakeLength i++) {
                    
                if (s.match(snakeSecs[i]))
                    collision=true;
                }
                    return collision;
                }
            </p>
            <p>
                public void move() {
                for (int i=snakeLength-1; i>0; i--)
                snakeSecs[i]=snakeSecs[i-1];
            </p>
            <p>
                int newX=(snakeSecs[1].x + dirX + SCREEN_SIZE_X) % SCREEN_SIZE_X;
                int newY=(snakeSecs[1].y + dirY + SCREEN_SIZE_Y) % SCREEN_SIZE_Y;
                snakeSecs[0]=new SnakeSection(newX,newY);
                }
            </p>
            <p>
                public void paint(Graphics g) { 
                g.setColor(color);
                for (int i=0; i< snakeLength; i++) {
            </p>
            <p>
                g.setColor(new Color((float) Math.random(), (float) Math.random(), (float) Math.random()));
                g.drawRect(snakeSecs[i].x*20,snakeSecs[i].y*20,20,20);
                }
                }
                
            </p>
            <p>
                import java.awt.*;
                import javax.swing.*;
                import java.awt.event.*; // needed for event handling
            </p>
            <p>
                public boolean checkBodyPositions(SnakeSection s) {
                boolean collision=false;
            </p>
            <p>
                for (int i=1; i< snakeLength i++) {
                    
                if (s.match(snakeSecs[i]))
                    collision=true;
                }
                    return collision;
                }
            </p>
            <p>
                public void move() {
                for (int i=snakeLength-1; i>0; i--)
                snakeSecs[i]=snakeSecs[i-1];
            </p>
            <p>
                int newX=(snakeSecs[1].x + dirX + SCREEN_SIZE_X) % SCREEN_SIZE_X;
                int newY=(snakeSecs[1].y + dirY + SCREEN_SIZE_Y) % SCREEN_SIZE_Y;
                snakeSecs[0]=new SnakeSection(newX,newY);
                }
            </p>
            <p>
                public void paint(Graphics g) { 
                g.setColor(color);
                for (int i=0; i< snakeLength; i++) {
            </p>
            <p>
                g.setColor(new Color((float) Math.random(), (float) Math.random(), (float) Math.random()));
                g.drawRect(snakeSecs[i].x*20,snakeSecs[i].y*20,20,20);
                }
                }
                
            </p>
            <p>
                g.setColor(new Color((float) Math.random(), (float) Math.random(), (float) Math.random()));
                g.drawRect(snakeSecs[i].x*20,snakeSecs[i].y*20,20,20);
            </p>
            
        </div>
    <section class="font container">
        <div>
            <h1 class="center title">
                Social_Dev
            </h1>
        </div>
        <div class="formDiv">
            <div class="">
                <form class="form" action="{{ route('loginAuth')}}" method="POST">

                    <img src="/img/profile.png" class="profileImg"></img>
                    @csrf
                    @if (session('message'))
                        <div class="errorMsg">
                            {{ session('message') }}
                        </div>
                    @endif
                    <div class="p-10v">
                        
                        <div class="inputLabel">
                            <label for="">correo</label>
                        </div>
                        <div>
                            <input class="input" type="email" id="email" name="email" class="">
                        </div>
                        
                        @error('email')
                            <p class="errorMsg">{{ $message }}</p>
                        @enderror
                    </div>
                    <br>
                    <div class="p-10v">
                        <div class="inputLabel">
                            <label for="">contraseña</label>
                        </div>
                        <div >
                            <input class="input" type="password" id="password" name="password" class="">
                        </div>
                        @error('password')
                            <p class="errorMsg">{{ $message }}</p>
                        @enderror
                    </div>
                    <br>
                    <div class= "center">
                        <button type="submit" class="button" >Iniciar Sesión</button>
                    </div>
                    <br>

                </form>
            </div>
        </div>
    </section>
</body>
</html>