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
                if (!response.ok) {
                    throw new Error(`Employee ID ${id} not found`);
                }
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


});
