import { firebaseServer } from '@/config/firebase/server';

const db = firebaseServer.firestore();
const profiles = db.collection('profiles');
const agenda = db.collection('agenda');

const getUserId = async (username) => {
  const profileDoc = await profiles.where('username', '==', username).get();

  if (!profileDoc.docs.length) {
    return;
  }

  const { userId } = profileDoc.docs[0].data();

  return userId;
};

const setSchedule = async (req, res) => {
  const { username, when, name, phone, date } = req.body;

  const userId = await getUserId(username);

  const docId = `${userId}#${date}#${when}`;

  const agendaDoc = await agenda.doc(docId).get();

  if (agendaDoc.exists) {
    return res.status(400).send({ message: 'Horário já registrado' });
  }

  const userAgenda = await agenda.doc(docId).set({
    userId,
    date,
    when,
    name,
    phone,
  });

  return res.status(204).json(userAgenda);
};

const getSchedule = async (req, res) => {
  const { username, date } = req.query;

  const startAt = new Date(2021, 1, 1, 8, 0);
  const endAt = new Date(2021, 1, 1, 17, 0);
  const totalHours = Math.abs(endAt.getTime() - startAt.getTime()) / 36e5;

  const timesList = [];

  for (let index = 0; index <= totalHours; index++) {
    const time = startAt.getHours() + index;
    timesList.push(`${time}:00`);
  }

  const userId = await getUserId(username);

  if (!userId) {
    return res.status(404).send({ message: 'User not found' });
  }

  const agendaSnapshot = await agenda
    .where('userId', '==', userId)
    .where('date', '==', date)
    .get();

  const timesBlocked = agendaSnapshot.docs.map((doc) => doc.data());

  const result = timesList.map((time) => ({
    time,
    isBlocked: !!timesBlocked.find((doc) => doc.when === time),
  }));

  return res.status(200).json(result);
};

const methods = {
  POST: setSchedule,
  GET: getSchedule,
};

export default async (req, res) =>
  methods[req.method] ? methods[req.method](req, res) : res.status(405).send();
