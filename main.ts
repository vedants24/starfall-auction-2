namespace SpriteKind {
    export const Gold = SpriteKind.create()
    export const Silver = SpriteKind.create()
    export const Junk = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gold, function (sprite, other) {
    other.destroy(effects.confetti, 100)
    info.changeScoreBy(3)
    music.baDing.play()
    junkStreak = 0
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Silver, function (sprite, other) {
    other.destroy(effects.spray, 100)
    info.changeScoreBy(1)
    music.pewPew.play()
    junkStreak = 0
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Junk, function (sprite, other) {
    other.destroy(effects.fire, 100)
    info.changeScoreBy(-2)
    music.wawawawaa.play()
    junkStreak += 1
    if (junkStreak == 3) {
        game.showLongText("OVERLOADED! SHIP IS FROZEN", DialogLayout.Center)
        controller.moveSprite(ship, 0, 0)
        music.powerDown.play()
        pause(4000)
        controller.moveSprite(ship, 100, 0)
        junkStreak = 0
    }
})
info.onLifeZero(function () {
    game.over(false, effects.melt)
    music.bigCrash.play()
})
let crate: Sprite = null
let crateType = 0
let junkStreak = 0
let ship: Sprite = null
// 🚀 PLAYER
ship = sprites.create(img`
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c b . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . c 3 . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . 8 3 . . . . . . . 
    . . . . . . 8 8 1 a . . . . . . 
    . . . . . . 8 3 1 a . . . . . . 
    . . . . . c c c a a a . . . . . 
    . . . . 8 8 3 3 3 1 a a . . . . 
    . . 8 f f f c c a a f f a a . . 
    . 8 8 8 8 a a 3 3 3 3 1 3 a a . 
    8 8 8 8 8 8 a a 3 3 3 1 3 3 a a 
    8 8 8 8 8 8 a a 3 3 3 3 1 3 a a 
    `, SpriteKind.Player)
controller.moveSprite(ship, 100, 0)
ship.setPosition(80, 110)
info.setScore(0)
info.setLife(10)
info.startCountdown(90)
game.onUpdate(function () {
    for (let c of sprites.allOfKind(SpriteKind.Gold)) {
        if (c.y > 120) {
            c.destroy()
            info.changeLifeBy(-1)
            music.thump.play()
        }
    }
    for (let d of sprites.allOfKind(SpriteKind.Silver)) {
        if (d.y > 120) {
            d.destroy()
            info.changeLifeBy(-1)
            music.thump.play()
        }
    }
    for (let e of sprites.allOfKind(SpriteKind.Junk)) {
        if (e.y > 120) {
            e.destroy()
            info.changeLifeBy(-1)
            music.thump.play()
        }
    }
})
game.onUpdate(function () {
    if (info.score() >= 20) {
        game.over(true, effects.confetti)
        music.magicWand.play()
    }
})
game.onUpdateInterval(1000, function () {
    crateType = randint(0, 2)
    if (crateType == 0) {
        crate = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 5 4 . . . . . . 
            . . . . . . . 4 5 4 . . . . . . 
            . . . . 4 4 2 5 5 5 2 4 4 . . . 
            . . . . 4 5 5 5 1 5 5 5 4 . . . 
            . . . 2 2 5 5 5 1 5 5 5 2 2 . . 
            . . 4 4 5 5 5 1 1 1 5 5 5 4 4 . 
            . . 5 5 5 1 1 1 1 1 1 1 5 5 5 . 
            . . 4 4 5 5 5 1 1 1 5 5 5 4 4 . 
            . . . 2 2 5 5 5 1 5 5 5 2 2 . . 
            . . . . 4 5 5 5 1 5 5 5 4 . . . 
            . . . . 4 4 2 5 5 5 2 4 4 . . . 
            . . . . . . 2 4 5 4 2 . . . . . 
            . . . . . . . 4 5 4 . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, 0, 60)
        crate.setKind(SpriteKind.Gold)
    } else if (crateType == 1) {
        crate = sprites.createProjectileFromSide(img`
            . . . . . . . . 
            . . . 1 1 . . . 
            . 1 1 1 1 1 1 . 
            . 1 f f 1 1 1 1 
            . 1 1 f f 1 1 . 
            . . 1 1 1 1 1 . 
            . . . 1 1 1 . . 
            . . . . . . . . 
            `, 0, 60)
        crate.setKind(SpriteKind.Silver)
    } else {
        crate = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . b b d d d d b . . . 
            . . . . . b d d d d d d d c . . 
            . . . . c d d d d d d d d c . . 
            . . . c b d d d d d d d b c . . 
            . . . c b b d d d d b c c c . . 
            . . . . d b b b c c c c c c . . 
            . . . . c d d d d c c d d d . . 
            . . . . c c b b c c d d d d . . 
            . . . . . . . b c c d d d d . . 
            . . . . . . . c b c b d d d . . 
            . . . . . . . c b b b b b c . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, 0, 60)
        crate.setKind(SpriteKind.Junk)
    }
    crate.x = randint(0, 160)
})
