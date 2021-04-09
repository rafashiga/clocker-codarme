import { firebaseServer } from '@/config/firebase/server';

const db = firebaseServer.firestore();
const profile = db.collection('profile');
const agenda = db.collection('agenda');

const startAt = new Date(2021, 1, 1, 8, 0);
const endAt = new Date(2021, 1, 1, 17, 0);
const totalHours = Math.abs(endAt.getTime() - startAt.getTime()) / 36e5;

const timeOptions = { hour: '2-digit', minute: '2-digit' };

const timeBlocks = [];

for (let index = 0; index <= totalHours; index++) {
  const time = startAt.getHours() + index;
  timeBlocks.push(`${time}:00`);
}

export default async (req, res) => {
  const { username, when } = req.query;
  try {
    // const profileDoc = await profile.where('username', '==', username).get();

    // const snapshot = agenda
    //   .where('userId', '==', profileDoc['user_id'])
    //   .where('when', '==', when)
    //   .get();

    return res.status(200).json(timeBlocks);
  } catch (error) {
    console.error('Firebase Error: ' + error);
    return res.status(401);
  }
};
