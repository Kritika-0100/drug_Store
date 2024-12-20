import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBINry6g-MRAevLt8CaN_6XbWNwKWJ8yO8",
    authDomain: "medsync-42bcf.firebaseapp.com",
    projectId: "medsync-42bcf",
    storageBucket: "medsync-42bcf.firebasestorage.app",
    messagingSenderId: "713876607792",
    appId: "1:713876607792:web:b8b3192b7778f2acab2ef5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  });
  
  // Logout
  document.getElementById('logout-btn').addEventListener('click', async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  });
  
  // Auth State Listener
  onAuthStateChanged(auth, (user) => {
    if (user) {
      welcomeMessage.textContent = `Welcome, ${user.email}`;
      logoutSection.style.display = 'block';
      loginForm.style.display = 'none';
      signupForm.style.display = 'none';
    } else {
      logoutSection.style.display = 'none';
      loginForm.style.display = 'block';
      signupForm.style.display = 'block';
    }
  });

  document.getElementById('signup-btn').addEventListener('click', async () => {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  });