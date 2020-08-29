let data = [
  {
      question: "How is COVID-19 transmitted?",
      options: [
          "Through droplets that come from your mouth and nose when you cough or breathe out",
          "In sexual fluids, including semen, vaginal fluids or anal mucous",
          "By drinking unclean water",
          "All of the above"
      ],
      answer: "Through droplets that come from your mouth and nose when you cough or breathe out",
      selected: "",
      status: ""
  },
  {
      question: "What are the common symptoms of COVID-19? ",
      options: [
          "A new and continuous cough",
          "Fever",
          "Tiredness",
          "All of the above"
      ],
      answer: "All of the above",
      selected: "",
      status: ""
  },
  {
      question: "Why is it named coronavirus?",
      options: [
          "Due to their leaf-like projections",
          "Due to their crown-like projections",
          "Due to their surface structure of bricks",
          "None of the above"
      ],
      answer: "Due to their crown-like projections",
      selected: "",
      status: ""
  },
  {
      question: "The first case of novel coronavirus was identified in ...",
      options: [
          "Italy",
          "Shanghai",
          "Wuhan, China",
          "Paris"
      ],
      answer: "Wuhan, China",
      selected: "",
      status: ""
  },
  {
      question: "Which of the following people are more sensitive towards COVID-19?",
      options: [
          "Older people – especially those aged 70 and above and people with certain underlying health conditions",
          "Children",
          "European people",
          "All of the above"
      ],
      answer: "Older people – especially those aged 70 and above and people with certain underlying health conditions",
      selected: "",
      status: ""
  },
  {
      question: "What are the precautions taken to protect oneself from coronavirus?",
      options: [
          "Visit your doctor for antibiotics treatment",
          "Add more garlic into your diet",
          "Cover your nose and mouth when sneezing",
          "All of the above"
      ],
      answer: "Cover your nose and mouth when sneezing",
      selected: "",
      status: ""
  },
  {
      question: "Which is the first country that successfully completed human trials for Coronavirus?",
      options: [
          "China",
          "Russia",
          "India",
          "USA"
      ],
      answer: "Russia",
      selected: "",
      status: ""
  },
  {
      question: "Which of the following statement is/are correct about Favipiravir?",
      options: [
          "Favipiravir is an antiviral COVID-19 drug",
          "Glenmark Pharmaceuticals under the brand name FabiFlu has launched an antiviral drug Favipiravir",
          "It is India's first COVID-19 drug launched, priced at Rs 103 per tablet",
          "All of the above"
      ],
      answer: "All of the above",
      selected: "",
      status: ""
  },
  {
      question: "How long does the virus survive on the surfaces?",
      options: [
          "24 hours",
          "4 hours",
          "72 hours",
          "36 hours"
      ],
      answer: "72 hours",
      selected: "",
      status: ""
  },
  {
      question: "Which state in India confirms first coronavirus case?",
      options: [
          "Gujarat",
          "Haryana",
          "Kerala",
          "Delhi"
      ],
      answer: "Kerala",
      selected: "",
      status: ""
  },
];

let start = document.querySelector("#start");
let thumbnail = document.querySelector("#thumbnail");
let quiz = document.querySelector("#quiz");
let questions = document.querySelector(".questions");
let options = document.querySelectorAll(".options");
let previous = document.querySelector("#previous");
let next = document.querySelector("#next");
let status = document.querySelector("#status");
let scores = document.querySelector("#scores");
let end = document.querySelector("#end");
let submit = document.querySelector("#submit");
let index;
let score = 0;
let allAnswered = false;
let selected = false;

start.addEventListener("click", () => {
  init();
  index = 0;
  fillContent(index);
});

next.addEventListener("click", () => {
  if(index!=9){
      index++;
      fillContent(index);
  }
  reset(index);
});

previous.addEventListener("click", () => {
  if(index!=0){
      index--;
      fillContent(index);
  }
  reset(index);
});

submit.addEventListener("click", () => {
  endQuiz();
});

options.forEach((opt, i) => {

  opt.addEventListener("click", () => {
      if(!selected){
          if(opt.textContent === data[index].answer){
              opt.classList.add("correct");
              selected = true;
              status.textContent = "CORRECT";
              data[index].status = "correct";
              data[index].selected = i;
              score++;
          }
          else {
              opt.classList.add("wrong");
              status.textContent = "WRONG";
              selected = true;
              data[index].status = "wrong";
              data[index].selected = i;
              correctOptionDisplay();
          }
      }
      checkAllAnswered();
      if(allAnswered){
          endQuiz();
      }
      
  });

});

function init(){
  setTimeout(function(){ 
  start.classList.add("hide"); 
  thumbnail.classList.add("hide"); 
  quiz.classList.remove("hide");
}, 150);
}

function reset(){
  if(data[index].status){
      selected = true;
  }
  else{
      selected = false;
  }
  restoreData();
}

function restoreData(){
  status.textContent = (data[index].status).toUpperCase();
  options.forEach((opt, i) => {
      opt.classList.remove("wrong");
      opt.classList.remove("correct");
      if(String(data[index].selected) === String(i)){
          opt.classList.add(data[index].status);
          correctOptionDisplay();
      }
  });
}

function fillContent(num){
  questions.textContent = (num + 1) + ") " + data[num].question; 
  options.forEach((opt, i) => {
      opt.textContent = data[num].options[i];
  });
}

function correctOptionDisplay(){
  options.forEach((option) =>{
    if(option.textContent === data[index].answer){
      option.classList.add("correct");
    }
  });
}

function checkAllAnswered(){
  let flag = 1;
  data.forEach((ques) => {
      if(ques.selected === "")
      flag = 0;
  });
  if(flag){
      allAnswered = true;
  }
}

function endQuiz(){
  setTimeout(function(){ 
      quiz.classList.add("hide");
      end.classList.remove("hide");
   }, 500);
  scores.textContent = `${score}/10`;
}