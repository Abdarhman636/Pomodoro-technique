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
const settingsBTN = document.getElementById('settings')
const settingsDev = document.getElementById('settings-dev')
const settingsForm = document.querySelector('form')
const focusTimeSettings = document.getElementById('focusTime-settings')
const shortBreakSettings = document.getElementById('shortBreak-settings')
const longBreakSettings = document.getElementById('longBreak-settings')
const closeBTN = document.getElementById('close')
const fullScrBTN = document.getElementById('fullscr')
const focuseCycles = document.getElementById('focuse-cycles')
const cyclesNum = document.getElementById('cycles-num')

let focuseCyclesNum = 0
let newStudyCyclesNum = 0
let storedShortTime;
let storedLongTime;
let storedFoucseTime;
let studyCircle = 0;
let ourPermission;
let timerRuning = false
let startingTime = localStorage.getItem('storedFoucseTime') ? localStorage.getItem('storedFoucseTime') : 25
let foucsTime = localStorage.getItem('storedFoucseTime') ? localStorage.getItem('storedFoucseTime') : 25
let shortBreakTime = localStorage.getItem('storedShortTime') ? localStorage.getItem('storedShortTime') : 5;
let longBreakTime = localStorage.getItem('storedLongTime') ? localStorage.getItem('storedLongTime') : 15
let time = startingTime * 60
let startingMinutes = Math.floor(time / 60)
let audio = new Audio('assets/audio/alarm.mp3')
let startAudio = new Audio('assets/audio/startaudio.mp3')
const startingseconds = "0" + 0

focusTimeSettings.value = localStorage.getItem('storedFoucseTime') ? localStorage.getItem('storedFoucseTime') : 25
shortBreakSettings.value = localStorage.getItem('storedShortTime') ? localStorage.getItem('storedShortTime') : 5;
longBreakSettings.value = localStorage.getItem('storedLongTime') ? localStorage.getItem('storedLongTime') : 15

function addTimeToLocalStorage(foucsTime, startingTime, shortBreakTime, longBreakTime) {
     if (localStorage.getItem('storedFoucseTime')) {
          storedFoucseTime = startingTime
          foucsTime = startingTime
          parseInt(localStorage.setItem('storedFoucseTime', storedFoucseTime))
     } else {
          storedFoucseTime = startingTime
          foucsTime = startingTime
          localStorage.setItem('storedFoucseTime', storedFoucseTime)
     }

     if (localStorage.getItem('storedShortTime')) {
          storedShortTime = shortBreakTime
          parseInt(localStorage.setItem('storedShortTime', storedShortTime))
     } else {
          storedShortTime = shortBreakTime
          localStorage.setItem('storedShortTime', storedShortTime)
     }

     if (localStorage.getItem('storedLongTime')) {
          storedLongTime = longBreakTime
          parseInt(localStorage.setItem('storedLongTime', storedLongTime))
     } else {
          storedLongTime = longBreakTime
          localStorage.setItem('storedLongTime', storedLongTime)
     }

     location.reload()
}


function askPermission(NotificationMSG) {
     if (Notification.permission === 'granted') {
          showNotification(NotificationMSG)
     } else if (Notification.permission === 'denied' || Notification.permission === 'denied') {
          Notification.requestPermission().then(permission => {
               if (permission === 'granted') {
                    showNotification(NotificationMSG)
               }
          })
     }
}

function showNotification(NotificationMSG) {
     doneFouceNotification = new Notification('?????? ????????', {
          body: NotificationMSG
     })
}

// const showNotificationtwo = (NotificationMSG) => {
//      doneNotification = new Notification('?????? ???????? ?? ??????', {
//           body: NotificationMSG,
//           alert: '???????? ???????? ???????? ?????? ?????????? ???????? ??????????'
//      })
// }

settingsBTN.addEventListener('click', () => {
     settingsDev.classList.toggle('showset')
})

closeBTN.addEventListener('click', () => {
     settingsDev.classList.toggle('showset')
})

settingsForm.addEventListener('submit', (e) => {
     e.preventDefault()
     startingTime = focusTimeSettings.value
     foucsTime = focusTimeSettings.value
     shortBreakTime = shortBreakSettings.value
     longBreakTime = longBreakSettings.value
     addTimeToLocalStorage(foucsTime, startingTime, shortBreakTime, longBreakTime)
     console.log(shortBreakSettings.value)
     settingsDev.classList.toggle('showset')
})


