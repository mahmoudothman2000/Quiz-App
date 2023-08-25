import { Question } from "./question.js";
import { Quiz} from "./quiz.js";


const categoryMenu = document.getElementById("categoryMenu");
const difficultyOptions = document.getElementById("difficultyOptions");
export const questionsNumber = document.getElementById("questionsNumber");
const quizOptions = document.getElementById("quizOptions");

export let userName = document.getElementById("userName");

const startQuizBtn = document.getElementById("startQuiz");

export const questionsContainer = document.querySelector(".questions-container");
export let questions;
export let quiz;


startQuizBtn.addEventListener("click" , async function (){
  let category = categoryMenu.value;
  let difficulty = difficultyOptions.value;
  let numberOfQuestion = questionsNumber.value;
  let userNameValue = userName.value;


//Todo Check Validation To Input Value :
  if(validation(category , difficulty , numberOfQuestion , userNameValue)){
    userName = userNameValue ;
    quiz = new Quiz(category , difficulty , numberOfQuestion);
    questions = await quiz.getDataApi();
    console.log(questions);

    quizOptions.classList.replace( "animate__fadeInBottomLeft"  , "animate__backOutLeft");

    setTimeout(() => {
      let newQuestion = new Question(0);
      newQuestion.displayQuestion()
      console.log(newQuestion);
    }, 2000);
  }
  
})


//Todo Validation To Input Value :
function validation(category , difficulty , numberOfQuestion , userNameValue){
  if(category === ""){
    alert("category Not Valid");
  }else if (difficulty === ""){
    alert("difficulty Not Valid");
  }else if(numberOfQuestion === ""){
    alert("numberOfQuestion Not Valid");
  }else if (userNameValue === ""){
    alert("userName Not Valid");
  }else {return true;}
}

