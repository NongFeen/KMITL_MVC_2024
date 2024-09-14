const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
}
const milkData = {
    milk: require('../model/milk.json'),
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
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
    }
    res.json(employee);
}

const milkCow = (req, res) => {
    const cow = data.employees.find(emp => emp.id === parseInt(req.body.id));
    const milk = milkData.milk.find(m=> m.bland === m.bland);
    if (!cow) {
        return res.status(404).json({ message: 'Cow not found ' + req.id});
    }
    if(cow.color=="White"){
        const chance = 0.005 * (cow.ageMonth % 12); //diff in month
        if (Math.random() < chance && cow.eatLemon == false){//never eat lemon
            milk.soy = milk.soy+1;
            cow.color = "blue"
            cow.isBSOD = true;
        }
        else if(cow.eatLemon == true) // produce sour milk
            milk.sour = milkCow.sour+1;
        else
            milk.bland = milk.bland+1;
    }
    if(cow.color=="brown"){
        const chance = 0.01 * (cow.ageYear); //diff in year
        if (Math.random() < chance && cow.eatLemon == false){//never eat lemon
            milk.almond = milk.alomnd+1;
            cow.color = "blue"
            cow.isBSOD = true;
        }
        else if(cow.eatLemon == true) // produce sour milk
            milk.sour = milkCow.sour+1;
        else
            milk.bland = milk.bland+1;
    }

    cow.milkCount = cow.milkCount+1;

    res.json(milk);
};

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
    milkCow
}