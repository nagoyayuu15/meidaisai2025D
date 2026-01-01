import SceneManager from './scenes/fundation/sceneManager';
import type IUserDataManager from './data_interface/user_data/interface';
import UserDataManager from './data_interface/user_data/userData'; // 実装版を使用

const host = new URL(location.href).host

const isDev = 
    host.startsWith('localhost') 
    || host.startsWith('127.0.0.1') 
    || host.startsWith('::1')

if (isDev) {
    console.log('開発環境で実行しています．');
}


// firebase
// authやfirestoreが必要な場合はconst.tsからインポートして使う．
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp(
    isDev 
    ? {
        projectId: "demo-metype-7e24a",
        apiKey: "fake-api-key",
        authDomain: "demo-metype-7e24a.firebaseapp.com"
    } 
    : {
        apiKey: "AIzaSyCBi3d1CfJaLBkV7lnITzQ2kYwzsFkYArg",
        authDomain: "metype-7e24a.firebaseapp.com",
        projectId: "metype-7e24a",
        storageBucket: "metype-7e24a.firebasestorage.app",
        messagingSenderId: "991070879902",
        appId: "1:991070879902:web:c692b4a25052ca78defb8f",
        measurementId: "G-VZZYM5HTJ6"
    }
);

export const Firebase = {
    // これは使う．
    auth : getAuth(firebaseApp),

    // すべてのリクエストをfunctionsを経由するならフロントエンドでは使わない．
    db : getFirestore(firebaseApp),
    
    // つかわないかも. 普通にfetchAPIを使っていい．
    func : getFunctions(firebaseApp, "asia-northeast1"), 

}
    if (isDev) {
        connectFirestoreEmulator(Firebase.db, "127.0.0.1", 8080); // ポート番号は適宜変更すること
        connectAuthEmulator(Firebase.auth, "http://127.0.0.1:9099"); // ポート番号は適宜変更すること
        connectFunctionsEmulator(Firebase.func, "127.0.0.1", 5001); // ポート番号は適宜変更すること
    }


// 定数
export const Host = {
     functions : isDev 
        ? 'http://127.0.0.1:5001/metype-7e24a/asia-northeast1/appFunction'
        : 'https://metype-7e24a.web.app',

     hosting : isDev
        ? 'http://127.0.0.1:5000'
        : 'https://metype-7e24a.web.app'
}

// Singleton - 実装版のUserDataManagerを使用
export const userDataManager: IUserDataManager = new UserDataManager()
export const sceneManager = new SceneManager()
