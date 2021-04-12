import admin from 'firebase-admin';

export const firebaseServer = admin.apps.length
  ? admin.app()
  : admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_SERVER_PROJECT_ID,
        privateKey: process.env.FIREBASE_SERVER_PRIVATE_KEY.replace(
          /\\n/g,
          '\n'
        ),
        clientEmail: process.env.FIREBASE_SERVER_CLIENT_EMAIL,
      }),
    });
