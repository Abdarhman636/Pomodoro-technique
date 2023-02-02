import { app } from 'firebaseConfig'
import { getuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

let auth = getuth()

let googleProvide = new GoogleAuthProvider()


const form = document.getElementById('form')
const signUpForm = document.getElementById('signupform')
const singInEmailInput = document.getElementById('signin-email-input')
const singUpEmailInput = document.getElementById('signup-email-input')
const signInPassInput = document.getElementById('signin-password-input')
const signUpPassInput = document.getElementById('signup-password-input')
const signUpNameInput = document.getElementById('signup-name-input')
const btn = document.getElementById('btn')
const registerlink = document.getElementById('registerlink')
const google = document.getElementById('google')

// Sign up the user
signUpForm.addEventListener('submit', (e) => {
     e.preventDefault()

     const email = singUpEmailInput.value
     const pass = signUpPassInput.value

     auth.createUserWithEmailAndPassword(email, pass).then((accessInfo) => {
          return db.collection('users').doc(accessInfo.user.uid).set({
               name: signUpNameInput.value,
               studycyrc: 0,
               email: email.toLowerCase()
          })
     }).then(() => {
          signUpForm.reset()
          // change in the UI once the user sign in 
          console.log('done')
          location.replace('index.html');
     }).catch(err => {
          Swal.fire({
               icon: 'error',
               text: 'البريد الإلكتروني مستخدم بالفعل، الرجاء استخدام بريد إلكتروني آخر',
          })
          form.reset()
     })
})

// sign out the user
function signOutFun() {
     auth.signOut().then(() => {
          console.log('user Signed Out')
          location.reload()
     })
}


// sign in the user again
form.addEventListener('submit', (e) => {
     e.preventDefault()
     const email = singInEmailInput.value
     const pass = signInPassInput.value
     auth.signInWithEmailAndPassword(email, pass).then(accessInfo => {
          form.reset()
          console.log('done')
          location.replace('index.html');
     }).catch(err => {
          Swal.fire({
               icon: 'error',
               text: 'لا يوجد حساب يطابق البيانات المدخلة، الرجاء التحقق من البيانات او تسجيل الدخول',
          })
          form.reset()
     })
})

function register() {
     form.style.left = '-400px';
     signUpForm.style.left = '50px';
     btn.style.left = '110px';
}

function login() {
     form.style.left = '50px';
     signUpForm.style.left = '450px';
     btn.style.left = '0';
}

registerlink.addEventListener('click', register)

google.addEventListener('click', signInWithGoogle)

function signInWithGoogle() {
     firebase.auth()
          .signInWithPopup(auth, provider)
          .then((result) => {
               var credential = result.credential;
               console.log(result)
               var token = credential.accessToken;
               var user = result.user;
               console.log(user)
          }).catch((error) => {
               var errorCode = error.code;
               var errorMessage = error.message;
               var email = error.email;
               var credential = error.credential;
          });
}