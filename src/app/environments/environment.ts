import { InjectionToken } from '@angular/core';
export interface Environment {
  apiUrl: string;
}
export const ENVIRONMENT_DEFAULT = {
  apiUrl: 'https://api.themoviedb.org/3',
};
// 4473696fb61c356127c6bf4bc008c85f
export const ENVIRONMENT = new InjectionToken<Environment>('ENVIRONMENT', {
  providedIn: 'root',
  factory: () => ENVIRONMENT_DEFAULT,
});

export const firebaseConfig = {
  apiKey: "AIzaSyCI7kIrtqBlu68WV_ry1AO3SEAikallnyc",
  authDomain: "final-6ebc2.firebaseapp.com",
  projectId: "final-6ebc2",
  storageBucket: "final-6ebc2.appspot.com",
  messagingSenderId: "668860661828",
  appId: "1:668860661828:web:52ea6b6b6daaa5fdf4fc11"
};