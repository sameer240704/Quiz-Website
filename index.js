const questions = [ //Created an array of objects over here and give a reference to every element so that it can be used in the upcoming code.
    {
        question : 'C-Programming was originally implemented on which 18-bit minicomputer?', //Question String
        answers : [ //Array of obejcts for answer conatianing the option and the boolean value of the answer
            { text : "PDP - 7", correct: false},
            { text : "PDP - 8", correct: false},
            { text : "PDP - 9", correct: false},
            { text : "PDP - 11", correct: true},
        ]
    },
    {
        question : 'A _______ is a variable that holds addresses of other variables.', //Question String
        answers : [
            { text : "Operator", correct: false},
            { text : "Pointer", correct: true},
            { text : "Constant", correct: false},
            { text : "String", correct: false},
        ]
    },
    {
        question : 'Which version of C language introduced features like inline functions, variable-length arrays and support for comments?', //Question String
        answers : [
            { text : "ISO C (C18)", correct: false},
            { text : "ISO C (C99)", correct: true},
            { text : "C (K&R C)", correct: false},
            { text : "ISO C (C11)", correct: false},
        ]
    },
    {
        question : 'Which of the following operators has the associativity of Right to Left?', //Question String
        answers : [
            { text : "-> (Indirect Member Selection)", correct: false},
            { text : ". (Direct Member Selection)", correct: false},
            { text : "/= (Assign Quotient)", correct: true},
            { text : ">> (Right Shift)", correct: false},
        ]
    },
    {
        question : 'What is the size of " Long long int " datatype in C language?', //Question String
        answers : [
            { text : "4 bytes", correct: false},
            { text : "8 bytes", correct: true},
            { text : "16 bytes", correct: false},
            { text : "16 bits", correct: false},
        ]
    },
    {
        question : 'Collection of dissimilar elements stored in adjacent locations.', //Question String
        answers : [
            { text : "Structures", correct: true},
            { text : "Vectors", correct: false},
            { text : "Arrays", correct: false},
            { text : "Functions", correct: false},
        ]
    },
    {
        question : 'In most of the OSs pointers are predefined for three standard files. Which amongst the following is not one of them?', //Question String
        answers : [
            { text : "stdcol", correct: true},
            { text : "stdin", correct: false},
            { text : "stderr", correct: false},
            { text : "stdout", correct: false},
        ]
    },
]

const questionDisplay = document.getElementById("ques"); //This is the Question Div Element and displays the current question
const answerButton = document.getElementById("answerButton"); //This is the Div Element of the Answer Buttons and will display the current question's options
const nextButton = document.getElementById("nextButton"); //This is the Id of the Next Button and should appear after an option has been selected. 
const timer = document.getElementById("time");

let currentIndex = 0; //This variable represents the Index of the current Question
let result = 0; //This variable is to score the final result of the user

function startQuiz() { //When this function is called the current question index and the result is set to 0 and nextButton text is set to "NEXT" and showQuestion() function is called.
    currentIndex = 0;
    result = 0;
    timer.innerHTML = `01:00`; //Will set the timer to 1 minute when the quiz starts again
    Count(); //Calls the Count function 
    nextButton.innerHTML = "NEXT";
    showQuestion();
}

function showQuestion() { //Function to perform the function of displaying the question after "NEXT" button is clicked
    resetState(); //Function called
    let currentQuestion = questions[currentIndex]; //Question of the ith index will be selected.
    let questionNumber = currentIndex + 1; 
    questionDisplay.innerHTML = questionNumber + ".) " + currentQuestion.question; //Question to be displayed
    currentQuestion.answers.forEach(currentAns => { //Here forEach method will provide a callback for each option of the answers array of objects.
        const createButton = document.createElement("button"); //Create a new button 
        createButton.innerHTML = currentAns.text; //The inner HTML content of the button will be set to the text attribute of the answers array
        createButton.classList.add("button"); //This line adds the CSS properties of the button class to the createButton
        answerButton.appendChild(createButton); //This will add the button elements to the HTML page so that it is visible to the user
        if(currentAns.correct) { //If the correct answer is marked
            createButton.dataset.correct = currentAns.correct; //This will set the custom data attribute of "correct" on the createButton and can be used further for CSS styling and other purposes.
        }
        createButton.addEventListener("click", selectAnswer); //When the button is clicked the "selectAnswer" function will be called.
    });
}

function resetState() { //Function will hide the nextButton and while remove all the answers of the previous question.
    nextButton.style.display = "none"; //Makes the "nextButton" to disappear
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild); //This will remove any existing answer button from the HTML page
    }
}

function selectAnswer(event){ //This is the event handler
    const selectedButton = event.target; //Here ".target" will point to the event that has happened
    const isCorrect = selectedButton.dataset.correct == "true"; //This will set the custom data attribute of the selectedButton by checking if its true to the "isCorrect" variable 
    if(isCorrect){ 
        selectedButton.classList.add("correct"); //Here "classList" property is added to add CSS properties and over here it adds the class "correct" to the classList of "selectedButton".
        result += 1;
    }
    else{
        selectedButton.classList.add("incorrect"); //Similarly for the "incorrect" class
    }
    Array.from(answerButton.children).forEach(btns => { //Converts child elements of answer button to an array and will iterate for each button in the array
        if(btns.dataset.correct == "true"){  //Checks if the custom data attribute is "correct" and whether it is "true"
            btns.classList.add("correct"); //This will add the CSS properties of "correct" class to the button
        }
        btns.disabled = true; //To prevent the user to interact with any other button further once he/she has selected one button
    });
    nextButton.style.display = "block"; //After an option has been selected the "NEXT" button will appear 
}

nextButton.addEventListener("click", () => { //Adding a actionListener to the "NEXT" button
    if(currentIndex < questions.length) { //Checks if the length of array is greater the the current question index
        handleNextButton(); 
    }
    else{
        startQuiz(); //Will restart the quiz
    }
})

function handleNextButton() { //Whenever "NEXT" button is clicked
    currentIndex += 1; //Increase question index by 1
    if(currentIndex < questions.length) {
        showQuestion(); //Move to the next question
    }
    else{
        dispalyResult(); //Quiz over and display the score
    }
}

function dispalyResult(){
    resetState(); //Will hide the previous question and answers and will only display the current result
    //Here is the output for various reuslts obtained by the user
    if(result >= 0 && result < 2){
        questionDisplay.innerHTML = `You scored ${result} out of ${questions.length}.<br><br>You need to level up your game bruh`;
    }
    else if(result <= 2){
        questionDisplay.innerHTML = `You scored ${result} out of ${questions.length}!<br><br>You can score better!`;
    }
    else if(result > 2 && result <= 5) {
        questionDisplay.innerHTML = `You scored ${result} out of ${questions.length}!!<br><br>Good Work!!`;
    }
    else{
        questionDisplay.innerHTML = `You scored ${result} out of ${questions.length}!!!<br><br>Bravo!!!`;
    }
    nextButton.innerHTML = "Start Again"; //Set "Start Again" to the "nextButton"
    nextButton.style.display = "block"; //Make the "nextButton" appear on the HTML page
}

function Count() {
    let time = 59;
    const timeCounted = setInterval(() => {
        if(time >= 10) {
            timer.innerHTML = `00:${time}`;
        }
        else {
            timer.innerHTML = `00:0${time}`;
        }
        time -= 1;
        if(time < 0) {
            clearInterval(timeCounted);
            dispalyResult();
        }
        if(currentIndex == questions.length) {
            clearInterval(timeCounted);
            timer.innerHTML = `00:00`
        }
    }, 1000);
}

startQuiz(); //Start the quiz