sprites.onCreated(SpriteKind.Enemy, function (sprite) {
    sprite.setVelocity(-100, 0)
    sprite.setFlag(SpriteFlag.AutoDestroy, true)
    if (Math.percentChance(50)) {
        sprite.setImage(img`
            . . . . . f f f f f f f . . . . 
            . . . . . f 5 f 5 f 5 f . . . . 
            . . . . . f 5 f 5 f 5 f . . . . 
            . . . . . f 5 5 2 5 5 f . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . f f 8 8 8 9 f f . . . . 
            . . . . f 8 f 8 8 f 9 f f . . . 
            . . . f 4 4 4 8 8 4 4 5 f . . . 
            . . . f 4 f f 4 4 f f 5 f . . . 
            . . . f f 4 f f f f 5 f f . . . 
            . . . f f f 4 4 4 5 f f . . . . 
            . . . . f f f f f f f f . . . . 
            . f f f f f . . . . f f f f f . 
            . f 4 4 4 f . . . . f 4 4 4 f . 
            . f f f f f . . . . f f f f f . 
            . . . . . . . . . . . . . . . . 
            `)
    } else {
        sprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . 1 1 . 
            . . . . . . . . 1 1 . . 1 . . . 
            . . . . f f f 1 1 . . 1 . . . . 
            . . f f 1 1 1 1 f 1 1 . . . 1 . 
            . . f 1 1 1 1 1 1 1 f 1 1 1 1 . 
            . . f 1 1 1 f f 1 1 1 1 1 . . . 
            . . f 1 f 1 1 1 1 1 1 1 . . . . 
            . . f 1 f 1 f f f 1 1 1 . . . . 
            . . f 1 1 1 f 1 1 1 1 f . . . . 
            . . . f f 1 f 1 1 1 1 f . . . . 
            . . . . f 1 1 1 1 1 f f . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f f . . . f f f . . . 
        . . . . f 5 f f . . f 2 f f . . 
        . f f f f 5 5 f f f 2 2 2 f . . 
        . f 5 5 f 5 5 f 2 2 2 2 f f . . 
        . f 5 5 f f f f 1 2 2 2 f . . . 
        . f 5 5 f 1 1 f 1 1 2 f . . . . 
        . f f f 2 1 f f f 1 2 f . . . . 
        . f 9 9 9 1 1 f 1 1 2 f . . . . 
        . . f 2 9 9 1 1 1 2 2 f . . . . 
        . . f 2 2 2 2 2 2 2 f f . . . . 
        . . f 2 2 f f f f f f . . . . . 
        . . f f f . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 50, 0)
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
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . f f f f . . . . . . f f f f . 
    . f 3 3 3 f f f f f f 3 3 3 f . 
    . f 3 3 f f 3 3 3 3 3 3 3 3 f . 
    . f 3 f f 3 1 3 3 3 1 3 3 3 f . 
    . f 3 f 3 3 1 3 3 3 1 3 3 f f . 
    . . f 3 3 3 f 3 f 3 f f f f . . 
    . . f f f 3 f 3 f 3 f f 2 2 f . 
    . . f 2 2 f f 3 f 3 f 2 2 2 f . 
    . . f 2 2 2 f 3 f 3 f 2 2 2 f . 
    . . f 2 2 2 f 3 3 f 2 2 2 2 f . 
    . . f 2 2 2 2 f 3 f 2 2 2 f . . 
    . . . f 2 2 2 f f f 2 2 f f . . 
    . . . f f f f . . . f f . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
info.setLife(3)
scene.setBackgroundImage(img`
    fffffffff999999999999999999999999999999999999999999999999999999999999999999999fffffffffffff111111111111111111111111111111111111111111111111111111111ffffffffff88
    fffffffff9999999999999999999999999999999999999999999999999999999999999999999fffffffffffffff111111111111111111111111111111111111111111111111111111111ffffffffff88
    ffffffffff9999999999999999999999999999999999999999999999999999999999999999fffffffffffffffff1111111111111111111111111111111111111fffffff1111111111111ffffffffff88
    ffffffffff999999999999999999999999999999999999999999999999999999999999999ffffffffffff11111111111111fffffff111111111111111111111ffffffff1111111111111ffffffffff88
    1ffffffffff99999999999999999999999999999999999999999999999999999999999999ffffffffff111111111111111ffffffff111111111111111111111ffffffff1111111111111ffffffffff88
    111fffffffff999998888899999999999999999999999999999999999999999999999999ffffffffff111111111111111fffffffff11111111111111111111fffffffff1111111111111ffffffffff88
    1111ffffffff9999988888ffff9999999999999999999999999999999999999999999999ffffffff11111111111111111fffffffff11111111111111fffffffffffffff111111111111111ffffffff88
    11111fffffff9999988888ffff9999999999999999999999999999999999999999999999ffffff1111111111111111111fffffffff1111111111111ffffffffffffffff111111111111111ffffffff88
    111fffffffff9999888888ffff9999999999999999999999999999999999999999999999ffffff1111111111111111111fffffffff111111111111fffffffffffffffff111111111111111ffffffff88
    1fffffffffff9999888888ffff9999999999999999999999999999999999999999999999fffff11111111111111111111fffffffff1111fffff11ffffffffffffffffff111111111111111ffffffff88
    1fffffffffff9999888888ffff9999999999999999999999999999999999999999999999fffffff111111111111111111fffffffff1111fffff1ffffffffffffffffff1111111111111111fffffff888
    1fffffffffff999988888fffff9999999999999999999999999999999999999999999999fffffff111111111111111111ffffffff11111ffffffffffffff111ffffff11111111111111111fffffff888
    1ffffffffff999988888ffffff999999999999999999999999999999999999999999999ffffffff1111111111111111111111111111111fffffffffffff11111111111111111111111111ffffffff888
    1ffffffffff999988888ffffff99999999999999999999999999999999999999999999fffffffff1111111111111111111111111111111ffffffffffff111111111111111111111111111fffffff8888
    1ffffffffff99988888fffffff9999999999999999999999999999999999999999999ffffffffff1111111111111111111111111111111fffffffffff1111111111111111111111111111ffffff88888
    111111fffff99988888fffffff9999999999999999999999999999999999999999999fffffffff11111111111111111111111111111111ffffffffff1111111111111111111111111111fffffff88888
    11111ffffff99888888ffffff9999999999999999999999999999999999999999999ffffffffff111111111111111111111111111111111ffffffff1111111111111111111111111111ffffffff88888
    1111fffffff98888888ffffff9999999999999999999999999999999999999999999fffffff1111111111111111111111111111111111111ffffff11111111111111111111111111111fffffff888888
    111ffffffff9888888fffffff999999999999999999999999999999999999999999fffffff1111111111111111111111111111111111111111111111111111111111111111111111ffffffffff888889
    fffffffffff8888888fffffff999999999999999999999999999999999999999999fffffff1111111111111111111111111111111111111111111111111111111111111111111111fffffffff8888899
    ffffffffff98888888fffffff99999999999999999999999999999999999999999fffffff1111111111111111111111111111111111111111111111111111111111111111111111fffffffff88888899
    ffffffffff9888888ffffffff99999999999999999999999999999999999999999fffffff111111111111111111fffff11111111111fffff11111111111111111ffffff1111111ffffffffff88888999
    fffffffff99888888ffffffff99999999999999999999999999999999999999999ffffff111111111111111111ffffff11111111111ffffff111111111111111fffffff111111ffffffffff888888999
    fffffff999888888fffffffff99999999999999999999999999999999999999999ffffff111111111111111111ffffff1111111111fffffff11111111111111ffffffffffffffffffffff88888889999
    fffffff99888888ffffffffff99999999999999999999999999999999999999999ffffff11111111111111111fffffff111111111ffffffff11111111111111fffffffffffffffffffff888888889999
    ffffff99988888fffffffffff99999999999999999999999999999999999999999fffffff111111fffff1111ffffffff11111111fffffffff1111111fffff1fffffffffffffffffffff8888888889999
    ffff9999888888fffffffffff99999999999999999999999999999999999999999ffffffffffffffffff111fffffffff1111111fffffffffff1111ffffffffffffffffffffffffffff88888888899999
    9999999988888ffffffffffff999999999999999999999999999999999999999999fffffffffffffffff1fffffffffff11111ffffffffffffff1fffffffffffffffffffffffffffff888888888999999
    9999999988888ffffffffffff999999999999999999999fffffffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffffffffffffffffff88888888889999999
    9999999888888ffffffffffff99999999999999999fffffffffffffffffffffffffffffffffffffffffffffffffffffff11ffffffffffffffffffffffffffffffff88888fffff8888888888899999999
    999999988888fffffffffffff999999999999fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9fffffffffffffffffffff888888888888888888888999999999
    999999888888fffffffffffff99999999999fffffffffffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffff999fffffffffffffffffff8888888888888888888889999999999
    99999988888ffffffffffffff9999999999ffffffffffffffffffffffffffffffffffffffffff99ffffffffff999fffffffffffff999999ffffffffffffffffff8888888888888888888999999999999
    9999998888fffffffffffffff999999999fffffffffffffffffffffffffffffffffffffffffffffffffffff99999ffffffffffff9999999fffffffffffffffff88888888888888888889999999999999
    9999988888ffffffff6ffffff9999999fffffffffffffffffffffffffffffffffffffffffffffffffffff99999999ffffffffff9999999ffffffffffffffff8888888888888888888999999999999999
    999998888ffffffff66ffffff999999ffffffffffffffff4444555ffffffff444fffffffffffffffffffff99999999999999999999999fffffffffffffffff8888888899999999999999999999999999
    999988888fffffff666fffffff9999fffffffffffff44455555555555fffff444444ffffffffffffffffffff99999999999999999999ffffffffffffffffff8888899999999999999999999999999999
    99998888ffffffff66ffffffff999ffffffffff444445555555555555555555544444444ffffffffffffffffff999999999999999999ffffffffffffffffff8888999999999999999999999999999999
    9998888fffffffff67ffffffff99ffffffffff444445555555555555555555555555444444fffffffffffffffff9999999999999999ffffffffffffffffff88888999999999999999999999999999999
    998888fffffffff677ffffffff9fffffffff44444455555555555555555555555555554444444fffffffffffffff99999999999999fffffffffffffffffff88889999999999999999999999999999999
    998888ffffffff6677ffffffff9ffffffff44444455555555555555555555555555555544444444444fffffffffff9999999999999fffffffffffffffffff88889999999999999999999999999999999
    99888ffffffff66677ffffffffffffffff4444445555555555555544444444444444444544445444444fffffffffff99999999999ffffffffffff6fffffff88889999999999999999999999999999999
    9888ffffffff666777fffffffffffffff4444455555555555555444444444444444444444555554444444ffffffffff9999999999fffffffffff66ffffff888888999999999999999999999999999999
    9888fffffff6666777ffffffffffffff444445555555555555444444444444444444444444555554444444fffffffff999999999ffffffffff7666ffffff888888999999999999999999999999999999
    888ffffffff6667777ffffffffffffff44445555555555554444444444444555555554444455555544444444ffffffff9999999fffffffff777666ffffff888888999999999999999999999999999999
    888fffffff66667777ffffffffffffff444455555555555444444455555555555555554444455555544444444fffffffff99999ffffffff7777666ffffff888888999999999999999999999999999999
    88fffffff666667777ffffffffffff444444555555555544444445555555555555555554444455555555444444fffffffff999fffffffff7777666ffffff888888999999999999999999999999999999
    88fffffff666677777ffffffffffff444445555555555444444445555555555555555555444444555555554444fffffffff999ffffffff77777666ffffff888888999999999999999999999999999999
    8ffffffff6666777777fffffffffff4444555555555544444445555555555555555555555444444555555554444fffffffff9fffffffff77777666ffffff888888999999999999999999999999999999
    ffffffff66667777777ffffffffff44444555555555444444555555555555555555555555544444555555555444fffffffff9fffffffff77777666ffffff888888899999999999999999999999999999
    ffffffff666677777777fffffffff44445555555554444445555555555544444455555555555444555555555444ffffffffffffffffff777777666ffffff888888899999999999999999999999999999
    ffffffff666677777777ffffffff444445555555554444445555555555444444444555555555444455555555544444fffffffffffffff777777666ffffff888888899999999999999999999999999999
    fffffff6666677777777ffffffff444445555555544445555555555554444444444455555555444455555555544444ffffffffffffff7777777666ffffff888888899999999999999999999999999999
    fffffff6666777777777ffffffff444445555555544445555555555544444444444455555555544455555555544444ffffffffffffff777777.766ffffff888888899999999999999999999999999999
    ffffff666667777777777fffffff444445555555544455555555555444445555544445555555544455555555554444ffffffffffffff7777777766ffffff888888899999999999999999999999999999
    fffff6666677777777777fffffff44444555555554445555555555544445555554444555555554445555555555444444fffffffffff77777777766ffffff888888889999999999999999999999999999
    fffff6666677777777777fffffff44444555555544445555555555444455555555444455555554444555555555544444fffffffffff77777777766ffffff888888889999999999999999999999999999
    ffff66666777777777777fffffff444445555555444455555555554444555555554444455555544445555555555444444ffffffffff77777777766fffffff88888889999999999999999999999999999
    ffff66666777777777777fffffff444445555555444455555555444445555555555444455555554444555555555544444fffffffff777777777766fffffff88888889999999999999999999999999999
    fff666666777777777777fffffff444445555555444455555555444445555555555544455555554444555555555544444ffffffff7777777777766fffffff88888889999999999999999999999999999
    fff6666667777777777777ffffff444445555555444455555555444455555555555544455555554444555555555544444ffffffff7777777777776fffffff88888889999999999999999999999999999
    fff6666677777777777777ffffff444455555555444455555555444455555555555544455555555444555555555554444ffffffff7777777777776fffffff88888889999999999999999999999999999
    fff6666777777777777777ffffff444455555555444455555555444455555555555544455555555444555555555554444fffffff7777777777777666fffff88888888999999999999999999999999999
    fff6666777777777777777ffffff444445555555444455555555444455555555555544455555555444555555555554444fffffff7777777777777666fffff88888888999999999999999999999999999
    fff66667777777777777777fffff444445555555444445555555444455555555555544455555554444555555555554444ffffff77777777777777766ffffff8888888999999999999999999999999999
    ff666677777777777777777ffffff44445555555444445555555444455555555444544455555554444555555555554444ffffff77777777777777766ffffff8888888999999999999999999999999999
    f6666677777777777777777ffffff4444455555544444555555544445555555544444445555555444555555555554444fffff7777777777777777766ffffff8888888899999999999999999999999999
    76666677777777777777777ffffff4444455555544444555555544455555555544444445555555444555555555554444fffff7777777777777777766ffffff8888888899999999999999999999999999
    766666777777777777777777fffff444445555555444455555554445555555554444444555555444455555555554444ffffff7777777777777777776fffffff888888899999999999999999999999999
    666667777777777777777777fffff444444555555444455555554444555555555544445555555444455555555554444fffff77777777777777777776fffffff888888899999999999999999999999999
    666667777777777777777777ffffff44444555555444445555554444455555555555555555555444455555555554444fffff777777777777777777766ffffff888888889999999999999999999999999
    666677777777777777777777ffffff44444555555544444555554444445555555555555555554444455555555544444ffff7777777777777777777766ffffff888888889999999999999999999999999
    666777777777777777777777ffffff4444445555554444455555554444455555555555555555444455555555544444fffff7777777777777777777766fffffff88888889999999999999999999999999
    667777777777777777777777ffffff444444455555444445555555544444555555555555555444455555555544444fffff77777777777777777777766fffffff88888889999999999999999999999999
    777777777777777777777777ffffff44444445555554444555555554444444555555555555444445555555554444ffffff77777777777777777777776fffffff88888889999999999999999999999999
    7777777777777777777777777ffffff4444445555554444455555555544444445555555554444455555555544444fffff777777777777777777777776ffffffff8888889999999999999999999999999
    7777777777777777777777777ffffff444444455555444444555555555444444444444444444455555555544444ffffff7777777777777777777777766fffffff8888888999999999999999999999999
    77777777777777777777777777fffffff444444555554444455555555555444444444444444455555555554444ffffff77777777777777777777777766ffffffff888888999999999999999999999999
    77777777777777777777777777fffffff444444555554444445555555555554444444444444555555555554444ffffff777777777777777777777777666fffffff888888899999999999999999999999
    777777777777777777777777777fffffff4444445555544444455555555555555555555555555555555554444fffffff7777777777777777777777776666ffffff888888899999999999999999999999
    777777777777777777777777777ffffffff444445555544444455555555555555555555555555555555554444ffffff77777777777777777777777776666fffffff88888899999999999999999999999
    777777777777777777777777777ffffffff444444455554444445555555555555555555555555555555544444fffff777777777777777777777777777666ffffffff8888889999999999999999999999
    7777777777777777777777777777ffffffff44444445555444444555555555555555555555555555555544444ffff7777777777777777777777777777666ffffffff8888889999999999999999999999
    7777777777777777777777777777fffffffff444444555554444445555555555555555555555555555554444fffff7777777777777777777777777777666fffffffff888889999999999999999999999
    7777777777777777777777777777fffffffff44444444455544444445555555555555555555555555554444fffff777777777777777777777777777776666ffffffff888889999999999999999999999
    77777777777777777777777777777fffffffff4444444444554444444555555555555555555555555544444ffff7777777777777777777777777777777666ffffffff888888999999999999999999999
    77777777777777777777777777777fffffffffff4444444444444444445555555555555555555555444444fffff7777777777777777777777777777777666fffffffff88888999999999999999999999
    777777777777777777777777777777fffffffffff44444444444444444445555555555555544445444444fffff777777777777777777777777777777776666ffffffff88888999999999999999999999
    777777777777777777777777777777fffffffffffff44444444444444444445444455554444444444444ffffff777777777777777777777777777777776666fffffffff8888899999999999999999999
    7777777777766667777777777777777ffffffffffffff44444444444444444444444444444444444444fffffff777777777777777777777777777777776666fffffffff8888899999999999999999999
    7777777777766667777777777777777ffffffffffffffffff44444444444444444444444444444444ffffffff77777777777777777777777777777777776666fffffffff888889999999999999999999
    777777777776666ffff7777777777777ffffffffffffffffffffffff444444444444444444fffffffffffffff77777777777777777777777777777777776666fffffffff888889999999999999999999
    777777777776666fffff7777777777777fffffffffffffffffffffffffffff4444444444fffffffffffffffff77fffff7777777777766667777777777777666ffffffffff88888889999999999999999
    777777777776666fffff7777777777777fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7777777777766667777777777777666ffffffffff88888888999999999999999
    7777777777766666fffff7777777777fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7777777ffff66666677777777777666fffffffffff8888888899999999999999
    7777777777766666ffffff777777777ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff66667777fffffff66677fffff7777666fffffffffff8888888889999999999999
    7777777777766666fffffff77777777ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff66667777fffffff66667ffffff777666ffffffffffff888888889999999999999
    77777777fffff666ffffffff7777777fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff666667777ffffffff6666fffffff776666ffffffffffff88888888999999999999
    7777ffffffffffffffffffffff77777fffffffffffffff77ffffffffffffffffffffffffffffff77ffffffffffffff666667777ffffffff66666ffffff776666ffffffffffff88888888899999999999
    7ffffffffffffffffffffffffff7777ffffffffffffffff7777777fffffffffffffffff777777777fffffffffffff6666677777fffffffff6666ffffffff6666fffffffffffff8888888889999999999
    ffffffffffffffffffffffffffff777ffffffffffffffff77777777777777ffffff7777777777777fffffffffffff6666677777ffffffffff666ffffffff6666ffffffffffffff888888889999999999
    fffffffffffffffffffffffffffff77ffffffffffffffff777777777777777777777777777777777fffffffffffff6666777777ffffffffff666fffffffff666ffffffffffffff888888888999999999
    fffffffffffffffffffffffffffffffffffffffffffffff66777777777777777777777777777666666677777fffff666677777ffffffffffff666ffffffff666fffffffffffffff88888888899999999
    fffffffffffffffeeefffffffffffffffffffffffffffff66666777666677777777777777777666666677777ffff666667777ffffffffffffff66fffffffffffffffffffffffffff8888888888999999
    fffffffffffffffeeefffffffffffffffffff77ffffffff6666666766666777777666666777666666667777fffff6666777fffffffffffffffff6ffffffffffffffffffffffffffff888888888899999
    77777777fffffffeeefffffffffffffffffff77777777776666666666666677776666666666666666667777fffff6666ffffffffffffffffffffffffffffffffffffffffffffffffff88888888899999
    7777777777fffffeeefffffffffffffffffff7777777777776666666666666776666666666666666667777ffffffffffffffffffffffeeeeffffffffffffffffffffffffffffffffffff888888889999
    7777777777fffffeeefffffffffffffffffff7777777777777776666676666666666676666666777777777ffffffffffffffffffffffeeeefffffffffffffffffffffffffffffffffffff88888888899
    7777777777fffffeeeffffff7ffffffffffff7777777777777777777777666666667777777777777777777ffffffffffffffffffffffeeeeffffffffffffffffffffffff777fffffffffff8888888889
    7776666777fffffeeeffffff777ffffffffff7777777777777777777777766666667666777777777777777ffffffffffffffffffffffeeeefffffffffffffffffffffff777777fffffffff8888888888
    7766666677fffffeeeefffff77777ffffffff7777777777777776666666667776666666677777777777777fffffffffffff7777fffffeeeefffffffffffffff777777777777777fffffffff888888888
    7766666667fffffeeeefffff766666fffffff7777777777777766666666666666666666666777776666777fffffffffff777777fffffeeeefffffffffffff77777777777776667ffffffffff88888888
    7666666666fffffeeeefffff66666667fffff7776666677777666666666666666666666666666666666677ffffffff777777777fffffeeeeffffffffff777776666777776666667ffffffffff8888888
    6666676666fffffeeeefffff66666666777777666666666666666667777666666677776666666666666677777766666776666666ffffeeeeefffff77777777766666777766666666666fffffff888888
    6666776666fffffeeeefffff6666666666666666666666666666667777777777777777776666666666666666766666666666666fffffeeeeefffff777777776666666776666666666666fffffff88888
    6666777777ffffffeeefffff6667666666666666666666666666777777777777777777777777777776666666666666666666666fffffeeeeefffff666777766666666666666766666666ffffffff8888
    7777777777ffffffeeefffff7777776666666666777777777777777777777777777777777777777777666666666666666666666fffffeeeeefffff666666666667666666667776666666fffffffff888
    7777777777ffffffeeeffffff777777777777777777777777777777777777777777777777777777777777766666777766666666fffffeeeeefffff6666666666677666666777777777777fffffffffff
    7777777777ffffffeeeffffff777777777777777777777777777777777777777777777777777777777777777777777777777777fffffeeeeefffff76666666667777777777777777777777ffffffffff
    7777777777ffffffeeeffffff777777777777777777777777777777777777777777777777777777777777777777777777777777fffffeeeeefffff777776666777777777777777777777777fffffffff
    `)
for (let index = 0; index <= 10; index++) {
    mySprite2 = sprites.create(img`
        . . . . f f f . . . . . . . . . 
        . . . . f 6 f f f . . . . . . . 
        . . . . f 6 7 6 f f . . . . . . 
        . . . . f 6 7 6 f 1 1 . . . . . 
        . . . f f 6 1 1 f f 1 f f . . . 
        . . . f 6 f f 1 6 f f 7 f . . . 
        . . f f 6 6 f 1 6 f f 7 7 f f . 
        . . f f 6 6 f f f 6 f f 7 7 f . 
        . . . . f f 6 f f 6 6 6 7 7 7 f 
        . . f f 6 6 6 6 6 7 7 7 7 7 f f 
        . . f 6 6 7 7 7 7 7 7 7 7 f f . 
        . . f f 6 6 6 7 f f f 7 7 7 7 f 
        . . . . f f 6 7 f e f f 7 7 f f 
        . . . . . f 6 f f e e f f f f . 
        . . . . . f f f f f e f . . . . 
        . . . . . . . . . f e f . . . . 
        `, SpriteKind.Food)
    mySprite2.setPosition(16 * index, 114)
}
game.onUpdateInterval(500, function () {
    enemy_sprite = sprites.create(img`
        f f 1 f . . . . . . . . . . . . 
        f 1 1 f f . . . f f f . f f f f 
        f 1 f 1 f f f f 2 2 f . f 1 1 f 
        f 1 f 1 f 2 2 2 f f f f f 1 1 f 
        f 1 1 f f f f f d d f f f f 2 2 
        . f f 2 2 f d d d d d d f f f f 
        f 2 2 2 f d f 1 d d f 1 f 2 2 2 
        f 2 2 2 f d f 1 d d f 1 d f 2 2 
        2 f f f f d f f d d f f f f f f 
        2 f f f f d d d d d d f 5 5 f 2 
        2 f 5 5 f f d d d d f 5 5 5 f 2 
        2 f 5 5 f f d d d d f 5 5 5 f . 
        2 f f 5 5 f f f f f f 5 5 5 f . 
        2 . f f 5 5 f f f f f 5 5 f . . 
        . . . f 5 5 f . . . f 5 f f . . 
        . . . . f f f . . . f f . . . . 
        `, SpriteKind.Enemy)
    enemy_sprite.setPosition(randint(0, 160), randint(0, 120))
})
