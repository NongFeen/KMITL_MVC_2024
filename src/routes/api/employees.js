const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');

//index route
router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee)
    

router.route('/:id')
    .get(employeesController.getEmployee)
    .put(employeesController.milkCow);

module.exports = router;