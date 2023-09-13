import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

interface IFirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}

const firebaseConfig: IFirebaseConfig = {
    apiKey: "AIzaSyB7_8zIWCmdP2mYZWWV28lBJB-dzTsbOSs",
    authDomain: "chat-app-2a9c8.firebaseapp.com",
    projectId: "chat-app-2a9c8",
    storageBucket: "chat-app-2a9c8.appspot.com",
    messagingSenderId: "766544325643",
    appId: "1:766544325643:web:5e165391035245dc152b0e",
    measurementId: "G-PRXZ08SBR4",
};

// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth();
export const db: Firestore = getFirestore();
