// execute the update function every 10 milliseconds
function update() {
    
    fillCanvas("rgb(255, 232, 253)");

 // kode til update.js
   updateDiamond()
   updateHeart()

    // for every cloud
    for(let cloud of clouds) {
        // draw the cloud
        drawImage(
            cloudImage,
            cloud.xPosition,
            cloud.yPosition,
            cloudImage.width,
            cloudImage.height
        );
        // update the x position of the cloud
        cloud.xPosition += cloudXSpeed;
        // remove cloud if it moves beyond the destruction point
        if(cloud.xPosition < destructionXPosition) {
            clouds = clouds.remove(cloud);
        }

    }
    // spawn a new cloud when the it is time
    cloudTimeSinceLastSpawn += timeSinceLastFrame;
    if(cloudTimeSinceLastSpawn>cloudSpawnInterval) {
        clouds.push({
            xPosition: spawnXPosition,
            yPosition: randomBetween(0, canvas.height/2), 
        });
        cloudTimeSinceLastSpawn = 0;
    }    

    //speed up at 25 coins
    if(scoreValue>=25){
        fireballXSpeed = -9.5;
    };

     //speed up at 45 coins
     if(scoreValue>=55){
        fireballXSpeed = -12.5;
    };

       //speed up at 65 coins
       if(scoreValue>=65){
        fireballXSpeed = -18.5;
    };


    // draw the bird image
    drawImage(birdImage,
        birdXPosition,
        birdYPosition,
        birdImage.width,
        birdImage.height
    );

    // draw the bird hitbox if debugmode is on
    if(debugModeIsOn) {
        drawCircle(
            birdXPosition, 
            birdYPosition, 
            birdHitboxRadius, 
            hitboxColor
        );
    }

    // update the bird movement
    birdYSpeed += birdYAccelleration;
    birdYPosition += birdYSpeed;

    if (gameState == "action") {
        // end the game if the bird touches the canvas edge
        if(canvas.height < birdYPosition || birdYPosition < 0) {
            gameOverSound.play();
            birdCanFlap = false;
            gameState = "gameover";
        }
    }

    // for each coin
    for(let coin of coins) {
        // draw the coin
        drawImage(coinImage,
            coin.xPosition,
            coin.yPosition,
            coinImage.width,
            coinImage.height
        );

        if(debugModeIsOn) {
            drawCircle(
                coin.xPosition, 
                coin.yPosition, 
                coinHitboxRadius, 
                hitboxColor
            );
        }

        // move the coin
        coin.xPosition += coinXSpeed;


        if(gameState == "action") {
            // check if the coins collides with the bird
            if(theseCirclesCollide(
                birdXPosition,
                birdYPosition,
                birdHitboxRadius,
                coin.xPosition,
                coin.yPosition,
                coinHitboxRadius
            )) 
            { // if they do, increase the score
                coinSound.play();
                scoreValue += coinValue;
                coins = coins.remove(coin);
            }
        }

         // remove coin if it goes off the screen
         if(coin.xPosition < destructionXPosition) {
            coins = coins.remove(coin);
        }
    }

    // spawn new coins
    if(gameState == "action" &&
    coinTimeSinceLastSpawn>coinSpawnInterval) {
        coins.push({
            xPosition: spawnXPosition,
            yPosition: randomBetween(0, canvas.height)
        });
        coinTimeSinceLastSpawn = 0;
    }

    if(gameState == "action") {
        coinTimeSinceLastSpawn += timeSinceLastFrame;
    }



    // for each fireball
    for(let fireball of fireballs) {
        // draw the fireball
        drawImage(fireballImage,
            fireball.xPosition,
            fireball.yPosition,
            fireballImage.width,
            fireballImage.height
        );

        if(debugModeIsOn) { // draw the hotbox
            drawCircle(
                fireball.xPosition, 
                fireball.yPosition, 
                fireballHitboxRadius, 
                hitboxColor
            );
        }

        // move the fireball
        fireball.xPosition += fireballXSpeed;

        // remove fireball if it goes off the screen
        if(fireball.xPosition < destructionXPosition) {
            fireballs = fireballs.remove(fireball);
        }

        if(gameState == "action") {
            // check if the fireball collides with the bird
            if(theseCirclesCollide(
                birdXPosition,
                birdYPosition,
                birdHitboxRadius,
                fireball.xPosition,
                fireball.yPosition,
                fireballHitboxRadius
            )) 
            { // if they do, end the game
                birdCanFlap = false;
                gameOverSound.play();
                gameState = "gameover";
            }
        }
    }

    // spawn new fireballs
    if(gameState == "action" &&
    fireballTimeSinceLastSpawn>fireballSpawnInterval) {
        fireballs.push({
            xPosition: spawnXPosition,
            yPosition: randomBetween(0, canvas.height)
        });
        fireballTimeSinceLastSpawn = 0;
    }

    if(gameState == "action") {
        fireballTimeSinceLastSpawn += timeSinceLastFrame;
    }

    //draw the scoreboard
    drawImage(
        scoreImage,
        scoreImageXPosition,
        scoreImageYPosition,
        scoreImage.width,
        scoreImage.height
    );
    drawText(
        "x"+ scoreValue,
        scoreTextXPosition,
        scoreTextYPosition,
        scoreTextSize,
        scoreTextColor
    );

    // draw the menu text
    if(gameState == "menu") {
        drawText (
            menuFirstText,
            menuTextXPosition,
            menuTextYPosition,
            menuTextSize,
            menuTextColor
        )
    }

    if(gameState == "action" && birdYAccelleration == 0) {
        drawText (
            menuSecondText,
            menuTextXPosition,
            menuTextYPosition,
            menuTextSize,
            menuTextColor
        )
    }

    // draw the game over text
    if(gameState == "gameover") {
        drawText (
            gameOverText,
            menuTextXPosition,
            menuTextYPosition,
            menuTextSize,
            menuTextColor
        )
    }

    if(debugModeIsOn) {
        drawText(
            "timeSinceLastFrame: " + timeSinceLastFrame,
            canvas.width/2,
            20,
            12,
            "black"
        );
    }

    // update timeSinceLastFrame and draw next frame
    timeOfCurrentFrame = new Date().getTime();
    timeSinceLastFrame = timeOfCurrentFrame - timeOfLastFrame;
    timeOfLastFrame = timeOfCurrentFrame;
    window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);

