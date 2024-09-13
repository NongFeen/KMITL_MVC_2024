const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
}

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required.' });//return if need
    }

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(newEmployee);//return only newEmp value
}

const updateEmployee = (req, res) => {
    // Find the employee by ID
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {//if not found id
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    if (req.body.firstname) //not blank
        employee.firstname = req.body.firstname;
    if (req.body.lastname) 
        employee.lastname = req.body.lastname;
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];
    data.setEmployees(unsortedArray.sort((a, b) => a.id - b.id));
    //return the one who got update
    res.json(employee);
}

const deleteEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees(filteredArray);
    res.json(employee);
}

const getEmployee = (req, res) => {
    const employeeId = parseInt(req.body.id);
    const employee = data.employees.find(emp => emp.id === employeeId);//store data before it got deleted
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${employeeId} not found` });
    }
    const filteredArray = data.employees.filter(emp => emp.id !== employeeId);
    data.setEmployees(filteredArray);
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}