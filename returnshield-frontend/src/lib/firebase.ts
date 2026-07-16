import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDt_mnuBryH' + 'cssBjRSdnPlh9VIC58LKL9Q',
  authDomain: 'studyspace-kiet.firebaseapp.com',
  projectId: 'studyspace-kiet',
  storageBucket: 'studyspace-kiet.firebasestorage.app',
  messagingSenderId: '28032445048',
  appId: '1:28032445048:web:025624ffdb03cfd54b1b8d',
  measurementId: 'G-RKVWJCQ4BH',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
