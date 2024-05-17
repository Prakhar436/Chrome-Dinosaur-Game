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
//promise to check if audio is loaded
export let audioLoaded = new Promise((resolve, reject) => {
    bgMusic.once('load', resolve);
    bgMusic.once('loaderror', () => reject('Background music failed to load'));
})
// bgMusic.fade(0, 1, 2000);
