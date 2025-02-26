import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAjGIuez_1ea5gt7o-XgWkcxyM0fqr79pE",
  authDomain: "zenfit-3284a.firebaseapp.com",
  projectId: "zenfit-3284a",
  storageBucket: "zenfit-3284a.appspot.com",
  messagingSenderId: "999536980774",
  appId: "1:999536980774:web:8153297a729d5f282bc7e7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("Register").addEventListener("click", async (e) => {
    e.preventDefault();
    const name = document.querySelector("#register .input-field[placeholder='Full Name']").value;
    const email = document.querySelector("#register .input-field[placeholder='Email']").value;
    const password = document.querySelector("#register .input-field[placeholder='Password']").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            uid: user.uid
        });

        alert("Registration successful!");
        document.querySelector("#register .input-field[placeholder='Full Name']").value = "";
        document.querySelector("#register .input-field[placeholder='Email']").value = "";
        document.querySelector("#register .input-field[placeholder='Password']").value = "";

    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

document.getElementById("Sign In").addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.querySelector("#login .input-field[placeholder='Username or Email']").value;
    const password = document.querySelector("#login .input-field[placeholder='Password']").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
            alert(`Welcome back, ${userDoc.data().name}!`);
         
        } else {
            alert("User data not found.");
        }

    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});
