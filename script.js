const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const mistakes = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button')

//set values

let timer;
let maxtime = 60;
let timeleft = maxtime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;


function loadParagraph(){
    const paragraph = [" Avoid daydreaming about the years to come.",
        "You are the most important person in your whole life.","Always be true to who you are, and ignore what other people have to say about you."
        ,"Always be true to who you are, and ignore what other people have to say about you.",
        "Only demonstrate your strength when it’s really required.","Subscribe to Drop X Out",
        "Embrace the present moment and let go of the past.","Remember that your happiness is your own responsibility.",
        "Stay focused on your goals and don’t let distractions derail you.","Be patient with yourself; growth takes time.",
        "Set boundaries and protect your peace of mind.","Don’t be afraid to ask for help when you need it.",
        "Take time each day to appreciate the little things.","Let go of the need for approval from others.",
        "Stay humble, even when you achieve great success.","Find joy in the journey, not just the destination.",
        "Keep your mind open to new possibilities.","Always be kind, even when it’s difficult.",
        "Take responsibility for your actions and their consequences.",
        "Practice gratitude daily for what you have.","Stay grounded, even when life gets chaotic.",
        "Remember that failure is just a stepping stone to success.","Focus on solutions, not problems.",
        "Don’t compare your journey to others.","Trust that everything happens for a reason.",
        "Take care of your mental and physical health.","Always strive for progress, not perfection.",
        "Listen to your inner voice and trust it.","Keep pushing forward, even when it gets tough.",
        "Don’t let setbacks define you.","Choose to see the good in every situation.","Make time for self-care and relaxation.",
        "Celebrate your small victories along the way.","Stay curious and keep exploring new ideas.","Give yourself permission to rest when needed."
    ];

const randomIndex = Math.floor(Math.random()*paragraph.length);

typingText.innerHTML = '';
for(const char of paragraph[randomIndex]){
    typingText.innerHTML += `<span>${char}</span>`;
}
typingText.querySelectorAll('span')[0].classList.add('active');

document.addEventListener('keydown',()=>input.focus());

typingText.addEventListener('click', ()=> {input.focus()});
}

// handle user input

function initTyping(){
const char = typingText.querySelectorAll('span');
const typedChar = input.value.charAt(charIndex);

if(charIndex < char.length && timeleft>0){
    if(char[charIndex].innerText === typedChar){


        if(!isTyping){
            timer = setInterval(initTime,1000);
            isTyping = true;
        }


        char[charIndex].classList.add('correct');
        console.log('correct');
    }
    else{
        mistake++;
        char[charIndex].classList.add('incorrect');
        console.log('incorrect');
    }
    charIndex++;
    char[charIndex].classList.add('active');
        

    mistakes.innerText = mistake;
    cpm.innerText = charIndex - mistake;
}

else{
    clearInterval(timer);
    input.value ='';
}
}

function initTime(){
    if(timeleft > 0){
        timeleft--;
        time.innerHTML = timeleft;
        let wpmval = Math.round(((charIndex - mistake)/5) / (maxtime - timeleft)*60);
        wpm.innerText = wpmval;
    }
    else{
        clearInterval(timer);
    }
}
input.addEventListener('input',initTyping);

btn.addEventListener('click', reset);

function reset() {
    loadParagraph();
    clearInterval(timer);
    timeleft = maxtime;
    time.innerText = timeleft;
    input.value ='';
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistake.innerText = 0;

    
}

loadParagraph()