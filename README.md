![Logo](https://i.ibb.co/7C6N1Fz/Visual-Eyes-Banner.png)

# VisualEyes

Visualize your music production with VisualEyes - an interactive step sequencer that pairs visual effects to user inputs

## Screenshots

![App Screenshot](https://i.ibb.co/5r862KK/Visual-Eyes-SS1.png)
![App Screenshot](https://i.ibb.co/yncNKFs/Visual-Eyes-SS2.png)

## Features

- 4-piece drum sequencer 🥁
- Two monophonic sawtooth synthesizer sequencers 🤖
- Colour-coordinated sequence inputs 🌈
- Smooth transition between responsive modes 📱
- Tempo control between 60 - 180 BPM 💿

## Run Locally

Clone the project

```bash
  git clone git@github.com:karst-larsen/VisualEyes.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?

During project development, I came across Tone.js, a Web Audio framework that allows for in-browser music utilities such as synthesizers, effects, synchronized clocks, etc. This framework was unfamiliar to me, but in seeing the capabilities of Tone.js, I went through the documentation and learned how to use it to implement it into this project. There was definitely a learning curve and conflicting resources for how to use its methods. After much trial and error, I managed to get the framework to work as intended.

Learning Tone.js really helped me grow as a developer. In the short timeframe that I was given to create this project, I realized that exposure, iteration, and ultimately experimentation are key aspects to learning new frameworks. I hope to delve into new JavaScript frameworks in the near future! 🚀

## FAQ

#### What is a sequencer?

A sequencer is a digital audio recording tool that arranges music loops that the user programs in a "sequence". Each sequence has a series of steps, typically in a multiple of 4 (4, 8, 16, 32, 64, etc.). Sequencers allow for automation and iteration off of previously inputted data.

#### How do I use this thing?

Once the application is loaded, you'll see hundreds of little "steps" that can be clicked. Once clicked, a step will turn black, meaning that it is active. By pressing the play button on the top left of the screen, the sequencer will begin to loop, and selected notes will play.

## Feedback

If you have any feedback, please reach out to my channels!

- github.com/karst-larsen
- linkedin.com/karsten-larsen
