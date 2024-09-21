const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');

const firebaseConfig = {
    apiKey: "AIzaSyAs-eL_qmHpmFjVOkPpVy6PV_y88sv-8B8",
    authDomain: "images-dbe67.firebaseapp.com",
    projectId: "images-dbe67",
    storageBucket: "images-dbe67.appspot.com",
    messagingSenderId: "686955944695",
    appId: "1:686955944695:web:cd7ae0ca40236a626691f2",
    measurementId: "G-6N60CR06R7"
  };
  
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  
  module.exports = { storage, ref, uploadBytes, getDownloadURL };
