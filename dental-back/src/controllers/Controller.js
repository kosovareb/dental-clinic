const Services = require('../services/Services');

class Controller {
  async getAllData(req, res) {
    try {
      const allData = await Services.getAllData();

      res.json(allData);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error - main controller');
    }
  }
}

module.exports = new Controller();
