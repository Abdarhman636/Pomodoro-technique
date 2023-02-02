import { initializeApp } from "firebase/app";

const firebaseConfig = {
     apiKey: "AIzaSyAIU3fN0K2mS5mVsPyZUKXH4ISrSsIvAfA",
     authDomain: "promodo-and-todo-list-app.firebaseapp.com",
     projectId: "promodo-and-todo-list-app",
     storageBucket: "promodo-and-todo-list-app.appspot.com",
     messagingSenderId: "705209616711",
     appId: "1:705209616711:web:b00df4b0ed356ccab5e462"
};

export const app = initializeApp(firebaseConfig);