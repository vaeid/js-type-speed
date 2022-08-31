//set elements
const sample_text_tag = document.getElementById('sample_text');
const user_input_tag = document.querySelector('#user_input');
const timer_counter = document.getElementById('timer');
const btn_reset = document.getElementById('reset');
const tag_result = document.getElementById('result');

//set variables
var isStart = true;
var isEnd = false;
var timer = [0, 0, 0, 0];
var interval;
var sample_text = sample_text_tag.innerHTML;

setListener();

function start() {
    if (isStart && !isEnd) {
        interval = setInterval(runTimer, 10);
        isStart = false;
    }

}

function runTimer() {
    let current_time = addZero(timer[0]) + ":" + addZero(timer[1]) + ":" + addZero(timer[2]);
    timer_counter.innerHTML = current_time;
    timer[3]++;
    timer[0] = Math.floor(timer[3] / 100 / 60);
    timer[1] = Math.floor(timer[3] / 100) - (timer[0] * 60);
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));

}

function addZero(time) {
    if (time < 10) {
        time = '0' + time;
    }
    return time;
}


function spellCheck() {
    if (!isEnd) {
        var user_input = user_input_tag.value;
        var sample_text_match = sample_text.substring(0, user_input.length);

        if (user_input != sample_text_match) {
            user_input_tag.style.borderColor = 'red';

        } else if (user_input == sample_text) {
            user_input_tag.style.borderColor = 'green';
            clearInterval(interval);
            isEnd = true;
            calculate_speed();
        } else {
            user_input_tag.style.borderColor = 'yellow';
        }
    }
}

function calculate_speed() {
    let all_char = sample_text.length;
    let second_countr = (timer[0] * 60) + timer[1];
    all_char = Math.floor((all_char / second_countr) * 60);
    tag_result.innerHTML = all_char;

}

function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    isStart = true;
    isEnd = false;
    user_input_tag.value = "";
    user_input_tag.style.borderColor = "gray";
    timer_counter.innerHTML = "00:00:00";

}

function setListener() {

    user_input_tag.addEventListener('keyup', spellCheck);
    user_input_tag.addEventListener('keypress', start);
    btn_reset.addEventListener('click', reset);
}