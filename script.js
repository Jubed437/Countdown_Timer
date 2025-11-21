let timers = []
let editingTimerId = null
let activeTimer = null
let countInterval = null;
let animationCounter = 0;

// Change theme
function changeTheme() {
    const selectedTheme = document.getElementById('change-theme').value;
    const img = new Image();
    img.onload = () => {
        document.body.style.backgroundImage = `url('./images/${selectedTheme}')`;
    };
    img.src = `./images/${selectedTheme}`;
}

//Window Loading
window.onload = function (){
    loadTimers();
    showTimersList();
    setInterval(updateTimerStatus, 1000);
}

// Save timers to localStorage
function saveTimers(){
    localStorage.setItem('timers',JSON.stringify(timers));
}
// Load timers from localStorage
function loadTimers(){
    let saved = localStorage.getItem('timers');
    if(saved){
        timers = JSON.parse(saved);
    }
}

// Popup control
function openModal()  {
    document.getElementById('modalOverlay').classList.add("active");
}
function closeModal() {
    document.getElementById('modalOverlay').classList.remove("active");
    document.getElementById("timerForm").reset();
    editingTimerId = null;
}
//Delete Button Functionality
function deleteTimer(id){
    timers = timers.filter(timer => timer.id != id);
    
    
    if(activeTimer && activeTimer.id === id) {
        activeTimer = null;
        if(countInterval) {
            clearInterval(countInterval);
            countInterval = null;
        }
        document.querySelector('.timerDisplay').style.display = 'none';
    }
    
    saveTimers();
    showTimersList();
}
//Edit Button Functionality
function editTimer(id){
    const timer = timers.find(t => t.id === id);
    if(timer) {
        editingTimerId = id;
        document.querySelector('#timerName').value = timer.name;
        document.querySelector('#timerDescription').value = timer.desc;
        document.querySelector('#timerDate').value = timer.date;
        document.querySelector('#timerTime').value = timer.time;
        openModal();
    }
}

// Display selected timer in main area
function showTimer(){
    if(!activeTimer) return;
    
    document.querySelector('.welcome-screen').style.display = 'none';
    const timerDisplay = document.querySelector('.timerDisplay');
    if(timerDisplay) timerDisplay.style.display = 'block';
    
    const now = Date.now();
    const end = activeTimer.end;
    const expired = now > end;
    
    let html = `<h3 class="Dtimer-header">${activeTimer.name}</h3>`;
    html += `<h4 class="Dtimer-desc" style="min-height: 1.5em;">${activeTimer.desc || '&nbsp;'}</h4>`;
    
    if(expired){
        html += '<div class="expired-message"><i class="fa-solid fa-alarm-clock"></i> Timer Expired!</div>';
    }else{
        html += 
        `<div class="countdown-timer">
            <div class="time-unit">
                <span class="days">00</span>
                <span>Days</span>
            </div>
            <div class="time-unit">
                <span class="hours">00</span>
                <span>Hours</span>
            </div>
            <div class="time-unit">
                <span class="minutes">00</span>
                <span>Minutes</span>
            </div>
            <div class="time-unit">
                <span class="seconds">00</span>
                <span>Seconds</span>
            </div>
        </div>`;
    }
    html += `<div class="end-time">
                <div>End Time</div>
                <span>${activeTimer.date} ${activeTimer.time}</span>
            </div>`;

    timerDisplay.innerHTML = `<div class="timer-content">${html}</div>`;
}

