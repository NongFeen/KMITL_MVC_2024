const ip = window.location.href;
document.addEventListener('DOMContentLoaded', () => {
    // GET Button
    const getButton = document.getElementById('getButton');
    const getStatusDiv = document.getElementById('GETstatusMessage');
    const milkButton = document.getElementById('milkButton');
    const lemonButton = document.getElementById('addLemon');

    getButton.addEventListener('click', () => {
        const id = document.getElementById('USEGETAPI').value.trim();
        
        if (!id) {
            getStatusDiv.textContent = 'Please enter an ID';
            return;
        }
        if (!/^\d{8}$/.test(id)) {
            getStatusDiv.textContent = 'ID must be exactly 8 digits long';
            return;
        }
        fetch(`${ip}employees/${id}`)
            .then(response => {
                // if (!response.ok) {
                //     throw new Error(`Employee ID ${id} not found`);
                // }
                return response.json();
            })
            .then(data => {
                if(data.message)
                    getStatusDiv.textContent = `${data.message}`;
                else{//displaydata
                    getStatusDiv.innerHTML = `
                    <p><id="cowid" strong>Cow id: </strong> ${data.id}</p>
                    <p><strong>Color: </strong> ${data.color}</p>
                    <p><strong>Year: </strong> ${data.ageYear}</p>
                    <p><strong>month: </strong> ${data.ageMonth - 12*data.ageYear}</p>
                    <p><strong>Total month: </strong> ${data.ageMonth}</p>
                    <p><strong>Milk Count: </strong> ${data.milkCount}</p>
                    <p><strong>is Eated Lemon: </strong> ${data.eatLemon}</p>
                    <p><strong>isBSOD: </strong> ${data.isBSOD}</p>
                    
                `;
                }
                if(data.color ='White'){
                    lemonButton.style.display= "block";
                }
                else if(data.color ='Brown'){
                
                }
                milkButton.style.display= "block";
            })
            .catch(error => {
                getStatusDiv.textContent = `Error: ${error.message}`;
            });
    });

    //milk button
    milkButton.addEventListener('click', () => {
        const cowid = document.getElementById('USEGETAPI').value.trim();
        
        const payload = {
            "id":cowid,
        };
        if (!cowid) {
            getStatusDiv.textContent = payload;
            return;
        }
        fetch(`${ip}employees/${cowid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            return response.json();//just need this idk y
        })
        .then(data => {
            // Ensure the data is an object
            if (data && typeof data === 'object') {
                // Create HTML to display the data
                getStatusDiv.innerHTML = `
                    <p><strong>Bland Milk: </strong> ${data.bland}</p>
                    <p><strong>Sour Milk: </strong> ${data.sour}</p>
                    <p><strong>Chocolate Milk: </strong> ${data.choco}</p>
                    <p><strong>Soy Milk: </strong> ${data.soy}</p>
                    <p><strong>Almond Milk: </strong> ${data.almond}</p>
                `;
            } else {
                // Handle unexpected data format
                getStatusDiv.textContent = 'Unexpected data format received.';
            }
        })
    });
});
