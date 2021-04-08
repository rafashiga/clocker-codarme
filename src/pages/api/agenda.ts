export default async (req, res) => {
  console.log(req.query)

  res.status(204).json();
}
