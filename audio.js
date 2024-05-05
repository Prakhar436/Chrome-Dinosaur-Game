export let dinoSFX = {
    jump: new Howl(
        {src: ['audio/sfx/dinoJump2.mp3'],
        volume: 0.4
        }
    ),
    stop: new Howl(
        {src: ['audio/sfx/error2.mp3']}
    )
}

export let bgMusic = new Howl(
    {src: ['audio/background_music/Alternate_Realities.mp3'], loop: true}
)
// bgMusic.fade(0, 1, 2000);
