import { firebaseServer } from '@/config/firebase/server';

const db = firebaseServer.firestore();
const agenda = db.collection('agenda');

export default async (req, res) => {
  const { authorization } = req.headers;
  const { date } = req.query;
  const [type, token] = req.headers.authorization.split(' ');

  if (!authorization) {
    return res.status(401).send();
  }

  try {
    const { user_id } = await firebaseServer.auth().verifyIdToken(token);

    const snapshot = await agenda
      .where('userId', '==', user_id)
      .where('date', '==', date)
      .get();

    const docs = snapshot.docs.map((doc) => doc.data());
    return res.status(200).json(docs);
  } catch (error) {
    console.error('Firebase Error: ' + error);
    return res.status(401).send();
  }
};
