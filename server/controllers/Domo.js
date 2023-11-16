const models = require('../models');

const { Domo } = models;

const makerPage = async (req, res) => {
  console.log('rendering maker page');
  return res.render('app');
};

const makeDomo = async (req, res) => {
  console.log('entering Domo.js > makeDomo');
  console.log(req.body.name + req.body.color + req.body.age);
  if (!req.body.name || !req.body.color || !req.body.age) {
    return res.status(400).json({ error: 'Name, color, and age are required!' });
  }

  const domoData = {
    name: req.body.name,
    color: req.body.color,
    age: req.body.age,
    owner: req.session.account._id,
  };

  console.log(domoData);

  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res.status(201).json({ name: newDomo.name, color: newDomo.color, age: newDomo.age });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists!' });
    }
    return res.status(500).json({ error: 'An error occured making domo!' });
  }
};

const getDomos = async (req, res, params) => {
  console.log('entering domos.js');
  console.log(req.body.username);
  console.log(params.username);
  try {
    const query = { owner: req.session.account._id };
    const docs = await Domo.find(query).select('name color age').lean().exec();

    return res.json({ domos: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving domos!' });
  }
};

module.exports = {
  makerPage,
  makeDomo,
  getDomos,
};
