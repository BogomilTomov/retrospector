import { GoogleLoginProvider, AuthServiceConfig } from 'angularx-social-login';

export const environment = {
  production: false
};

export const baseUrl: string = 'https://localhost:44372/api';

export const gamesLoaded: number = 20;

export const authServiceConfig = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('385337585654-qr5vnh01a0lno0o6e41jh6t5fodsfseq.apps.googleusercontent.com')
  }
]);

