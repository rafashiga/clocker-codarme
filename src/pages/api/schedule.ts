import { firebaseServer } from '@/config/firebase/server';

const db = firebaseServer.firestore();
const profiles = db.collection('profiles');
const agenda = db.collection('agenda');

const setSchedule = async (req, res) => {
  const { username, when, name, phone } = req.body;
  const profileDoc = await profiles.where('username', '==', username).get();

  const { userId } = profileDoc.docs[0].data();

  const agendaDoc = await agenda.doc(`${userId}#${when}`).get();

  if (agendaDoc.exists) {
    return res.status(400);
  }

  await agenda.doc(`${userId}#${when}`).set({
    userId,
    when,
    name,
    phone,
  });

  return res.status(204);
};

const getSchedule = (req, res) => {
  const startAt = new Date(2021, 1, 1, 8, 0);
  const endAt = new Date(2021, 1, 1, 17, 0);
  const totalHours = Math.abs(endAt.getTime() - startAt.getTime()) / 36e5;

  const timeBlocks = [];

  for (let index = 0; index <= totalHours; index++) {
    const time = startAt.getHours() + index;
    timeBlocks.push(`${time}:00`);
  }

  return res.status(200).json(timeBlocks);
};

const methods = {
  POST: setSchedule,
  GET: getSchedule,
};

export default async (req, res) =>
  methods[req.method] ? methods[req.method](req, res) : res.status(405);
