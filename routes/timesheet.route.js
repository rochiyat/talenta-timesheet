const { Router } = require('express');
const { SuccessResponseObject } = require('../common/http');
const timesheetController = require('../controllers/timesheet.controller');

const router = Router();

router.get('/', (req, res) => res.json(new SuccessResponseObject('demo path live 🚀')));
router.get('/last-week', timesheetController.last);

module.exports = router;
