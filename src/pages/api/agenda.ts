import { firebaseServer } from '@/config/firebase/server';

const db = firebaseServer.firestore();
const agenda = db.collection('agenda');

export default async (req, res) => {
  const { authorization } = req.headers;
  const { when } = req.query;
  const [type, token] = req.headers.authorization.split(' ');

  if (!authorization) {
    return res.status(401);
  }

  try {
    const { user_id } = await firebaseServer.auth().verifyIdToken(token);

    const snapshot = agenda
      .where('userId', '==', user_id)
      .where('when', '==', when)
      .get();

    return res.status(200).json(snapshot);
  } catch (error) {
    console.error('Firebase Error: ' + error);
    return res.status(401);
  }

  res.status(204);
};
