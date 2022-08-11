import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyABjG832TS9XrQ5Yq2oH5MuvsSbROLXhoc",
    authDomain: "testeprojeto-54a53.firebaseapp.com",
    databaseURL: "https://testeprojeto-54a53-default-rtdb.firebaseio.com",
    projectId: "testeprojeto-54a53",
    storageBucket: "testeprojeto-54a53.appspot.com",
    messagingSenderId: "675869786894",
    appId: "1:675869786894:web:aadd0b3af90aebdd154d5f",
    measurementId: "G-Y7M47JPYD8"
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)