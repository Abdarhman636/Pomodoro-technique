const pomodoroTimerEl = document.getElementById('Pomodoro-timer')
const timerInputEl = document.getElementById('timerinput')
const startBTN = document.getElementById('start-btn')
const puseBTN = document.getElementById('puse-btn')
const resetBTN = document.getElementById('reset-btn')
const foucsTab = document.getElementById('focus')
const shortBRtab = document.getElementById('shortBR')
const longBRtab = document.getElementById('longBR')
const toDoForm = document.getElementById('todoform')
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
const userNameElm = document.getElementById('userName')
const singOutElm = document.getElementById('singout')
// import userId from './auth'

// check if the user loged in or not
// get the date form the DB if upon user status
auth.onAuthStateChanged(user => {
     if (user) {
          getDataFromDB(user)
          getCurrentUserName(user)
     } else {
          toDoListUl.innerHTML = `<p>يبدو انه لا يوجد لديك مهام في الوقت الحالي</p>`
          userNameElm.innerHTML = '<a href="login-page.html">تسجيل الدخول</a>'
          singOutElm.style.display = 'none'
     }
})

function getCurrentUserName(user) {
     console.log(user.email)
     db.collection('users').where('email', '==', user.email).onSnapshot((datacopy) => {
          console.log(datacopy.docs)
          datacopy.docs.forEach(data => {
               var userName = data.data().name
               userNameElm.innerHTML = `مرحبا ${userName}`
          })
     })

     // console.log(user)
}


function getTheCurrentUser() {
     if (auth.currentUser == null) {
          return "no logging user"
     } else {
          return auth.currentUser.uid

     }
}

let focuseCyclesNum = 0
var newStudyCyclesNum = 0
let storedShortTime;
let storedLongTime;
let storedFoucseTime;
var studyCircle = 0;
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
let studyCircleFormDB = 0


// get the date from the db
function getDataFromDB(user) {
     let logginedUser = user.uid
     db.collection('toDos').where('user', '==', logginedUser).onSnapshot((datacopy) => {
          if (datacopy.docs.length == 0) {
               toDoListUl.innerHTML = `<p>مفيش داتا حضرتك</p>`
          } else {
               let htmltodo = ''
               let dbToDos = datacopy.docs
               dbToDos.forEach(dbtodo => {
                    let dbLi = dbtodo.data().todo
                    let dbLiHtml = `<li>
                    <div class="d-flex justify-content-end">
                         <input id="complateBTN" data-id=${dbtodo.id} onchange="compleateTasks()" class="order-1 ms-1" type="checkbox">
                         <p><span>
                                   <i data-id=${dbtodo.id} id="deletBTN" class="fa-solid fa-trash"></i>
                              </span>${dbLi}</p>
                    </div>
               </li>`
                    htmltodo += dbLiHtml
               })

               toDoListUl.innerHTML = htmltodo
               compleateTasks(toDoListUl)
          }
     })
}

// console.log(checkbox

function compleateTasks(toDoListUl) {
     toDoListUl.addEventListener('click', e => {
          let targetELM = e.target
          if (targetELM.getAttribute('id') == 'deletBTN') {
               db.collection('toDos').doc(targetELM.getAttribute('data-id')).delete()
          } else if (targetELM.getAttribute('id') == 'complateBTN') {
               setTimeout(() => {
                    db.collection('toDos').doc(targetELM.getAttribute('data-id')).delete()
               }, 1000)
          }

     })
}


getStudyCycle()

function getStudyCycle() {
     auth.onAuthStateChanged(user => {
          if (user == null) {
               cyclesNum.innerHTML = studyCircleFormDB + " "
          } else {
               db.collection('users').doc(user.uid).get().then((user) => {
                    cyclesNum.innerHTML = user.data().studycyrc + " "
               })
          }
     })
}


// set the default start time
focusTimeSettings.value = localStorage.getItem('storedFoucseTime') ? localStorage.getItem('storedFoucseTime') : 25
shortBreakSettings.value = localStorage.getItem('storedShortTime') ? localStorage.getItem('storedShortTime') : 5;
longBreakSettings.value = localStorage.getItem('storedLongTime') ? localStorage.getItem('storedLongTime') : 15

// add all the time to the local storage
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

// send notification
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
     doneFouceNotification = new Notification('كفو عليك', {
          body: NotificationMSG
     })
}

// Settings
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


// Quatas
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

// 
pomodoroTimerEl.innerHTML = `${startingMinutes}: ${startingseconds}`


// tapp
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

// The main function for the timer
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
                    askPermission('اسطورة')
                    Swal.fire("💪 خلص وقت الراحة وجاء وقت الشغل")
                    foucsTab.checked = true
                    foucsTimeFun()
               } else if (startingTime === longBreakTime) {
                    askPermission('اسطورة')
                    Swal.fire("💪 خلص وقت الراحة وجاء وقت الشغل")
                    foucsTab.checked = true
                    foucsTimeFun()
               } else {
                    askPermission('اسطورة')
                    if (studyCircle < 4) {
                         Swal.fire("✌️  ي سلام عليك يا بطل ، تستاهل راحه قصيرة")
                         shortBRtab.checked = true
                         shortBreakFun()
                         changeShortBreakColor()
                         studyCircle++
                         focuseCycles.innerHTML = studyCircle + " "
                    } else if (studyCircle = 4) {
                         Swal.fire("✌️  ي سلام عليك يا بطل، تستاهل راحه طويلة")
                         longBRtab.checked = true
                         longBreakFun()
                         studyCircle = 0
                         focuseCycles.innerHTML = studyCircle + " "
                         newStudyCyclesNum++
                         cyclesNum.innerHTML = newStudyCyclesNum + " "
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

// controle the timer
startBTN.addEventListener('click', () => {
     if (timerRuning === true) {
          Swal.fire("الرجاء ايقاف او إعادة تعين المؤقت حتى تتمكن من البدء من جديد")
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


// move between taps
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


// controle add to list button
inputEL.onkeyup = () => {
     let userInput = inputEL.value
     if (userInput.trim() != 0) {
          if (userInput.length <= 40) {
               addTaskButton.classList.add('active')
          } else {
               addTaskButton.classList.remove('active')
          }
     } else {
          addTaskButton.classList.remove('active')
     }
}

// submit the todo 
inputEL.addEventListener('keydown', (e) => {
     let userInput = inputEL.value
     if (e.key === 'Enter') {
          if (userInput.trim() != 0) {
               addTaskButton.classList.add('active')
               // addNewToDo(e)
               addToDosToFirebase()
               inputEL.value = ''
          } else {
               addTaskButton.classList.remove('active')
          }
     }
});



// add to do to the todos list
addTaskButton.addEventListener('click', addToDosToFirebase)


// add todos to the firebase DB
function addToDosToFirebase() {
     db.collection('toDos').add({
          todo: inputEL.value,
          comp: false,
          user: getTheCurrentUser()
     }).then(() => {
          inputEL.value = ''
     }).catch(err => {
          toDoListUl.innerHTML = `<p>الرجاء تسجيل الدخول حتى تتمكن من اضافة المهام الخاصة بك</p>`
          addTaskButton.classList.remove('active')
          inputEL.value = ''
     })

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

singOutElm.addEventListener('click', signOutFun)


// sign out the user
function signOutFun() {
     auth.signOut().then(() => {
          console.log('user Signed Out')
          location.reload()
     })
}
