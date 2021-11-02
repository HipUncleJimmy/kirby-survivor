sprites.onCreated(SpriteKind.Enemy, function (sprite) {
    sprite.setVelocity(-50, 50)
    sprite.setFlag(SpriteFlag.AutoDestroy, true)
    if (Math.percentChance(50)) {
        sprite.setImage(assets.image`King dee dee dee`)
    } else {
        sprite.setImage(assets.image`Blob`)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`Waddle doo`, mySprite, 50, 0)
})
info.onLifeZero(function () {
    game.over(false)
    game.splash(info.highScore(), info.score())
    info.setLife(3)
    info.setScore(0)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
    sprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
    otherSprite.startEffect(effects.bubbles)
})
let enemy_sprite: Sprite = null
let projectile: Sprite = null
let mySprite2: Sprite = null
let mySprite: Sprite = null
mySprite = sprites.create(assets.image`Kirby`, SpriteKind.Player)
controller.moveSprite(mySprite)
info.setLife(3)
scene.setBackgroundImage(assets.image`Background`)
mySprite.setStayInScreen(true)
for (let index = 0; index <= 10; index++) {
    mySprite2 = sprites.create(assets.image`Background tree`, SpriteKind.Food)
    mySprite2.setPosition(16 * index, 114)
}
game.showLongText("Please dont spam the waddle doo to rack up points", DialogLayout.Bottom)
game.onUpdateInterval(500, function () {
    enemy_sprite = sprites.create(assets.image`Waddle dee`, SpriteKind.Enemy)
    enemy_sprite.setPosition(randint(0, 160), randint(0, 120))
})
