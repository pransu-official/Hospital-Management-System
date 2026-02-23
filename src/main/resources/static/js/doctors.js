const apiUrl = "http://localhost:8080/api/doctors";

let editingId = null;

// SHOW FORM
function showForm() {
    document.getElementById("doctorFormDiv").style.display = "block";
}

// HIDE FORM
function hideForm() {
    document.getElementById("doctorFormDiv").style.display = "none";
    resetForm();
}

// LOAD ALL DOCTORS
function loadDoctors() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const tableBody = document
                .getElementById("doctorsTable")
                .getElementsByTagName("tbody")[0];

            tableBody.innerHTML = "";

            data.forEach(d => {
                const row = tableBody.insertRow();

                row.insertCell(0).innerText = d.id;
                row.insertCell(1).innerText = d.name;
                row.insertCell(2).innerText = d.phone;
                row.insertCell(3).innerText = d.specialization;

                // UPDATE BUTTON
                const updateBtn = document.createElement("button");
                updateBtn.innerText = "Update";
                updateBtn.onclick = () => editDoctor(d);
                row.insertCell(4).appendChild(updateBtn);

                // DELETE BUTTON
                const deleteBtn = document.createElement("button");
                deleteBtn.innerText = "Delete";
                deleteBtn.onclick = () => deleteDoctor(d.id);
                row.insertCell(5).appendChild(deleteBtn);
            });
        });
}

// FORM SUBMIT (ADD + UPDATE)
document.getElementById("doctorForm").onsubmit = function(e) {
    e.preventDefault();

    const payload = {
        name: document.getElementById("doctorName").value,
        phone: document.getElementById("doctorPhone").value,
        specialization: document.getElementById("doctorSpecialization").value
    };

    if (editingId) {
        // UPDATE
        fetch(`${apiUrl}/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        .then(() => {
            hideForm();
            loadDoctors();
        });
    } else {
        // ADD
        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        .then(() => {
            hideForm();
            loadDoctors();
        });
    }
};

// EDIT
function editDoctor(d) {
    editingId = d.id;

    document.getElementById("doctorName").value = d.name;
    document.getElementById("doctorPhone").value = d.phone;
    document.getElementById("doctorSpecialization").value = d.specialization;

    document.getElementById("submitBtn").innerText = "Update";
    showForm();
}

// DELETE
function deleteDoctor(id) {
    if (confirm("Are you sure?")) {
        fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        })
        .then(() => loadDoctors());
    }
}

// RESET
function resetForm() {
    editingId = null;
    document.getElementById("doctorForm").reset();
    document.getElementById("submitBtn").innerText = "Save";
}

// INITIAL LOAD
loadDoctors();