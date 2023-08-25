import { questions, questionsContainer, quiz, userName} from "./index.js"


export class Question {
  constructor(index){
    this.questions = questions;
    this.category = questions[index].category;
    this.questionsOfCount = questions.length;
    this.question = questions[index].question;
    this.correctAnswer = questions[index].correct_answer;
    this.incorrectAnswers = questions[index].incorrect_answers;
    this.index = index;
    this.checkAnswer = false;
    this.totalAnswer = [...this.incorrectAnswers , this.correctAnswer ];
  }

  
  displayQuestion(){
    let cartona = `
    <div id="quest" class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn">
      <div class="w-100 d-flex justify-content-between">
        <span class="btn btn-category">${this.category}</span>
        <span class="fs-6 btn btn-questions">${this.index + 1} of ${this.questionsOfCount} Questions</span>
      </div>
      <h2 class="text-capitalize h4 text-center">${this.question}</h2>  
      <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
        ${this.showAnswer(this.totalAnswer)}
      </ul>
      <h2 class="text-capitalize text-center score-color h3 fw-bold"><i class="bi bi-emoji-laughing"></i> Score: ${quiz.score} </h2>        
    </div>
    `;

    questionsContainer.innerHTML = cartona ;

    let resultItem = document.querySelectorAll(".question ul li");
    let quest = document.getElementById("quest");
    let resultArray = [...resultItem];

    for(let i = 0; i < resultArray.length ; i++) {
      resultArray[i].addEventListener("click",(e) =>{
        this.checkCorrectAnswer(e , quest)
      })
    }
  }

  
  showAnswer(array){
    let result = ``;
    for(let i=0 ; i< array.length ; i++){
      result += `<li>${array[i]}</li>`
    }
    return result ;
  }


  checkCorrectAnswer(e , quest){
    let innerResult = e.target.innerHTML;
    if(!this.checkAnswer){
      this.checkAnswer = true;

      if(innerResult === this.correctAnswer){
        quiz.score += 1 ;
        console.log("Correct");
        e.target.classList.add("correct" , "animate__animated" , "animate__rubberBand")
      }else{
        console.log("Not Correct");
        e.target.classList.add("wrong" , "animate__animated" , "animate__shakeX")
      }

    }

    setTimeout(() => {
      quest.classList.replace("animate__bounceIn" , "animate__bounceOutLeft")
      setTimeout(() =>{
        this.nextQuestion()
      },1000)
    }, 1000);
    // console.log(quest);


  }

  nextQuestion(){
    this.index += 1;
    if((this.index  === this.questionsOfCount) === false){
      console.log("game ==>");

      let nextQuestion = new Question(this.index);
      nextQuestion.displayQuestion();

    }else{
      console.log("Game Over");
      this.endQuestion()
      return ; 
    }
    // console.log(this.index + 1 , this.questionsOfCount );
    // console.log(this.index + 1 === this.questionsOfCount) ;
  }

  endQuestion(){
    let text = quiz.score  === this.questionsOfCount? `Congratulation` : `You will be compensated later`;
    let cartona = 
    `
    <div id="quest" class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn">
      <div class="w-100 d-flex justify-content-between">
        <span class="btn btn-category">${this.category}</span>
        <span class="fs-6 btn btn-questions"> ${this.questionsOfCount} Questions</span>
      </div> 
      <h2><i class="bi bi-emoji-laughing text-danger"></i> Game Over <i class="bi bi-emoji-laughing text-danger"></i></h2>
      <h2>${text}</h2>
      <h2>" ${userName} "</h2>
      <h2 class="text-capitalize text-center score-color h2 fw-bold"><i class="bi bi-emoji-laughing"></i> Score: ${quiz.score} </h2>        
      <button id="tryBtn" class="btn btn-danger text-white">Try Again</button>
    </div>
    `
    questionsContainer.innerHTML = cartona ;
    
    let tryBtn = document.getElementById("tryBtn");
    tryBtn.addEventListener("click" , function(){
      this.classList.add("animate__animated" , "animate__rubberBand")
      this.classList.replace("btn-danger" , "btn-success")
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
  }
  
}


