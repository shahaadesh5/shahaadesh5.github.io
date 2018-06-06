(function() {
  var myQuestions = [
    {
      question: "Doctor Strange is a man of many talents, but what does he use to control time?",
      answers: {
        a: "The Mind of Vishanti",
        b: "The Soul of Oshtur",
        c: "The Eye of Agamotto"
      },
      correctAnswer: "c"
    },
    {
      question: "What is the name of Star-Lord/Peter Quill's mother in Guardians of the Galaxy?",
      answers: {
        a: "Margaret",
        b: "Meredith",
        c: "Madeline"
      },
      correctAnswer: "b"
    },
    {
      question: "What legislation requires superhumans to be governed by law?",
      answers: {
        a: "Paris accord",
        b: "Sokovia accord",
        c: "Wakanda accord",
        d: "New York accord"
      },
      correctAnswer: "b"
    },
    {
      question: "In Ant-Man, Scott Lang is fired from his job doing what?",
      answers: {
        a: "Making coffee",
        b: "Selling t-shirts",
        c: "Working in a supermarket",
        d: "Selling ice-cream"
      },
      correctAnswer: "d"
    },
    {
      question: "What's the final stone Thanos get his hands on in Infinity War?",
      answers: {
        a: "The Mind Stone",
        b: "The Resurrection Stone",
        c: "The Power Stone",
        d: "The Soul Stone"
      },
      correctAnswer: "a"
    }
  ];

  function buildQuiz() {
    myQuestions.push({
      question: "What year did Iron Man 2 release?",
      answers: {
        a: "2010",
        b: "2015",
        c: "2018"
      },
      correctAnswer: "a"
    });
    const output = [];
    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answers = [];
      for (letter in currentQuestion.answers) {
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".answers");
    let numCorrect = 0;
    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        answerContainers[questionNumber].style.color = "red";
      }
    });
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
