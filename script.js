let questions = [{ 'question':'Wer hat Javascript erfunden?',
                    'answer_1': 'Tim Berners-Lee',
                    'answer_2':'Brendan Eich',
                    'answer_3':'Guido van Rossum',
                    'answer_4':'Dennis Ritchie',
                    'right_answer': 2},
                 
                    {'question':'Was ist SQL?',
                    'answer_1': 'eine Datenbankabfragesprache',
                    'answer_2':'ein Audiobearbeitungsprogramm',
                    'answer_3':'ein Textverarbeitungsprogramm',
                    'answer_4':'ein Downloadtool',
                    'right_answer': 1}, 
                    
                    {'question':'Welches Laufwerk kann keine CDs lesen?',
                    'answer_1': 'DVD-Laufwerk',
                    'answer_2':'DVD-Brenner',
                    'answer_3':'CD_Brenner',
                    'answer_4':'Disketten-Laufwerk',
                    'right_answer': 4},

                    {'question':'Was wird an eine Grafikkarte angeschlossen?',
                    'answer_1': 'ein Scannerkabel',
                    'answer_2':'ein Druckerkabel',
                    'answer_3':'ein Mauskabel',
                    'answer_4':'ein Monitorkabel',
                    'right_answer': 4},

                ]

let currentQuestion = 0 
let actuallyQuestion = 1
let rightAnswers = 0

let AUDIO_RIGHT = new Audio('sounds/right.mp3');
let AUDIO_WRONG = new Audio('sounds/wrong.mp3');
/**
 * Loads The actually Question
 */
function init(){
    document.getElementById('allQuestions').innerHTML = `${questions.length}`
    document.getElementById('firstQuestion').innerHTML = `${actuallyQuestion}`
    showQuestion()
 
 }
/**
 * Renders the progress bar and the current question with the four diffrent answers
 */
function showQuestion(){

    if(gameIsOver()){
        showEndScreen()}
        else{
        updateToNextQuestion()
        updateProgressBar()
    }
}

/**
 * 
 * @returns if all question are answerd - game is over
 */

function gameIsOver(){
    return currentQuestion >= questions.length
}

/**
 * The progress bar becomes updated
 */

function updateProgressBar(){
    let percent = currentQuestion / questions.length
    percent =  Math.round(percent * 100) 

  document.getElementById('progressBar').innerHTML = `${percent}%`
  document.getElementById('progressBar').style.width = `${percent}%`  
}
/**
 * If a question is answerded, next question is loading
 */
function updateToNextQuestion(){
    let question = questions[currentQuestion] 
     
  document.getElementById('questiontext').innerHTML = `${question['question']}`
  document.getElementById('answer_1').innerHTML = `${question['answer_1']}`
  document.getElementById('answer_2').innerHTML = `${question['answer_2']}`
  document.getElementById('answer_3').innerHTML = `${question['answer_3']}`    
  document.getElementById('answer_4').innerHTML = `${question['answer_4']}`
}

/**
 * renders the endscreen after a game
 */

function showEndScreen(){
    document.getElementById('endScreen').style = ''
    document.getElementById('questionBody').style = 'display:none;'
    document.getElementById('totalQuestions').innerHTML = `${questions.length}`
    document.getElementById('rightAnswers').innerHTML = `${rightAnswers}`
}

/**
 * Defines the right answer
 * @param {string} selection 
 */
function rightAnswer(selection){
    let question = questions[currentQuestion] 
    let selectedQuestionNumber = selection.slice(-1);
    if(selectedQuestionNumber == question['right_answer']){
        rightAnswers++
    }
}

/**
 * Checks, if the choosed Answer is correct 
 * @param {string} selection 
 */
function answer(selection){
    let question = questions[currentQuestion] 
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`

    if(rightAnswerSelected(selectedQuestionNumber)){
        document.getElementById(selection).parentNode.classList.add('bg-success')
        AUDIO_RIGHT.play()
        changeButtonStatus()
    } else
    {document.getElementById(selection).parentNode.classList.add('bg-danger')
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success')
    AUDIO_WRONG.play()
    changeButtonStatus()}    
    rightAnswer(selection)
}

/**
 * @param {string} selectedQuestionNumber 
 * @returns 
 */

function rightAnswerSelected(selectedQuestionNumber){
    let question = questions[currentQuestion] 
   return selectedQuestionNumber == question['right_answer']
}

/**
 * Changes the status of the buttons
 */
function changeButtonStatus(){
    document.getElementById('next-button').disabled = false;
    document.getElementById('buttonOne').disabled = true;       
    document.getElementById('buttonTwo').disabled = true       
    document.getElementById('buttonThree').disabled = true       
    document.getElementById('buttonFour').disabled = true       
}

/**
 * Generates the next question
 */

function nextQuestion(){
    currentQuestion++
    actuallyQuestion++
    init()
    showQuestion()
    resetAnswerButtons()

    document.getElementById('next-button').disabled = true;
    document.getElementById('buttonOne').disabled = false;       
    document.getElementById('buttonTwo').disabled = false       
    document.getElementById('buttonThree').disabled = false       
    document.getElementById('buttonFour').disabled = false  
    

}
    
/**
 * reseted the answer buttons before the next question is loaded
 */

function resetAnswerButtons(){
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger')
    document.getElementById('answer_1').parentNode.classList.remove('bg-success')
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger')
    document.getElementById('answer_2').parentNode.classList.remove('bg-success')
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger')
    document.getElementById('answer_3').parentNode.classList.remove('bg-success')
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger')
    document.getElementById('answer_4').parentNode.classList.remove('bg-success')
}

/**
 * This function is used to start a new round 
 */

function restartGame(){
    document.getElementById('endScreen').style = 'display:none;'
    document.getElementById('questionBody').style = ''
    currentQuestion = 0 
    actuallyQuestion = 1
    rightAnswers = 0

    init();
}