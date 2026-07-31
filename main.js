// this part is for the main page tabs

const tabs = document.querySelectorAll(".hero-tab");
const backgrounds = document.querySelectorAll(".hero-bg");

const heroTitle = document.getElementById("hero-title");
const heroDescription = document.getElementById("hero-description");

const difficultyFill = document.getElementById("difficulty-fill");
const costFill = document.getElementById("cost-fill");

const revealItems = document.querySelectorAll(".compare-reveal");

let current = 0;

// staggered reveval function

function staggerReveal(){

    revealItems.forEach(function(item){

        item.classList.remove("show");

    });

    revealItems.forEach(function(item,index){

        setTimeout(function(){

            item.classList.add("show");

        },300 * index);

    });

}

// bar Function

function animateBar(fill, label, target){

    // Stop any previous animation on this bar
    clearInterval(fill.timer);

    let value = 0;

    fill.style.width = "0%";
    label.textContent = "0%";

    fill.timer = setInterval(function(){

        if(value >= target){

            clearInterval(fill.timer);
            return;

        }

        value++;

        fill.style.width = value + "%";
        label.textContent = value + "%";

    }, 10);

}

// Change Hero
function changeHero(index){

    // Active tab
    tabs.forEach(tab => tab.classList.remove("active"));
    tabs[index].classList.add("active");

    // Background
    backgrounds.forEach(bg => bg.classList.remove("active"));

    document
        .getElementById("bg-" + tabs[index].dataset.bg)
        .classList.add("active");

    // Text
    heroTitle.textContent = tabs[index].dataset.title;
    heroDescription.textContent = tabs[index].dataset.description;

}

// Hover Events
tabs.forEach((tab,index)=>{

    tab.addEventListener("mouseenter",()=>{

        current = index;
        changeHero(current);

    });

});

// Start on first slide
changeHero(0);

// Auto change every 8 seconds
setInterval(()=>{

    current++;

    if(current >= tabs.length){

        current = 0;

    }

    changeHero(current);

},3000);

// this part is for sidebar active nav
const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.id;
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});

// Culture Tabs JS anim

const cultureTabs = document.querySelectorAll(".culture-tab");
const cultureArticles = document.querySelectorAll(".culture-article");

cultureTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        cultureTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        cultureArticles.forEach(article => {
            article.classList.remove("active");
        });

        document
            .getElementById("culture-" + tab.dataset.culture)
            .classList.add("active");

    });

});

// Scroll Reveals

const timelineItems = document.querySelectorAll(".timeline-item");

