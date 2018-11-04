import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
//Reducers
//@todo
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig={
    apiKey: "AIzaSyDwp_dHndzHrU81qc0vHR9eeOnS5Ynvn-A",
    authDomain: "patient-8442a.firebaseapp.com",
    databaseURL: "https://patient-8442a.firebaseio.com",
    projectId: "patient-8442a",
    storageBucket: "patient-8442a.appspot.com",
    messagingSenderId: "79766940219"
};

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  };

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)

//Initialize firestore
const firestore=firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
  )(createStore);

  // Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore
    notify:notifyReducer,
    settings: settingsReducer,
  });

//Check for settings in Local Storage
if(localStorage.getItem('settings')==null){
  //Default settings
  const defaultSettings={
    disableBalanceOnAdd: true, 
    disableBalanceOnEdit: false,
    allowRegistration: false
  }

  //Set to LocalStorage
  localStorage.setItem('settings', JSON.stringify(defaultSettings))
}

// Create initial state
// const initialState = {};
const initialState = {settings: JSON.parse(localStorage.getItem('settings'))};

//Create Store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    //window.__REDUX_DEVTOOLS_EXTENTION__ && window.__REDUX_DEVTOOLS_EXTENTION__()
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)) ;

export default store;

