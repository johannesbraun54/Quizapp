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

function init(){
   document.getElementById('allQuestions').innerHTML = `${questions.length}`
   document.getElementById('firstQuestion').innerHTML = `${actuallyQuestion}`
   showQuestion()

}

function showQuestion(){
    let question = questions[currentQuestion] 

    if(currentQuestion >= questions.length){
        document.getElementById('endScreen').style = ''
        document.getElementById('questionBody').style = 'display:none;'
        document.getElementById('totalQuestions').innerHTML = `${questions.length}`
        document.getElementById('rightAnswers').innerHTML = `${rightAnswers}`
    }else{
      let percent = currentQuestion / questions.length
      percent =  Math.round(percent * 100) 

    document.getElementById('progressBar').innerHTML = `${percent}%`
    document.getElementById('progressBar').style.width = `${percent}%`    
    document.getElementById('questiontext').innerHTML = `${question['question']}`
    document.getElementById('answer_1').innerHTML = `${question['answer_1']}`
    document.getElementById('answer_2').innerHTML = `${question['answer_2']}`
    document.getElementById('answer_3').innerHTML = `${question['answer_3']}`    
    document.getElementById('answer_4').innerHTML = `${question['answer_4']}`
    }


}

function rightAnswer(selection){
    let question = questions[currentQuestion] 
    let selectedQuestionNumber = selection.slice(-1);
    if(selectedQuestionNumber == question['right_answer']){
        rightAnswers++
    }
}

function answer(selection){
    let question = questions[currentQuestion] 
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`

    if(selectedQuestionNumber == question['right_answer']){
        document.getElementById(selection).parentNode.classList.add('bg-success')
        AUDIO_RIGHT.play()
    } else
    {document.getElementById(selection).parentNode.classList.add('bg-danger')
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success')
    AUDIO_WRONG.play()}
    
    document.getElementById('next-button').disabled = false;
    rightAnswer(selection)
}

function nextQuestion(){
    currentQuestion++
    actuallyQuestion++
    init()
    showQuestion()
    resetAnswerButtons()

    document.getElementById('next-button').disabled = true;
    

}

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

function restartGame(){
    document.getElementById('endScreen').style = 'display:none;'
    document.getElementById('questionBody').style = ''
    currentQuestion = 0 
    actuallyQuestion = 1
    rightAnswers = 0

    init();
}