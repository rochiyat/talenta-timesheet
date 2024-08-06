const { Router } = require('express');
const { SuccessResponseObject } = require('../common/http');
const timesheet = require('./timesheet.route');

const r = Router();

r.use('/timesheet', timesheet);

r.get('/', (req, res) => res.json(new SuccessResponseObject('express vercel boiler plate')));

module.exports = r;