// Update countdown 
function updateCountdown(){
    const now =  new Date().getTime();
    const end =  new Date(activeTimer.end).getTime();
    const timeLeft = end-now;
    if(timeLeft <= 0){
        clearInterval(countInterval);
        showTimer();
        updateTimerStatus();
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.querySelector('.days').textContent = String(days).padStart(2, '0');
    document.querySelector('.hours').textContent = String(hours).padStart(2, '0');
    document.querySelector('.minutes').textContent = String(minutes).padStart(2, '0');
    document.querySelector('.seconds').textContent = String(seconds).padStart(2, '0');
    
    // Animation Sync
    document.querySelectorAll('.time-unit').forEach(unit => {
        unit.classList.remove('sync-pulse');
        setTimeout(() => unit.classList.add('sync-pulse'), 10);
    });


}

function updateTimerStatus(){
    const now = Date.now();
    timers.forEach(timer => {
        const expired = now > timer.end;
        const timerElement = document.querySelector(`[onclick="selectTimer(${timer.id})"] .timer-status`);
        if(timerElement) {
            timerElement.textContent = expired ? "Expired" : "Active";
            timerElement.className = `timer-status ${expired ? 'status-expired' : 'status-active'}`;
        }
    });
}

function startCountdown(){
    if(!activeTimer) return;
    
    if(countInterval)
        clearInterval(countInterval);
    
    const now = Date.now();
    const end = activeTimer.end;
    if(now > end) return; // Don't start countdown for expired timers
    
    updateCountdown();
    countInterval = setInterval(() => {
        updateCountdown();
        updateTimerStatus();
    }, 1000);
}

// Select and display a timer with animation
function selectTimer(id){
    activeTimer = timers.find(timer => timer.id === id);
    const timerDisplay = document.querySelector('.timerDisplay');
    
    if(timerDisplay.style.display === 'block') {
        timerDisplay.classList.add('pop-out');
        setTimeout(() => {
            showTimer();
            timerDisplay.classList.remove('pop-out');
            timerDisplay.classList.add('pop-in');
            startCountdown();
        }, 300);
    } else {
        showTimer();
        timerDisplay.classList.add('pop-in');
        startCountdown();
    }
}


// Display list of all timers in sidebar
function showTimersList(){
    let container = document.getElementById('timersList');
    const timerDisplay = document.querySelector('.timerDisplay');
    if(timerDisplay) timerDisplay.style.display = 'none';
    
    const now = Date.now();
    if (timers.length === 0) {
        container.innerHTML = '';
        document.querySelector('.welcome-screen').style.display = 'flex';
        return;
    } else{
        document.querySelector('.welcome-screen').style.display = 'none';
    }
    let html = '';
    timers.forEach(timer =>{
        const end = timer.end;
        const expired = now > end;
        html += 
        `<div class="timer-item" onclick="selectTimer(${timer.id})">
            <div class="timer-header">
                <h3>${timer.name}</h3>
                <div class="timer-status ${expired? 'status-expired':'status-active'}">${expired? "Expired":"Active"}</div>
            </div>
            <div class="timer-actions">
                <button id="edit-btn" onclick="editTimer(${timer.id})">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button id="delete-btn" onclick="deleteTimer(${timer.id})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>`;
    });
    container.innerHTML = html;
}

// Add new timer or update existing one
function addTimer(){
    const name = document.querySelector('#timerName').value;
    const desc = document.querySelector('#timerDescription').value;
    const date = document.querySelector('#timerDate').value;
    const time = document.querySelector('#timerTime').value;
    const end  = Date.parse(date + 'T' + time);
    



    if(editingTimerId) {
        const timerIndex = timers.findIndex(t => t.id === editingTimerId);
        timers[timerIndex] = {
            id: editingTimerId,
            name: name,
            desc: desc,
            date: date,
            time: time,
            end: end
        };
        editingTimerId = null;
    } else {
        let timer = {
            id: Date.now(),
            name: name,
            desc: desc,
            date: date,
            time: time,
            end: end
        };
        timers.push(timer);
    }
    saveTimers();
    showTimersList();
    closeModal();
}
// Form submission handle
document.addEventListener('DOMContentLoaded', function (){
    document.querySelector('#timerForm').addEventListener('submit', function (e){
        e.preventDefault();
        addTimer();
    })
})