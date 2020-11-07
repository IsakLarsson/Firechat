import React, { useState } from "react";
import "./App.css";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyB0ab07UClCc5hhx6DBLIkElcjZSWarxWE",
  authDomain: "firechat-3bdd6.firebaseapp.com",
  databaseURL: "https://firechat-3bdd6.firebaseio.com",
  projectId: "firechat-3bdd6",
  storageBucket: "firechat-3bdd6.appspot.com",
  messagingSenderId: "204383641155",
  appId: "1:204383641155:web:353da9a0886ae67d7e7ef6",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const photoURL = require("../src/logo.svg");
function SignIn() {
  const signInWIthGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <button onClick={signInWIthGoogle}>Sign in with Google</button>;
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>SignOut</button>
  );
}

function ChatRoom() {
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  return (
    <>
      <div>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </div>

      <form>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">SEND</button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  );
}

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">yeet</header>
      <section>{<ChatRoom />} </section>
    </div>
  );
}

export default App;
