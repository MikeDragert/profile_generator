const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let answers = {};
let questions = [{ question: `What is your name? Nicknames are also acceptable :) `, propertyName: 'name'},
                 { question: `What's an activity you like doing? `, propertyName: 'activity'},
                 { question: `What do you listen to while doing that? `, propertyName: 'listen'},
                 { question: `Which meal is your favourite (eg: dinner, brunch, etc)? `, propertyName: 'meal'},
                 { question: `What's your favourite thing to eat for that meal? `, propertyName: 'favouriteMealItem'},
                 { question: `Which sport is youir absolute favourite? `, propertyName: 'sport'},
                 { question: `What is your superpower? In a few words, tell us what you are amazing at! `, propertyName: 'superPower'}];

const writeParagraph = function(answers) {
  console.log(`\n\nHello, I'm ${answers.name} and I really, really like ${answers.activity}.  ` +
              `It is my favourite thing to do in the whole world! And it is even better if I do it while listening to ${answers.listen}.  ` +
              `I get ready for this by eating my favourite mean, ${answers.meal}.  Yummy!  ` +
              `I really love it when I get to eat ${answers.favouriteMealItem}!!!  ` +
              `While I'm eating it, getting ready to do ${answers.activity}, I usually watch my favourite sport ${answers.sport}.  ` +
              `It's incredible! How do they do that?.  But I have my own superpower.  ${answers.superPower}!!!!!!!`);
};

const allQuestionsAsked = function(questionNumber) {
  return questionNumber >= questions.length;
};

const isAnswerValid = function(answer) {
  return answer.length > 0;
};

const saveAnswer = function(propertyName, answer) {
  answers[propertyName] = answer;
};

const askAndSaveAnswer = function(questionNumber) {
  if (questionNumber < 0) {
    questionNumber = 0;
  }
  if (allQuestionsAsked(questionNumber)) {
    rl.close();
    writeParagraph(answers);
  } else {
    rl.question(questions[questionNumber].question, (answer) => {
      if (isAnswerValid(answer)) {
        saveAnswer(questions[questionNumber].propertyName, answer);
        askAndSaveAnswer(questionNumber + 1);
      } else {
        askAndSaveAnswer(questionNumber);
      }
    });
  }
};

askAndSaveAnswer(0);




