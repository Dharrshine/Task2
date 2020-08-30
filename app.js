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

let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
let start = document.querySelector("#start");
let thumbnail = document.querySelector("#thumbnail");
let quiz = document.querySelector("#quiz");
let questions = document.querySelector(".questions");
let options = document.querySelectorAll(".options");
let previous = document.querySelector("#previous");
let next = document.querySelector("#next");
let status = document.querySelector("#status");
let scores = document.querySelector("#scores");
let submit = document.querySelector("#submit");
let end = document.querySelector("#end");
let playerInput = document.querySelector("#playerInput");
let name = document.querySelector("#name");
let highScoresBtn = document.querySelector("#highScoresBtn");
let backBtn = document.querySelector("#back");
let resetBtn = document.querySelector("#reset");
let scoreDisplay = document.querySelector("#scoreDisplay");
let scoreDisplayTable = document.querySelectorAll("#table");
let clock = document.querySelector("#timer");
let navbar = document.querySelector("#navbar");
let navBlocks = document.querySelectorAll("#navbar span");
const time_in_minutes = 3;
let finish;
let current_time;
let finishTime;
let deadline;
let date;
let index;
let score;
let allAnswered;
let selected;
let c = 0;

start.addEventListener("click", () => {
  if(playerInput.value){
    setTimeout(function(){ 
      init();
    }, 150);
    index = 0;
    score = 0;
    finish = false;
    allAnswered = false;
    selected = false;
    shuffle(data);
    fillContent(index);
  }else{
    pop();
  }
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
  finish = true;
});

highScoresBtn.addEventListener("click", () => {
  end.classList.add("hide");
  highScoresBtn.classList.add("hide");
  resetBtn.classList.add("hide");
  displayHighScore();
});

backBtn.addEventListener("click", () => {
  scoreDisplay.classList.add("hide");
  clock.classList.remove("hide");
  end.classList.remove("hide");
  highScoresBtn.classList.remove("hide");
  resetBtn.classList.remove("hide");
  let scoreDisplayTableTr = document.querySelectorAll(".tr");
  scoreDisplayTableTr.forEach((tr) => {
    tr.remove();
  });
});

resetBtn.addEventListener("click", () => {
  end.classList.add("hide");
  highScoresBtn.classList.add("hide");
  resetBtn.classList.add("hide");
  thumbnail.classList.remove("hide");
  playerInput.classList.remove("hide");
  start.classList.remove("hide");
  clock.classList.add("hide");
  playerInput.value = "";
  data.forEach((ques) =>{
    ques.status = "";
    ques.selected = "";
  });
  navBlocks.forEach((block) => {
    block.classList.remove("correct");
    block.classList.remove("wrong");
  });
  index = 0;
  reset(index);
});

navBlocks.forEach((block, i) => {
  block.addEventListener(("click"), () => {
    removeHighlight();
    block.classList.add("selected");
    index = i;
    fillContent(i);
    reset(i);
  });
});

options.forEach((opt, i) => {

    opt.addEventListener("click", () => {
        if(!selected){
            if(opt.textContent === data[index].answer){
                opt.classList.add("correct");
                navBlocks[index].classList.add("correct");
                selected = true;
                status.textContent = "CORRECT";
                data[index].status = "correct";
                data[index].selected = i;
                score++;
            }
            else {
                opt.classList.add("wrong");
                navBlocks[index].classList.add("wrong");
                status.textContent = "WRONG";
                selected = true;
                data[index].status = "wrong";
                data[index].selected = i;
                correctOptionDisplay();
            }
        }
        checkAllAnswered();
        if(allAnswered){
            finish = true;
        }        
    });

});

function init(){
  start.classList.add("hide"); 
  thumbnail.classList.add("hide"); 
  quiz.classList.remove("hide");
  playerInput.classList.add("hide");
  highScoresBtn.classList.add("hide");
  resetBtn.classList.add("hide");
  clock.classList.remove("hide");
  navbar.classList.remove("hide");
  current_time = Date.parse(new Date());
  deadline = new Date(current_time + time_in_minutes*60*1000);
  run_clock(deadline);
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
    removeHighlight();
    navBlocks[index].classList.add("selected");
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
  navbar.classList.add("hide");
    quiz.classList.add("hide");
    end.classList.remove("hide");
    highScoresBtn.classList.remove("hide");
    resetBtn.classList.remove("hide");
    name.textContent = playerInput.value;
    scores.textContent = `${score}/10`;
    setHighScore();
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function setHighScore(){
  let date = new Date();
  let value = {
    name: playerInput.value,
    mark: score,
    day: date.getDate() +"/" + date.getMonth() + "/" + date.getFullYear(),
    time: finishTime
  };
  highScores.push(value);
  highScores.sort((a,b) => {
    return b.mark - a.mark
  });
  localStorage.setItem("highScores",JSON.stringify(highScores));
}

function displayHighScore(){
  let tr;
  clock.classList.add("hide");
  scoreDisplay.classList.remove("hide");
  highScores.forEach((val) => {
    tr = document.createElement("tr");
    tr.innerHTML = `<td>${val.name}</td><td>${val.mark}/10</td><td>${val.mark}:${10-val.mark}</td><td>${val.day}</td><td>${val.time}</td>`;
    tr.className = "tr";
    scoreDisplayTable[0].appendChild(tr);
  });
}

function removeHighlight(){
  navBlocks.forEach((block) => {
    block.classList.remove("selected");
  })
}

function pop(){
  if(c == 0){
    document.querySelector("#box").style.display = "block";
    c = 1;
  }else{
    document.querySelector("#box").style.display = "none";
    c = 0;
  }
}

function time_remaining(endtime){
  let t = Date.parse(endtime) - Date.parse(new Date());
  let seconds = Math.floor( (t/1000) % 60 );
  let minutes = Math.floor( (t/1000/60) % 60 );
  return {'total':t,'minutes':minutes, 'seconds':seconds};
}

function run_clock(endtime){  
  function update_clock(){
    let t = time_remaining(endtime);
    t.seconds = t.seconds < 10 ? '0' + t.seconds : t.seconds;
    clock.innerHTML = t.minutes+':'+t.seconds;
    if(t.total<=0 || finish){ 
      clearInterval(timeinterval);
      finishTime = t.minutes + ":" + t.seconds;
      endQuiz(); 
    }
  }
  update_clock(); // run function once at first to avoid delay
  let timeinterval = setInterval(update_clock,1000);
}
