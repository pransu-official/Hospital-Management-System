const apiUrl = "http://localhost:8080/api/appointments";

let editingId = null;
function loadAppointments() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const tableBody = document
                .getElementById('appointmentsTable')
                .getElementsByTagName('tbody')[0];

            tableBody.innerHTML = "";

            data.forEach(a => {
                const row = tableBody.insertRow();

                row.insertCell(0).innerText = a.id;
                row.insertCell(1).innerText = a.patient?.name || "";
                row.insertCell(2).innerText = a.doctor?.name || "";
                row.insertCell(3).innerText = a.appointmentDate;
                row.insertCell(4).innerText = a.status;


                const updateBtn = document.createElement("button");
                updateBtn.innerText = "Update";
                updateBtn.onclick = () => editAppointment(a);
                row.insertCell(5).appendChild(updateBtn);


                const deleteBtn = document.createElement("button");
                deleteBtn.innerText = "Delete";
                deleteBtn.onclick = () => deleteAppointment(a.id);
                row.insertCell(6).appendChild(deleteBtn);
            });
        })
        .catch(err => console.error("Error loading:", err));
}
document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const payload = {
        appointmentDate: document.getElementById('appointmentDate').value,
        status: document.getElementById('status').value,
        patient: { id: parseInt(document.getElementById('patientId').value) },
        doctor: { id: parseInt(document.getElementById('doctorId').value) }
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${apiUrl}/${editingId}` : apiUrl;

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Server Error");
        }
        return res.json();
    })
    .then(() => {
        alert(editingId ? "Appointment Updated Successfully!" : "Appointment Added Successfully!");
        resetForm();
        loadAppointments();
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Something went wrong. Check console.");
    });
});
function editAppointment(a) {
    editingId = a.id;

    document.getElementById('appointmentDate').value = a.appointmentDate;
    document.getElementById('status').value = a.status;
    document.getElementById('patientId').value = a.patient?.id || "";
    document.getElementById('doctorId').value = a.doctor?.id || "";

    document.getElementById('submitBtn').innerText = "Update Appointment";
}
function deleteAppointment(id) {
    if (confirm("Are you sure you want to delete this appointment?")) {
        fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Delete failed");
            }
            alert("Appointment Deleted!");
            loadAppointments();
        })
        .catch(err => console.error("Delete error:", err));
    }
}
function resetForm() {
    editingId = null;
    document.getElementById('appointmentForm').reset();
    document.getElementById('submitBtn').innerText = "Add Appointment";
}
loadAppointments();
