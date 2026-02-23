package com.hms.Hospital.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "appt_seq")
    @SequenceGenerator(name = "appt_seq", sequenceName = "APPOINTMENT_SEQ", allocationSize = 1)
    private Long id;

    private LocalDate appointmentDate;
    private String status;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    public Appointment() {}

    public Appointment(LocalDate appointmentDate, String status, Patient patient, Doctor doctor) {
        this.appointmentDate = appointmentDate;
        this.status = status;
        this.patient = patient;
        this.doctor = doctor;
    }
    public Long getId() { return id; }

    public LocalDate getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(LocalDate appointmentDate) { this.appointmentDate = appointmentDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }
}
