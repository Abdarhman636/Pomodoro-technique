const pomodoroTimerEl = document.getElementById('Pomodoro-timer')
const timerInputEl = document.getElementById('timerinput')
const startBTN = document.getElementById('start-btn')
const puseBTN = document.getElementById('puse-btn')
const resetBTN = document.getElementById('reset-btn')
const foucsTab = document.getElementById('focus')
const shortBRtab = document.getElementById('shortBR')
const longBRtab = document.getElementById('longBR')
const inputEL = document.querySelector('.todo-dev input')
const addTaskButton = document.querySelector('.todo-dev button')
const toDoListUl = document.querySelector('.todolist')
const quoteText = document.querySelector('.quote-text')
const quoteAuthor = document.querySelector('#author')

let ourPermission;
let timerRuning = false
let startingTime = 1;
let foucsTime = 1;
let shortBreakTime = 5;
let longBreakTime = 15;
let time = startingTime * 60
let startingMinutes = Math.floor(time / 60)
let audio = new Audio('assets/audio/alarm.mp3')
const startingseconds = "0" + 0

// Notification.requestPermission()

askPermission()

// if (Notification.permission === 'granted') {
//      console.log('we got it')
// } else if (Notification.permission === 'denied') {
//      Notification.requestPermission().then(permission => {
//           console.log(permission)
//      })
// }


function askPermission() {
     if (Notification.permission === 'granted') {
          console.log('got it')
     } else if (Notification.permission === 'denied') {
          Notification.requestPermission().then(permission => {
               if (permission === 'granted') {
                    console.log('got it')
               }
          })
     }
}

function showNotification() {
     let doneFouceNotification;
     if (Notification.permission === 'granted') {
          doneFouceNotification = new Notification('كفو عليك', {
               body: 'خلصت تقدر ترتاح دلوقتي'
          })
     } else if (Notification.permission === 'denied') {
          Notification.requestPermission().then(permission => {
               if (permission === 'granted') {
                    doneFouceNotification = new Notification('كفو عليك', {
                         body: 'خلصت تقدر ترتاح دلوقتي'
                    })
               }
          })
     }
}


loadQuota()

function loadQuota() {
     fetch('quates.json')
          .then(response => response.json())
          .then(Quotas => getRandomQuates(Quotas));
}

function getRandomQuates(Quotas) {
     let randomNumber = Math.floor(Math.random() * Quotas.length)
     let randomQuates = Quotas[randomNumber]
     console.log(quoteText.innerHTML)
     quoteText.innerHTML = `"${randomQuates.text}"`
     quoteAuthor.innerHTML = `${randomQuates.author} --`
}

setInterval(loadQuota, 60000);


pomodoroTimerEl.innerHTML = `${startingMinutes}: ${startingseconds}`

document.addEventListener('DOMCcontentLoaded', getToDoListFromLocalStorage())
foucsTab.addEventListener('click', foucsTimeFun)
shortBRtab.addEventListener('click', shortBreakFun)
longBRtab.addEventListener('click', longBreakFun)

function foucsTimeFun() {
     startingTime = foucsTime
     time = startingTime * 60
     startingMinutes = Math.floor(time / 60)
     pomodoroTimerEl.innerHTML = `${startingMinutes}: ${startingseconds}`
     changeFoucsTimeColor()
}


function shortBreakFun() {
     startingTime = shortBreakTime;
     time = startingTime * 60
     startingMinutes = Math.floor(time / 60)
     pomodoroTimerEl.innerHTML = `${startingMinutes}: ${startingseconds}`
     changeShortBreakColor()
}


function longBreakFun() {
     startingTime = longBreakTime;
     time = startingTime * 60
     startingMinutes = Math.floor(time / 60)
     pomodoroTimerEl.innerHTML = `${startingMinutes}: ${startingseconds}`
     changeLongBreakColor()
}


function updateTimer() {
     const minutes = Math.floor(time / 60)
     let seconds = time % 60

     seconds = seconds < 10 ? "0" + seconds : seconds
     pomodoroTimerEl.innerHTML = `${minutes}: ${seconds}`
     document.title = `Pomodoro Timer - ${minutes}: ${seconds}`
     if (minutes === 0) {
          if (seconds === "00") {
               clearInterval(myInterval)
               timerRuning = false
               audio.play()


               if (startingTime === shortBreakTime) {
                    Swal.fire("💪 خلص وقت الراحه القصيرة، نرجع للشغل والتركيز")
                    foucsTab.checked = true
                    foucsTimeFun()
               } else if (startingTime === longBreakTime) {
                    Swal.fire("💪 خلص وقت الراحه الطويلة، نرجع للشغل والتركيز")
                    foucsTab.checked = true
                    foucsTimeFun()
               } else {
                    showNotification()
                    Swal.fire("✌️ كفو عليك ي بطل، تستاهل راحه")
                    shortBRtab.checked = true
                    shortBreakFun()
                    changeShortBreakColor()
               }

          } else {
               time--
          }
     }

     else {

          time--
     }
}

