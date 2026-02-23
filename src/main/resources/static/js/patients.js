const apiUrl = "http://localhost:8080/api/patients";

let editingId = null;

function showForm() {
    document.getElementById("patientFormDiv").style.display = "block";
}

function hideForm() {
    document.getElementById("patientFormDiv").style.display = "none";
    document.getElementById("patientForm").reset();
    editingId = null;
}

document.getElementById("patientForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const patient = {
        name: document.getElementById("patientName").value,
        age: document.getElementById("patientAge").value,
        disease: document.getElementById("patientDisease").value,
        doctorName: document.getElementById("patientDoctorName").value
    };

    if (editingId) {
        await fetch(`${apiUrl}/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patient)
        });
    } else {
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patient)
        });
    }

    hideForm();
    loadPatients();
});

async function loadPatients() {
    const response = await fetch(apiUrl);
    const patients = await response.json();

    const tableBody = document.querySelector("#patientsTable tbody");
    tableBody.innerHTML = "";

    patients.forEach(p => {
        const row = tableBody.insertRow();

        row.insertCell(0).innerText = p.id;
        row.insertCell(1).innerText = p.name;
        row.insertCell(2).innerText = p.age;
        row.insertCell(3).innerText = p.disease;
        row.insertCell(4).innerText = p.doctorName;

        const updateBtn = document.createElement("button");
        updateBtn.innerText = "Update";
        updateBtn.onclick = () => editPatient(p);
        row.insertCell(5).appendChild(updateBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = () => deletePatient(p.id);
        row.insertCell(6).appendChild(deleteBtn);
    });
}

function editPatient(p) {
    editingId = p.id;

    document.getElementById("patientName").value = p.name;
    document.getElementById("patientAge").value = p.age;
    document.getElementById("patientDisease").value = p.disease;
    document.getElementById("patientDoctorName").value = p.doctorName;

    showForm();
}

async function deletePatient(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    });
    loadPatients();
}

loadPatients();