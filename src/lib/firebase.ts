import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAOvJsv30R-sdRV1ekuU4uvJqOnUWJondI',
  authDomain: 'hololive-music.firebaseapp.com',
  projectId: 'hololive-music',
  storageBucket: 'hololive-music.appspot.com',
  messagingSenderId: '468454566898',
  appId: '1:468454566898:web:678f4b5a3b875d8cdc996b',
  measurementId: 'G-SYBPTKVGYL',
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
