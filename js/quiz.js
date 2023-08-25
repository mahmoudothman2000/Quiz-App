 export class Quiz {
  constructor (category , difficulty , questionsNumber){
    this.category = category;
    this.difficulty = difficulty;
    this.questionsNumber = questionsNumber;
    this.score = 0;
  }

  async getDataApi(){
    let response = await fetch(`https://opentdb.com/api.php?amount=${this.questionsNumber}&category=${this.category}&difficulty=${this.difficulty}`)
    let result = await response.json();
    return result.results
  }
}