function updateDiamond() {
    for(let diamond of diamonds) {
 
        if(gameState == "action") {
 
            if(diamond.xPosition < destructionXPosition) {
                diamonds = diamonds.remove(diamond);
            }
       
            diamond.xPosition += diamondXSpeed;
 
            if(theseCirclesCollide(
                birdXPosition,
                birdYPosition,
                birdHitboxRadius,
                diamond.xPosition,
                diamond.yPosition,
                diamondHitboxRadius
            ))
            {
                diamonds = diamonds.remove(diamond);
                scoreValue += diamondValue;
            }
        }
 
        if(gameState == "gameover") {
            diamond.xPosition += diamondXSpeed;
        }
 
        drawImage(
            diamondImage,
            diamond.xPosition,
            diamond.yPosition,
            diamondImage.width,
            diamondImage.height
        );
    }
 
     // spawn new diamonds
     if(gameState == "action" &&
     diamondTimeSinceLastSpawn>diamondSpawnInterval) {
         diamonds.push({
             xPosition: spawnXPosition,
             yPosition: randomBetween(0, canvas.height)
         });
         diamondTimeSinceLastSpawn = 0;
     }
 
     if(gameState == "action") {
         diamondTimeSinceLastSpawn += timeSinceLastFrame;
     }
}
 
// i input under coins = [];
diamonds = [];


function updateHeart() {
    for(let heart of hearts) {
 
        if(gameState == "action") {
 
            if(heart.xPosition < destructionXPosition) {
                hearts = hearts.remove(heart);
            }
       
            heart.xPosition += heartXSpeed;
 
            if(theseCirclesCollide(
                birdXPosition,
                birdYPosition,
                birdHitboxRadius,
                heart.xPosition,
                heart.yPosition,
                heartHitboxRadius
            ))
            {
                hearts = hearts.remove(heart);
                scoreValue += heartValue;
            }
        }
 
        if(gameState == "gameover") {
            heart.xPosition += heartXSpeed;
        }
 
        drawImage(
            heartImage,
            heart.xPosition,
            heart.yPosition,
            heartImage.width,
            heartImage.height
        );
    }
 
     // spawn new hearts
     if(gameState == "action" && 
     heartTimeSinceLastSpawn>heartSpawnInterval) {
         hearts.push({
             xPosition: spawnXPosition,
             yPosition: randomBetween(0, canvas.height)
         });
         heartTimeSinceLastSpawn = 0;
     }
 
     if(gameState == "action") {
         heartTimeSinceLastSpawn += timeSinceLastFrame;
     }
}
 
 // i input under coins = [];
 hearts = [];