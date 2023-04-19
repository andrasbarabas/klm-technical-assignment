var express = require('express');
var router = express.Router();
var mock = require('../data/mock.json');

router.post('/', function (req, res, next) {
  const bookingCode = req.body?.bookingCode;
  const familyName = req.body?.familyName;

  if (bookingCode && familyName) {
    if (bookingCode === mock.bookingCode && familyName === mock.passengers.lastName) {
      return res.status(200).json({
        token: 'abcd'
      });
    }

    return res.status(401).json({ message: 'Invalid Booking Code or Family Name.' });
  }

  return res.status(400).json({ message: 'Invalid payload format.' });
});

module.exports = router;
