import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database"
function startDatabase(){
  const firebaseConfig = {
    apiKey: "AIzaSyBJDaSl6hLIOmtU7DaLmAZPUNd7gcFJ_X4",
    authDomain: "spotifyproject-53dc7.firebaseapp.com",
    databaseURL: "https://spotifyproject-53dc7-default-rtdb.firebaseio.com",
    projectId: "spotifyproject-53dc7",
    storageBucket: "spotifyproject-53dc7.appspot.com",
    messagingSenderId: "525425670084",
    appId: "1:525425670084:web:d76f23c0f0b6332095d691"
  };
  const app = initializeApp(firebaseConfig);
  return getDatabase(app)
}
export default startDatabase
