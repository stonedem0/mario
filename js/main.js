var game = new Phaser.Game(950, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});

function preload() {

    game.load.image('ground', 'assets/block.png');
    game.load.image('mushroom', 'assets/mush1.png');
    game.load.image('enemy', 'assets/enemy1.png');
    game.load.spritesheet('mario', 'assets/mario4.png', 20, 27);

}

var player;
var platforms;
var cursors;
var enemies;

var mushrooms;
var score = 0;
var scoreText;
var gameOverText;
var winText;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#626BCB';

    platforms = game.add.group();

    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 10, 'ground');

    ground.scale.setTo(4, 4);

    ground.body.immovable = true;

    var ledge = platforms.create(500, 150, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(150, 250, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(650, 500, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    var enemy = game.add.group();
    enemy.enableBody = true;
    enemies = enemy.create(10, 542, 'enemy');
    enemies.body.velocity.x = 100;
    player = game.add.sprite(32, game.world.height - 150, 'mario');

    game.physics.arcade.enable(player);

    player.body.bounce.y = 0;
    player.body.gravity.y = 380;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 8, true);
    player.animations.add('right', [5, 6, 7, 8], 8, true);

    mushrooms = game.add.group();
    mushrooms.enableBody = true;
    var mushroom = mushrooms.create(300, 565, 'mushroom');
    mushroom = mushrooms.create(430, 375, 'mushroom');
    mushroom = mushrooms.create(800, 475, 'mushroom');
    mushroom = mushrooms.create(180, 225, 'mushroom');
    mushroom = mushrooms.create(700, 125, 'mushroom');


    mushroom.body.gravity.y = 0;


    scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(mushrooms, platforms);

    game.physics.arcade.overlap(player, enemies, killMario, null, this);
    game.physics.arcade.overlap(player, mushrooms, collectStar, null, this);

    enemies.body.bounce.x = 0.9;

    enemies.body.collideWorldBounds = true;

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {

        player.body.velocity.x = -350;

        player.animations.play('left');
    }
    else if (cursors.right.isDown) {

        player.body.velocity.x = 250;

        player.animations.play('right');
    }
    else {
        player.animations.stop();

        player.frame = 4
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -450;
    }

}

function collectStar(player, star) {

    star.kill();

    score += 10;
    scoreText.text = 'Score: ' + score;
    if (score === 50) {
        winText = game.add.text(420, 300, 'YOU WON!', {fontSize: '32px', fill: '#000'});
        enemies.destroy();
    }
}

function killMario(player) {
    player.kill();
    gameOverText = game.add.text(420, 300, 'GAME OVER', {fontSize: '32px', fill: '#000'});
}