loadQuota()

function loadQuota() {
     fetch('quates.json')
          .then(response => response.json())
          .then(Quotas => getRandomQuates(Quotas));
}

function getRandomQuates(Quotas) {
     let randomNumber = Math.floor(Math.random() * Quotas.length)
     let randomQuates = Quotas[randomNumber]
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
               updateFoucseCycle()

               if (startingTime === shortBreakTime) {
                    askPermission('????????????')
                    Swal.fire("???? ?????? ?????? ???????????? ???????? ?????? ??????????")
                    foucsTab.checked = true
                    foucsTimeFun()
               } else if (startingTime === longBreakTime) {
                    askPermission('????????????')
                    Swal.fire("???? ?????? ?????? ???????????? ???????? ?????? ??????????")
                    foucsTab.checked = true
                    foucsTimeFun()
               } else {
                    askPermission('????????????')
                    if (studyCircle < 4) {
                         Swal.fire("??????  ?????? ???????? ?? ???????? ???????????? ???????? ??????????")
                         shortBRtab.checked = true
                         shortBreakFun()
                         changeShortBreakColor()
                         studyCircle++
                    } else if (studyCircle >= 4) {
                         Swal.fire("??????  ?????? ???????? ?? ???????? ???????????? ???????? ??????????")
                         longBRtab.checked = true
                         longBreakFun()
                         studyCircle = 0
                    }
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
     if (timerRuning === true) {
          Swal.fire("???????????? ?????????? ???? ?????????? ???????? ???????????? ?????? ?????????? ???? ?????????? ???? ????????")
     } else {
          startAudio.play()
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
          console.log(userInput.length)
          if (userInput.length <= 40) {
               addTaskButton.classList.add('active')
          } else {
               addTaskButton.classList.remove('active')
          }
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
     newToDo.innerHTML = `<p><span><i class="fa-solid fa-trash"></i></span>${inputEL.value}</p>`
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
               // newToDo.children[0].classList.toggle('tododone')
               newToDo.classList.toggle('done')
               compleateToDoItemFromLocalStorage(newToDo)
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
          newToDo.innerHTML = `<p><span><i class="fa-solid fa-trash"></i></span>${toDo}</p>`
          toDoListUl.appendChild(newToDo)
          complateTasks(newToDo)
     })
}

function compleateToDoItemFromLocalStorage(newToDo) {
     let toDos;
     if (localStorage.getItem('toDos') === null) {
          toDos = []
     } else {
          toDos = JSON.parse(localStorage.getItem('toDos'))
     }
     let toDoText = newToDo.innerText
     let toDoHTML = newToDo.innerHTML
     console.log(toDoHTML)

     var newToDoHTML = toDoHTML.replace('<p>', '<p class="tododone">')

     let toDoIndex = toDos.indexOf(toDoText)
     toDos.splice(toDoIndex, 1)
     localStorage.setItem('toDos', JSON.stringify(toDos))
     addtoLoccalStorage(newToDoHTML)
     // location.reload()

}


function removeToDoListFromLocalStorage(newToDo) {
     let toDos;
     if (localStorage.getItem('toDos') === null) {
          toDos = []
     } else {
          toDos = JSON.parse(localStorage.getItem('toDos'))
     }
     let toDoText = newToDo.innerText
     let toDoHTML = newToDo.innerHTML
     console.log(toDoHTML)
     let toDoIndex = toDos.indexOf(toDoText)
     toDos.splice(toDoIndex, 1)
     localStorage.setItem('toDos', JSON.stringify(toDos))
}

function toggleFullScreen() {
     if (document.fullscreen) {
          document.exitFullscreen()
     } else {
          document.documentElement.requestFullscreen().catch((e) => {
               console.log(e)
          })
     }
}

fullScrBTN.addEventListener('click', () => {
     toggleFullScreen()
})

document.addEventListener('dblclick', () => {
     toggleFullScreen()

})

updateFoucseCycle = () => {
     focuseCyclesNum++
     if (focuseCyclesNum == 4) {
          newStudyCyclesNum++
          cyclesNum.innerHTML = newStudyCyclesNum + " "
     }
     focuseCycles.innerHTML = focuseCyclesNum + " "
}