const { Router } = require('express');
const { SuccessResponseObject } = require('../common/http');
const timesheetController = require('../controllers/timesheet.controller');

const r = Router();

r.get('/', (req, res) => res.json(new SuccessResponseObject('demo path live 🚀')));
r.get('/last-week', timesheetController.last);

module.exports = r;
