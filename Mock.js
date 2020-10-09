var Exam_Time;
fetch("questions.json").then(res => {
console.log(res)
return res.json()
}).then(loadedQuestions => {
Exam_Time = Math.floor(1000);
start(loadedQuestions)
});


reset.addEventListener('click', function run() {
localStorage.clear();
location.reload();

});

function start(questions) {

let l = questions.length;
console.log("Start")
//console.log(l)
let op1 = document.getElementById('option1')
let op2 = document.getElementById('option2')
let op3 = document.getElementById('option3')
let op4 = document.getElementById('option4')
let q_no = document.getElementById('qno')
let options_class = document.getElementsByClassName('option')
let q = document.getElementById('q-contain')
let next = document.getElementById('next')
let prev = document.getElementById('prev')
let save = document.getElementById('save')
let submit = document.getElementById('submit')
let clear = document.getElementById('clear')
let reset = document.getElementById('reset')
let up = document.getElementById('up')
let down = document.getElementById('down')



let store = [], currIndex = 0, remaining_time = Exam_Time;

let time = localStorage.getItem('time') ? JSON.parse(localStorage.getItem('time')) : 0;
let end = localStorage.getItem('end') ? JSON.parse(localStorage.getItem('end')) : 0;
let B = localStorage.getItem('curr') ? JSON.parse(localStorage.getItem('curr')) : 0;
let A = localStorage.getItem('save') ? JSON.parse(localStorage.getItem('save')) : [];

if (end == 1) {
    console.log("End")
    remove_up()
    return 0;

}

if (A.length == 0) {
    for (let index = 0; index < l; index++) store[index] = -1;
    localStorage.setItem('save', JSON.stringify(store));
    localStorage.setItem('curr', JSON.stringify(currIndex));
    localStorage.setItem('time', JSON.stringify(Exam_Time));
}
else {
    currIndex = B;
    store = A;
    remaining_time = time;

}


// Exam_Time=from localstorage read;
var timer_set = setInterval(function () {

    const hours_main = Math.floor(remaining_time / 3600);
    const minutes = Math.floor(remaining_time % 3600);
    const minutes_main = Math.floor(minutes / 60);
    const seconds_main = Math.floor(minutes % 60);
    // console.log(hours_main+":"+minutes_main+":"+seconds_main)

    document.getElementById("Timer").innerHTML = hours_main + ":"
        + minutes_main + ":" + seconds_main;

    localStorage.setItem('time', JSON.stringify(remaining_time));


    if (--remaining_time < 0) {
        clearInterval(timer_set);
        document.getElementById("Timer").innerHTML = "00:00:00";
        submit_it();
    }

}, 1000);

// Creating side bar buttons dynamically
for (var ij = 1; ij <= l; ij++) {

    var button_id = ij.toString();
    var button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = ij;
    button.className = 'question_no_sidebar';
    button.id = button_id;

    var sidebar_element = document.getElementById('sidebar_id')
    sidebar_element.appendChild(button);
    if (ij == l) {
        var question_no_sidebar = document.getElementsByClassName('question_no_sidebar');
        side_color_reset()
        showQuestion(questions[currIndex]);
    }
}

let side_parent = document.querySelector('#sidebar_id')
side_parent.addEventListener("click", side_color_change, false)
function side_color_change(e) {
    if (e.target != e.currentTarget) {
        console.log(e.target.id);
        side_color_reset()
        currIndex = e.target.id - '0';
        currIndex--;
        localStorage.setItem('curr', JSON.stringify(currIndex));
        showQuestion(questions[currIndex]);
    }
}


function side_color_reset() {
    for (let i = 0; i < l; i++) {
        if (store[i] != -1) {
            question_no_sidebar[i].style.color = 'white';
            question_no_sidebar[i].style.backgroundColor = 'green';
        }
        else {
            question_no_sidebar[i].style.color = 'blue';
            question_no_sidebar[i].style.backgroundColor = 'white';
        }
    }

}

down.innerText = l;
check_attempted();
function check_attempted() {
    var attempted = 0

    for (var k = 0; k < l; k++) {
        if (store[k] != -1) {
            attempted++;
        }
    }
    up.innerText = attempted;
}


let answered = [0, 0, 0, 0]

function showQuestion(quest) {
    q.innerText = quest.question
    op1.innerText = quest.choice1
    op2.innerText = quest.choice2
    op3.innerText = quest.choice3
    op4.innerText = quest.choice4
    q_no.innerText = "( "+ (currIndex + 1) +" ) ";

    let selec = currIndex + 1
    console.log(selec);
    let chng = document.getElementById(String(selec));
    if (store[currIndex] != -1) {
        chng.style.color = 'white';
        chng.style.backgroundColor = 'green';
    }
    else {
        chng.style.color = 'white';
        chng.style.backgroundColor = 'rgb(82, 50, 121)';
    }

    if ((store[currIndex] >= 0) && (store[currIndex] <= 3)) {
        change_color(store[currIndex])
    }
    else
        reset_color()

    options_class[0].addEventListener('click', function run() {
        for (let index = 0; index < answered.length; index++)
            answered[index] = 0;
        answered[0] = 1;
        change_color(0)
    });
    options_class[1].addEventListener('click', function run() {
        for (let index = 0; index < answered.length; index++)
            answered[index] = 0;
        answered[1] = 1;
        change_color(1)
    });
    options_class[2].addEventListener('click', function run() {
        for (let index = 0; index < answered.length; index++)
            answered[index] = 0;
        answered[2] = 1;
        change_color(2)
    });
    options_class[3].addEventListener('click', function run() {
        for (let index = 0; index < answered.length; index++)
            answered[index] = 0;
        answered[3] = 1;
        change_color(3)
    });
}

next.addEventListener('click', function run() {
    if (currIndex < l - 1) {
        currIndex++;
        localStorage.setItem('curr', JSON.stringify(currIndex));
        showQuestion(questions[currIndex])
        side_color_reset()

        question_no_sidebar[currIndex].style.color = 'white';
        question_no_sidebar[currIndex].style.backgroundColor = 'rgb(82, 50, 121)';
    }
});
prev.addEventListener('click', function run() {
    if (currIndex > 0) {
        currIndex--;
        localStorage.setItem('curr', JSON.stringify(currIndex));
        showQuestion(questions[currIndex])
        side_color_reset()

        question_no_sidebar[currIndex].style.color = 'white';
        question_no_sidebar[currIndex].style.backgroundColor = 'rgb(82, 50, 121)';
    }
});

function reset_color() {
    for (i = 0; i < 4; i++) {
        options_class[i].style.backgroundColor = 'rgba(178, 78, 236, 0.356)'
        options_class[i].style.color = 'black'

    }
}
function change_color(coount) {
    reset_color()
    options_class[coount].style.backgroundColor = 'rgb(82, 50, 121)'
    options_class[coount].style.color = 'white'
}


function submit_it() {
    let correct = 0, wrong = 0, unanswered = 0;
    for (let index = 0; index < l; index++) {
        if (store[index] != -1 && store[index] + 1 == questions[index].answer) {
            correct++;
        }
        else if (store[index] != -1 && store[index] + 1 != questions[index].answer) {
            wrong++;
        }
        else
            unanswered++;
    }
    //console.log(correct)
    //console.log(wrong)
    //console.log(unanswered)
    remove_sidebar_button_color();
    localStorage.clear();
    result(correct, wrong, unanswered);

}
save.addEventListener('click', function run() {
    var answer_ques = 0;
    for (let index = 0; index < answered.length; index++) {
        if (answered[index] == 1) {
            store[currIndex] = index;
            localStorage.setItem('save', JSON.stringify(store));
            //console.log(answered);
            //console.log(store);
            answer_ques = 1;

            let selec = currIndex + 1
            console.log(selec);
            let chng = document.getElementById(String(selec));
            console.log(chng);
            chng.style.color = 'white';
            chng.style.backgroundColor = 'green';

            break;
        }
    }
    if (answer_ques == 0) {
        store[currIndex] = -1;
        localStorage.setItem('save', JSON.stringify(store));
        //console.log(answered);
        //console.log(store);
    }

    check_attempted();


});

clear.addEventListener('click', function run() {
    for (let index = 0; index < answered.length; index++) {
        answered[index] = 0;
    }
    let selec = currIndex + 1
    console.log(selec);
    let chng = document.getElementById(String(selec));
    console.log(chng);
    chng.style.color = 'white';
    chng.style.backgroundColor = 'rgb(82, 50, 121)';
    store[currIndex] = -1;
    localStorage.setItem('save', JSON.stringify(store));
    check_attempted()
    reset_color()
});

function remove_sidebar_button_color() {
    let side=document.getElementById("sidebar_id")
    side.remove();
    let nxt=document.getElementById("nxt-prev")
    nxt.remove();
    let time=document.getElementById("Timer")
    time.remove();
    let atmp=document.getElementById("attempt")
    atmp.remove();
    let qn=document.getElementById("question")
    qn.style.width = "400px";
    qn.style.height = "200px";

}
function remove_up() {
    let side=document.getElementById("sidebar_id")
    side.remove();
    let nxt=document.getElementById("nxt-prev")
    nxt.remove();
    let time=document.getElementById("Timer")
    time.remove();
    let atmp=document.getElementById("attempt")
    atmp.remove();
    let ky=document.getElementById("keys")
    ky.remove();
    let sb=document.getElementById("submit")
    sb.remove();
    reset.style.display="block";
}

submit.addEventListener('click', function run() {
    submit_it();
});

function result(c, w, u) {
    op1.innerText = "Total Questions : " + (c + w + u);
    op2.innerText = "Correct : " + c;
    op3.innerText = "Wrong : " + w;
    op4.innerText = "Unanswered: " + u;
    q_no.innerText = "";
    q.innerText = "RESULT OVERVIEW"
    localStorage.setItem('end', JSON.stringify(1));
    reset_color();
    prev.remove();
    next.remove();
    save.remove();
    clear.remove();
    submit.remove();
    remaining_time = Math.floor(0);
    reset.style.display="block";
}

}
