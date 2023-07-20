const inquirer = require("inquirer");
const { Circle, Triangle, Square } = require("./shapes");
const fs = require("fs").promises;

const questions = [
  {
    name: 'characterNum',
    message: 'Type 3 characters you would like in the logo.',
    type: 'input',
    validate: input => {
      return input.length <= 3 ? true : 'Please use less than 3 characters.'
    }
  },
  {
    name: 'textColor',
    message: 'What color would you like your text to be?',
    type: 'input'
  },
  {
    type: 'list',
    name: 'logoShape',
    message: 'What shape would you like?',
    choices: ['Circle', 'Triangle', 'Square']
  },
  {
    name: 'shapeColor',
    message: 'What color would you like the shape to be?',
    type: 'input'
  }
];

class CLI {
  async run() {
    try {
      const answers = await inquirer.prompt(questions);

      let logo;
      switch (answers.logoShape) {
        case 'Circle':
          logo = new Circle(answers.shapeColor, answers.textColor, answers.characterNum);
          break;
        case 'Triangle':
          logo = new Triangle(answers.shapeColor, answers.textColor, answers.characterNum);
          break;
        case 'Square':
          logo = new Square(answers.shapeColor, answers.textColor, answers.characterNum);
          break;
      }

      const svg = logo.render();
      await fs.writeFile("logo.svg", svg);

      console.log("Generated new logo!")
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CLI;
