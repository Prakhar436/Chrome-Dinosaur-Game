# Chrome Dinosaur Game Remastered

This project is a remastered version of the classic Chrome Dinosaur Game, built entirely from scratch using JavaScript. The codebase is organized into a highly modular architecture, with each component—such as the player character, hurdles, background, and sound—encapsulated within its own module. This clean separation of concerns makes the game easy to maintain, extend, and debug.

Leveraging Object-Oriented Programming (OOP) concepts, the project efficiently manages multiple dino characters and stages logic, allowing each element to operate independently while seamlessly integrating into the overall game framework. Additionally, an event-driven architecture ensures loose coupling among modules, enabling dynamic communication and enhancing flexibility, scalability, and upgradability.
## Live Link

[Play the Chrome Dinosaur Game](https://chromedinogameremastered.netlify.app/)

## Features

### Technical Features

- **Object-Oriented Design:** Leverages OOP principles to encapsulate dino models, stage logic, and other core components into discrete, reusable classes. This promotes code clarity and facilitates future enhancements. For example, the Dino class contains essential properties and functions for the dinosaur character, and each dinosaur character option is represented as an instance of this class. All animated elements inherit from the Sprite class, containing core sprite animation functions.
- **Modular, Event-Driven Architecture:** Each component—such as the dinosaur, hurdles, background, and sound— is encapsulated within its own module. Each module communicates via an event system, ensuring low coupling and a clear separation of concerns. This minimizes interdependencies and simplifies debugging, updates, and scalability. 
- **Seamless Upgradability:** New dino models and stages can be added effortlessly by depositing assets into the appropriate directories and updating the centralized `config.js` file. This plug-and-play approach accelerates iterative development and feature integration.
- **Scalable Configurations:** The `config.js` file centralizes key parameters, streamlining adjustments and customizations. This not only speeds up development cycles but also supports agile enhancements for evolving project requirements.

### In-Game Features

- **Endless Gameplay:** Experience continuous gameplay as long as you can avoid getting hit.
- **Sprite-Based Animation:** The standard animation solution for complex shapes in a 2D environment.
- **Complete Day-Night Cycle:** Experience sunrise, sunset, dawn, dusk and everything in between with a realistic day-night cycle.
- **Speed Scaling:** Challenge your reflexes as the game progressively increases in pace.
- **Moving Background Objects:** Background objects add depth and immersion to the gameplay.
- **Background Music & Sound Effects:** A rich auditory experience with a matching soundtrack and sound cues.
