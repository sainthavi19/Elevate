var firebaseConfig = {
        apiKey: "AIzaSyBFFzPR02aq2nC1zxcmLGBEALPITFBuz9c",
        authDomain: "elevatelogin-74ed0.firebaseapp.com",
        projectId: "elevatelogin-74ed0",
        storageBucket: "elevatelogin-74ed0.appspot.com",
        messagingSenderId: "90440796649",
        appId: "1:90440796649:web:1c30a05cd9f7ac9a026378",
        measurementId: "G-D5QD9Q2T6B"
      };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Authentication service
var auth = firebase.auth();

// Get a reference to the Firebase Firestore service
var db = firebase.firestore();

// Login function
function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Redirect to the user's dashboard page
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

// Register function
function register() {
  var email = document.getElementById("register-email").value;
  var password = document.getElementById("register-password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Add the user's information to the Firestore database
      db.collection("users").doc(userCredential.user.uid).set({
        email: email
      })
        .then(() => {
          alert("Registration successful!");
          // Redirect to the user's dashboard page
          window.location.href = "index.html";
        })
        .catch((error) => {
          alert("Error: " + error.message);
        });
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

// Forgot Password function
function forgotPassword() {
  var email = document.getElementById("forgot-email").value;
  auth.sendPasswordResetEmail(email)
    .then(() => {
      alert("Password reset email sent to " + email + ".");
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

// Forgot Username function
function forgotUsername() {
  var email = document.getElementById("forgot-username-email").value;
  // Retrieve the user's username from the Firestore database using their email
  db.collection("users")
    .where("email", "==", email)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        var username = querySnapshot.docs[0].id;
        alert("Your username is: " + username);
      } else {
        alert("No user found with the provided email.");
      }
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

// Show Forgot Password form
function showForgotPassword() {
  document.getElementById("forgot-password-form").style.display = "block";
}

// Show Forgot Username form
function showForgotUsername() {
  document.getElementById("forgot-username-form").style.display = "block";
}

const logoutButton = document.getElementById('logout-button');

// Add an authentication state change listener
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is logged in, show the logout button
    logoutButton.style.display = 'block';
  } else {
    // User is logged out, hide the logout button
    logoutButton.style.display = 'none';
  }
});

// Add event listener to the logout button
logoutButton.addEventListener('click', () => {
  // Log out the currently signed-in user
  firebase.auth().signOut()
    .then(() => {
      // Logout successful
      console.log("User logged out successfully.");
      // You can perform any additional actions or redirects after logout here
    })
    .catch((error) => {
      // An error occurred during logout
      console.error("Logout error:", error);
    });
});
