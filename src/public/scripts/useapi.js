document.addEventListener('DOMContentLoaded', () => {
    // GET Button
    const getButton = document.getElementById('getButton');
    const getStatusDiv = document.getElementById('GETstatusMessage');

    getButton.addEventListener('click', () => {
        const id = document.getElementById('USEGETAPI').value.trim();
        
        if (!id) {
            getStatusDiv.textContent = 'Please enter an ID';
            return;
        }
        fetch(`http://localhost:5500/employees/${id}`)
            .then(response => {
                // if (!response.ok) {
                //     throw new Error(`Employee ID ${id} not found`);
                // }
                return response.json();
            })
            .then(data => {
                getStatusDiv.innerHTML = `
                    <p><strong>First Name:</strong> ${data.firstname}</p>
                    <p><strong>Last Name:</strong> ${data.lastname}</p>
                `;
            })
            .catch(error => {
                getStatusDiv.textContent = `Error: ${error.message}`;
            });
    });
    const postButton = document.getElementById('postButton');
    const postFName = document.getElementById('USEPOSTAPI_FName');
    const postLName = document.getElementById('USEPOSTAPI_LName');
    const postStatusDiv = document.getElementById('POSTstatusMessage');

    postButton.addEventListener('click', () => {
        const firstname = postFName.value.trim();
        const lastname = postLName.value.trim();

        // input is not blank
        // if (!firstname || !lastname) {
        //     postStatusDiv.textContent = 'Both first name and last name are required.';
        //     return;
        // }
        // Create the payload for the POST request
        const payload = {
            firstname: firstname,
            lastname: lastname
        };
        // Send POST request to the API
        fetch('http://localhost:5500/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            return response.json();//just need this idk y
        })
        .then(data => {
            // if created will have first and lastname
            if (data.firstname && data.lastname) {
                postStatusDiv.textContent = `Employee created: ${data.firstname} ${data.lastname}`;
            } else {//return message from api
                postStatusDiv.textContent = `${data.message}`;
            }
        })
    });

    //PUT button
    const PUTButton = document.getElementById('putButton');
    const PUTID = document.getElementById('USEPUTAPI_ID');
    const PUTFName = document.getElementById('USEPUTAPI_FName');
    const PUTLName = document.getElementById('USEPUTAPI_LName');
    const PUTStatusDiv = document.getElementById('PUTstatusMessage');

    PUTButton.addEventListener('click', () => {
        const id = PUTID.value.trim();
        const firstname = PUTFName.value.trim();
        const lastname = PUTLName.value.trim();

        // input is not blank
        // if (!id||!firstname || !lastname) {
        //     PUTStatusDiv.textContent = 'Both first name and last name are required.';
        //     return;
        // }
        // Create the payload for the PUT request
        const payload = {
            id: id,
            firstname: firstname,
            lastname: lastname
        };

        // Send PUT request to the API
        fetch('http://localhost:5500/employees', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            // if created will have first and lastname
            if (data.firstname && data.lastname) {
                PUTStatusDiv.textContent = `Employee update: ${data.firstname} ${data.lastname}`;
            } else {//return message from api
                PUTStatusDiv.textContent = `${data.message}`;
            }
        })
    });
    //Delete button
    const DELETEButton = document.getElementById('deleteButton');
    const DELETEID = document.getElementById('USEDELETEAPI_ID');
    const DELETEStatusDiv = document.getElementById('DELETEstatusMessage');
    DELETEButton.addEventListener('click', () => {
        const id = DELETEID.value.trim();
        const payload = {
            id: id,
        };
        fetch('http://localhost:5500/employees', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
                DELETEStatusDiv.textContent = `Employee deleted: ${data.firstname} ${data.lastname}`;
        })
    });
});
