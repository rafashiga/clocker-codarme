import { firebaseServer } from '@/config/firebase/server';

const db = firebaseServer.firestore();
const profile = db.collection('profiles');

export default async (req, res) => {
  const { username } = req.body;
  const [type, token] = req.headers.authorization.split(' ');
  const { user_id } = await firebaseServer.auth().verifyIdToken(token);

  profile.doc(username).set({
    userId: user_id,
    username,
  });

  res.status(204).json();
};
