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

const saveAnswer = function(propertyName, answer) {
  answers[propertyName] = answer;
};

//NOTE: we cannot ask the next question until the previous one was answered
// it was suggested this would be simpler in a for loop versus a recursive call
// but a for loop would ask all the questions at once wwithout waiting, 
// we would have to implment a machanism to force a wait (until previous question answered)
//  like if NotValidAnswer (sleep 50 ms, and check again, retry if invalid answer given)
// using recursion allows us to chain the calls and call the next one from the callback of the previous
// and keeps it all event driven with callbacks
const askAndSaveAnswerRecursive = function(questionNumber) {
  if (questionNumber < 0) {
    questionNumber = 0;
  }
  const allQuestionsAsked = (questionNumber >= questions.length);
  if (allQuestionsAsked) {
    rl.close();
    writeParagraph(answers);
  } else {
    const theQuestion = questions[questionNumber];
    rl.question(theQuestion.question, (answer) => {
      const isAnswerValid = (answer.Length > 0);
      if (isAnswerValid) {
        saveAnswer(theQuestion.propertyName, answer);
        askAndSaveAnswerRecursive(questionNumber + 1);
      } else {
        askAndSaveAnswerRecursive(questionNumber);
      }
    });
  }
};

askAndSaveAnswerRecursive(0);




