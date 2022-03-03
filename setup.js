 //game variables
const gameOverSound = new Audio("../assets/sounds/gameover.wav");
const music = new Audio("../assets/sounds/music.mp3");
      music.loop = true;
      music.volume = 0.5;
const debugModeIsOn = true;
const startKey = "s";
const restartKey = "r";
const hitboxColor = "#00FF02";
const destructionXPosition = -1000;
const spawnXPosition = canvas.width * 1.2
let gameState = "menu"; // menu, action or gameover


// bird variables
const birdImage = new Image(120, 120);
      birdImage.src = "../assets/images/bird.png";
const birdStartYPosition = 250;
const birdStartYSpeed = 0;
const birdStartYAccelleration = 0;
const birdBeginningYAccelleration = 0.7;
const birdXPosition = 250;
const birdHitboxRadius = 30;
const birdFlapSound = new Audio("../assets/sounds/flap.wav");
const birdFlapForce = -12;
const birdFlapKey = " ";
let birdYSpeed = birdStartYSpeed;
let birdYAccelleration = birdStartYAccelleration;
let birdYPosition = birdStartYPosition;
let birdCanFlap = false;


// score variables
const scoreImage = new Image(60, 60);
      scoreImage.src = "../assets/images/coin.png";
const scoreImageXPosition = 70;
const scoreImageYPosition = 70;
const scoreTextXPosition = 100;
const scoreTextYPosition = 90;
const scoreTextSize = 50;
const scoreTextColor = "rgb(255, 107, 164)";
let scoreValue = 0;

// cloud variables
const cloudImage = new Image(200, 200);
      cloudImage.src = "../assets/images/cloud.png";
const cloudSpawnInterval = 10000; // milliseconds
const cloudXSpeed = -.7;
let cloudTimeSinceLastSpawn = 0; // milliseconds
let clouds = [
    {
        xPosition: canvas.width,
        yPosition: randomBetween(0, canvas.height/2), 
    },
    {
        xPosition: canvas.width -500,
        yPosition: randomBetween(0, canvas.height/2), 
    },
    {
        xPosition: canvas.width-1000,
        yPosition: randomBetween(0, canvas.height/2), 
    },
];

// fireball variables
const fireballImage = new Image(450, 200);
      fireballImage.src = "../assets/images/fireball.png";
let fireballXSpeed = -5.5;
const fireballHitboxRadius = 100;
const fireballSpawnInterval = 2000;
let fireballTimeSinceLastSpawn = fireballSpawnInterval;
let fireballs = [];

// coin variables
const coinSound = new Audio("../assets/sounds/coin.wav");
const coinImage = scoreImage;
const coinHitboxRadius = 30;
const coinXSpeed = -8;
const coinSpawnInterval = 800;
const coinValue = 1;
let coinTimeSinceLastSpawn = coinSpawnInterval
let coins = [];

// menu text variables
const menuFirstText = "Press " + startKey + " to start";
const menuTextXPosition = 300;
const menuTextYPosition = 400; 
const menuSecondText = "Press space to flap wings";
const menuTextSize = 60;
const menuTextColor = "rgb(255, 107, 164)";
const gameOverText = "Press " + restartKey + " to restart";

// diamond variables
const diamondSound = coinSound;
const diamondImage = new Image(60, 60);
      diamondImage.src = "../assets/images/diamond.png";
const diamondHitboxRadius = 30;
const diamondXSpeed = -10;
const diamondSpawnInterval= 2200;
const diamondValue = 5;
let diamondTimeSinceLastSpawn = diamondSpawnInterval
let diamonds = [];

// heart variables
const heartSound = coinSound;
const heartImage = new Image(120, 60);
      heartImage.src = "../assets/images/heart.png";
const heartHitboxRadius = 30;
const heartXSpeed = -10;
const heartSpawnInterval = 2000;
const heartValue = 10;
let heartTimeSinceLastSpawn = diamondSpawnInterval
let hearts = [];