function revealTimeline(){

    const triggerPoint = window.innerHeight * 0.8;

    timelineItems.forEach(item =>{

        const top = item.getBoundingClientRect().top;

        if(top < triggerPoint){

            item.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealTimeline);
window.addEventListener("load", revealTimeline);

// Compare Section Cards 
// =====================================
// COMPARE SECTION
// =====================================

// Cards
const compareCards = document.querySelectorAll(".compare-card");

// Detail Panel
const compareDetails = document.querySelector(".compare-details");

const compareTitle = document.getElementById("compare-title");
const compareDescription = document.getElementById("compare-description");
const compareDifficulty = document.getElementById("compare-difficulty");
const compareCost = document.getElementById("compare-cost");
const compareBest = document.getElementById("compare-best");
const compareOlympic = document.getElementById("compare-olympic");

// Compare Data
const compareData = {

    surf:{

        title:"Surfboarding",

        description:"The original boardsport. Surfing combines athletic skill, ocean knowledge and a laid-back beach lifestyle that has influenced fashion, music and travel worldwide.",

        difficulty:"85",

        cost:"70",

        best:"Ocean & Beaches",

        olympic:"Yes (2020)",

        stampTitle:"THE",

        stampSubtitle:"ORIGIN",

        stampColor:"#FF7A00"

    },

    skate:{

        title:"Skateboarding",

        description:"Born from surfing, skateboarding evolved into one of the world's biggest street cultures, inspiring art, fashion, music and urban communities.",

        difficulty:"60",

        cost:"40",

        best:"Streets & Skateparks",

        olympic:"Yes (2020)",

        stampTitle:"STAFF",

        stampSubtitle:"FAVOURITE",

        stampColor:"#222222"

    },

    snow:{

        title:"Snowboarding",

        description:"Snowboarding combines speed, freestyle tricks and mountain adventure. It has become one of the most exciting Winter Olympic sports.",

        difficulty:"90",

        cost:"95",

        best:"Mountains",

        olympic:"Yes (1998)",

        stampTitle:"MOST",

        stampSubtitle:"FUN",

        stampColor:"#5EB7FF"

    }

};

// Card Click Events
compareCards.forEach(card=>{

    card.addEventListener("click",()=>{

        // Remove active card
        compareCards.forEach(c=>{

            c.classList.remove("active");

        });

        // Restart stamp animation
        void card.offsetWidth;

        card.classList.add("active");

        // Get sport
        const sport = compareData[card.dataset.card];
        const stamp = card.querySelector(".award-stamp");

        const stampTitle = stamp.querySelector(".stamp-title");

        const stampSubtitle = stamp.querySelector(".stamp-subtitle");

        // Update text
        compareTitle.textContent = sport.title;

        compareDescription.textContent = sport.description;

        animateBar(
            difficultyFill,
            compareDifficulty,
            sport.difficulty
        );

        animateBar(
            costFill,
            compareCost,
            sport.cost
        );  

        compareBest.textContent = sport.best;

        compareOlympic.textContent = sport.olympic;

        // Update stamp
        stampTitle.textContent = sport.stampTitle;

        stampSubtitle.textContent = sport.stampSubtitle;

        stamp.style.borderColor = sport.stampColor;
        stamp.style.color = sport.stampColor;

        document.documentElement.style.setProperty(
            "--stamp-color",
            sport.stampColor
        );

        // Show details
        compareDetails.classList.add("show");

        staggerReveal();

    });

});

// ---------- Loader ----------

const loader = document.getElementById("loader");
const loaderLogo = document.querySelector(".loader-logo");
const loaderTagline = document.querySelector(".loader-tagline");
const loaderBar = document.querySelector(".loader-progress-fill");

loaderLogo.style.opacity = "1";
loaderLogo.style.transform = "translateY(0)";

setTimeout(function(){

    loaderTagline.style.opacity = "1";
    loaderTagline.style.transform = "translateY(0)";

},400);

let progress = 0;

const loading = setInterval(function(){

    progress++;

    loaderBar.style.width = progress + "%";

    if(progress >= 100){

        clearInterval(loading);

        setTimeout(function(){

            loader.classList.add("hide");

        },400);

    }

},18);

// ===============================
// BOARDSPORTS MASCOT
// ===============================

// Fact headings + mascot image

const messages = [

    {
        heading: "DID YOU KNOW?",
        image: "images/lil guy 2.png"
    },

    {
        heading: "FUN FACT!",
        image: "images/lil guy 2.png"
    },

    {
        heading: "EDITOR'S NOTE",
        image: "images/lil guy 3.png"
    },

    {
        heading: "BOARD TIP",
        image: "images/lil guy 3.png"
    },

    {
        heading: "TRIVIA TIME!",
        image: "images/lil guy.png"
    },

    {
        heading: "INSIDER INFO",
        image: "images/lil guy 2.png"
    },

    {
        heading: "LEGEND SAYS...",
        image: "images/lil guy.png"
    },

    {
        heading: "WAVE REPORT",
        image: "images/lil guy.png"
    }

];

// Magazine facts

const facts = [

    "Surfing became an Olympic sport at the Tokyo 2020 Games.",

    "Sherman Poppen invented the first snowboard in 1965 and called it the Snurfer.",

    "Skateboarding began because surfers wanted something to ride when the waves were flat.",

    "Tony Hawk landed the world's first documented 900 at the 1999 X Games.",

    "Many early skateparks were actually empty swimming pools.",

    "The X Games helped introduce millions of people to boardsports around the world.",

    "Surf culture inspired fashion brands like Billabong, Rip Curl and Quiksilver.",

    "Snowboarding was once banned from many ski resorts before becoming mainstream.",

    "The first televised skateboarding competition took place in Anaheim, California.",

    "Modern boardsports all share roots in surfing."

];

// Grab HTML elements

const mascot = document.getElementById("mascot");
const factHeading = document.getElementById("fact-heading");
const factText = document.getElementById("fact-text");

// Keep track of current fact

let currentFact = 0;

// ===============================
// Change mascot message
// ===============================

function changeMascotFact(){

    // Fade out text

    factHeading.style.opacity = "0";
    factText.style.opacity = "0";

    // Bounce mascot

    mascot.classList.add("bounce");

    // Wait before changing

    setTimeout(function(){

        // Pick random heading

        const randomMessage =
            messages[Math.floor(Math.random() * messages.length)];

        // Change heading

        factHeading.textContent =
            randomMessage.heading;

        // Change mascot image

        mascot.src =
            randomMessage.image;

        // Change fact

        currentFact++;

        if(currentFact >= facts.length){

            currentFact = 0;

        }

        factText.textContent =
            facts[currentFact];

        // Fade back in

        factHeading.style.opacity = "1";
        factText.style.opacity = "1";

    },400);

}

// ===============================
// Remove bounce animation
// ===============================

mascot.addEventListener("animationend", function(){

    mascot.classList.remove("bounce");

});

// ===============================
// Change every 7 seconds
// ===============================

setInterval(changeMascotFact,7000);



// ===============================
// GAMEEEE VARIABLES
// ===============================

const player = document.getElementById("player");
const startButton = document.getElementById("start-game");
const scoreText = document.getElementById("score");

const gameOverScreen =
    document.getElementById("game-over-screen");

const restartButton =
    document.getElementById("restart-game");

const finalScore =
    document.getElementById("final-score");

const stamp =
    document.getElementsByClassName("crash-stamp")

const gameArea =
    document.getElementById("game-area");

let score = 0;
let scoreTimer;

let playerX = 315;
let playerY = -120;

let movingLeft = false;
let movingRight = false;

let gameRunning = false;

let gameLoopID;
let obstacleSpawner;

// ==========================
// OBSTACLES
// ==========================

let obstacles = [];
let obstacleTimer;

function spawnTree(){

    const tree = document.createElement("img");

    tree.src = "images/treeSprite.png";

    tree.classList.add("tree");

    const maxSpawnX = gameArea.clientWidth - 80;

    const x = Math.random() * maxSpawnX;

    tree.style.left = x + "px";
    tree.style.top = "-80px";

    document.getElementById("game-area").appendChild(tree);

    obstacles.push({

        element: tree,

        x: x,

        y: 720,

        speed: 5

    });

}

function updateObstacles(){

    for(let i = obstacles.length - 1; i >= 0; i--){

        obstacles[i].y -= obstacles[i].speed;

        obstacles[i].element.style.top =
            obstacles[i].y + "px";

        if(obstacles[i].y < -80){

            obstacles[i].element.remove();

            obstacles.splice(i,1);

        }

    }

}

// ==========================
// KEYBOARD INPUT
// ==========================

document.addEventListener("keydown", function(event){

    if(event.key === "ArrowLeft" || event.key === "a"){

        movingLeft = true;

    }

    if(event.key === "ArrowRight" || event.key === "d"){

        movingRight = true;

    }

});

document.addEventListener("keyup", function(event){

    if(event.key === "ArrowLeft" || event.key === "a"){

        movingLeft = false;

    }

    if(event.key === "ArrowRight" || event.key === "d"){

        movingRight = false;

    }

});

// ==========================
// MOBILE CONTROLS
// ==========================

const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");

leftBtn.addEventListener("touchstart", () => {

    movingLeft = true;

});

leftBtn.addEventListener("touchend", () => {

    movingLeft = false;

});

rightBtn.addEventListener("touchstart", () => {

    movingRight = true;

});

rightBtn.addEventListener("touchend", () => {

    movingRight = false;

});

// ==========================
// GAME LOOP
// ==========================

function playerDrop(){

    let rotation = -180;

    const drop = setInterval(function(){

        playerY += 8;
        rotation += 8;

        player.style.top = playerY + "px";
        player.style.transform =
            "rotate(" + rotation + "deg)";

        if(playerY >= 120){

            clearInterval(drop);

            player.style.transform = "rotate(0deg)";

            gameRunning = true;

            obstacleTimer = setInterval(spawnTree,1000);

            gameLoop();

        }

    },16);  

}

const countdown = document.getElementById("countdown");

function startGame(){

    if(gameRunning){

        return;

    }

    score = 0;
    scoreText.textContent = "0000";

    startButton.disabled = true;

    const numbers = ["3","2","1","GO!"];

    let index = 0;

    countdown.style.opacity = "1";
    countdown.textContent = numbers[index];

    const timer = setInterval(function(){

        index++;

        if(index < numbers.length){

            countdown.textContent = numbers[index];

        }
        else{

            clearInterval(timer);

            countdown.style.opacity = "0";

            playerDrop();

            scoreTimer = setInterval(updateScore, 100);

            startButton.textContent = "PLAYING";

        }

    },1000);

}

startButton.addEventListener("click", startGame);

let particleFrame = 0;


function gameLoop(){

    const maxX = gameArea.clientWidth - player.offsetWidth;

    if(!gameRunning){

        return;

    }


    particleFrame++;

    if(particleFrame >= 4){

        particleFrame = 0;

        createSnowParticle();

    }

    if(movingLeft){

        playerX -= 6;

    }

    if(movingRight){

        playerX += 6;

    }

    if(playerX < 0){

        playerX = 0;

    }

    if(playerX > maxX){

        playerX = maxX;

    }

    player.style.left = playerX + "px";

    updateObstacles();

    checkCollisions();

    gameLoopID = requestAnimationFrame(gameLoop);

}

function updateScore(){

    if(!gameRunning){

        return;

    }

    score++;

    scoreText.textContent =
        score.toString().padStart(4, "0");

    if(score % 50 === 0){

    createScorePopup();

}

}

function checkCollisions(){

    const playerRect = player.getBoundingClientRect();

    for(let i = 0; i < obstacles.length; i++){

        const obstacleRect =
            obstacles[i].element.getBoundingClientRect();

        if(

            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top

        ){

            gameOver();

            return;

        }

    }

}

function gameOver(){

    gameRunning = false;

    clearInterval(obstacleTimer);

    cancelAnimationFrame(gameLoopID);

    gameArea.classList.add("shake");

    setTimeout(function(){

        gameArea.classList.remove("shake");

    },350);

    finalScore.textContent =
    score.toString().padStart(4, "0");

    gameOverScreen.classList.add("show");

    stamp.classList.add("show");

    clearInterval(scoreTimer);

}

restartButton.addEventListener("click", restartGame);

function restartGame(){

    obstacles.forEach(obstacle =>{

        obstacle.element.remove();

    });

    obstacles = [];

    playerX = 315;
    playerY = 120;

    player.style.left = playerX + "px";
    player.style.top = playerY + "px";

    score = 0;

    scoreText.textContent = score;

    gameOverScreen.classList.remove("show");

    startButton.disabled = false;
    startButton.textContent = "PLAY";

}

function createSnowParticle(){

    const particle = document.createElement("div");

    particle.className = "snow-particle";

    particle.style.left =
        (playerX + 40 + Math.random()*20) + "px";

    particle.style.top =
        (playerY - 10) + "px";

    particle.style.setProperty(
        "--drift",
        (Math.random()*40-20) + "px"
    );

    gameArea.appendChild(particle);

    setTimeout(function(){

        particle.remove();

    },800);

}

function createScorePopup(){

    const messages = [

        "SHREDDING!",
        "SMOOTH LINE!",
        "CARVING!",
        "RADICAL!",
        "SEND IT!",
        "STYLISH!",
        "BIG AIR!",
        "FULL SEND!",
        "FRESH POWDER!",
        "NAILED IT!",
        "KEEP RIDING!",
        "LOOKING GOOD!",
        "BOARDSPORTS APPROVED!",
        "EDITOR'S PICK!",
        "PRO LEVEL!",
        "WHAT A RUN!",
        "PERFECT LINE!",
        "AMAZING CONTROL!"

    ];

    const popup = document.createElement("div");

    popup.className = "score-popup";

    popup.textContent =
        messages[Math.floor(Math.random() * messages.length)];

    // Random position near the player
    popup.style.left =
        (playerX + 70 + Math.random() * 80 - 40) + "px";

    popup.style.top =
        (playerY - 20) + "px";

    const colours = [

    "#F97316",
    "#FFCC00",
    "#4CAF50",
    "#00BCD4",
    "#E91E63"

    ];

    popup.style.color =
        colours[Math.floor(Math.random() * colours.length)];

    popup.style.transform =
        `translate(-50%,0) rotate(${Math.random()*20-10}deg)`;

    gameArea.appendChild(popup);

    setTimeout(function(){

        popup.remove();

    },900);

}

gameLoop();


// ---------- MOBILE MENU ----------

const menuToggle = document.getElementById("menu-toggle");
const sidebarLinks = document.querySelector(".sidebar-links");

window.addEventListener("scroll", function(){

    if(window.scrollY < 150){

        mascot.style.opacity = "0";

    }
    else{

        mascot.style.opacity = "1";

    }

});

menuToggle.addEventListener("click", function(){

    sidebarLinks.classList.toggle("open");

    if(sidebarLinks.classList.contains("open")){

        menuToggle.textContent = "✕";

    }
    else{

        menuToggle.textContent = "☰";

    }

});

const mobileLinks = document.querySelectorAll(".sidebar-links a");

mobileLinks.forEach(function(link){

    link.addEventListener("click", function(){

        sidebarLinks.classList.remove("open");

    });

});

// SURVEY LAST MINUTE ADDITION

const surveyForm = document.getElementById("survey-form");

const surveyMessage = document.getElementById("survey-message");

const thankTitle = document.getElementById("thank-you-title");

const thankText = document.getElementById("thank-you-text");

surveyForm.addEventListener("submit",function(e){

    e.preventDefault();

    const name =
        document.getElementById("reader-name").value;

    const sport =
        document.querySelector('input[name="sport"]:checked').value;

    thankTitle.textContent =
        `Thank You, ${name}!`;

    thankText.textContent =
        `Your vote for ${sport} has officially been received by our editorial team.`;

    surveyForm.style.display = "none";

    surveyMessage.classList.add("show");

});