startBTN.addEventListener('click', () => {
     shortBRtab.style.pointerEvents = "none";
     longBRtab.style.pointerEvents = "none";
     if (timerRuning === true) {
          Swal.fire("الرجاء ايقاف او إعادة تعين المؤقت حتى تتمكن من البدء من جديد")
     } else {
          updateTimer()
          myInterval = setInterval(updateTimer, 1000)
          timerRuning = true
     }

})

puseBTN.addEventListener('click', () => {
     shortBRtab.style.pointerEvents = "auto";
     longBRtab.style.pointerEvents = "auto";
     clearInterval(myInterval)
     timerRuning = false
})

resetBTN.addEventListener('click', () => {
     time = startingTime * 60
     seconds = "0" + 0
     pomodoroTimerEl.innerHTML = `${startingTime}: ${seconds}`
     document.title = `Pomodoro Timer - ${startingTime}: ${seconds}`
     timerRuning = false
})


// function playAudio() {
//      audio.play()
// }

function changeShortBreakColor() {
     document.body.classList.remove('foucs-them')
     document.body.classList.remove('long-break-them')
     document.body.classList.add('short-break-them')
}

function changeLongBreakColor() {
     document.body.classList.remove('short-break-them')
     document.body.classList.remove('foucs-them')
     document.body.classList.add('long-break-them')
}

function changeFoucsTimeColor() {
     document.body.classList.remove('short-break-them')
     document.body.classList.remove('long-break-them')
     document.body.classList.add('foucs-them')
}

inputEL.onkeyup = () => {
     let userInput = inputEL.value
     if (userInput.trim() != 0) {
          addTaskButton.classList.add('active')
     } else {
          addTaskButton.classList.remove('active')
     }
}

inputEL.addEventListener('keydown', (e) => {
     let userInput = inputEL.value
     if (e.key === 'Enter') {
          if (userInput.trim() != 0) {
               addTaskButton.classList.add('active')
               addNewToDo(e)
               inputEL.value = ''
          } else {
               addTaskButton.classList.remove('active')
          }
     }
});

addTaskButton.addEventListener('click', addNewToDo)

function addNewToDo(e) {
     addtoLoccalStorage(inputEL.value)
     const newToDo = document.createElement('li')
     newToDo.innerHTML = `<span><i class="fa-solid fa-trash"></i></span>${inputEL.value}`
     toDoListUl.appendChild(newToDo)
     inputEL.value = ''
     complateTasks(newToDo, e)
}


function complateTasks(newToDo, e) {
     newToDo.onclick = (e) => {
          if (e.target.classList.contains('fa-trash')) {
               newToDo.remove()
               removeToDoListFromLocalStorage(newToDo)
          } else {
               newToDo.classList.toggle('done')
          }
     }
}


function addtoLoccalStorage(userInput) {
     let toDos;
     if (localStorage.getItem('toDos') === null) {
          toDos = []
     } else {
          toDos = JSON.parse(localStorage.getItem('toDos'))
     }
     toDos.push(userInput)
     localStorage.setItem('toDos', JSON.stringify(toDos))
}

function getToDoListFromLocalStorage() {
     let toDos;
     if (localStorage.getItem('toDos') === null) {
          toDos = []
     } else {
          toDos = JSON.parse(localStorage.getItem('toDos'))
     }
     toDos.forEach((toDo) => {
          const newToDo = document.createElement('li')
          newToDo.innerHTML = `<span><i class="fa-solid fa-trash"></i></span>${toDo}`
          toDoListUl.appendChild(newToDo)
          complateTasks(newToDo)
     })
}

function removeToDoListFromLocalStorage(newToDo) {
     let toDos;
     if (localStorage.getItem('toDos') === null) {
          toDos = []
     } else {
          toDos = JSON.parse(localStorage.getItem('toDos'))
     }
     let toDoText = newToDo.innerText
     let toDoIndex = toDos.indexOf(toDoText)
     toDos.splice(toDoIndex, 1)
     localStorage.setItem('toDos', JSON.stringify(toDos))
}