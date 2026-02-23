package com.hms.Hospital.service;

import com.hms.Hospital.entity.Appointment;
import com.hms.Hospital.entity.Patient;
import com.hms.Hospital.entity.Doctor;
import com.hms.Hospital.repository.AppointmentRepository;
import com.hms.Hospital.repository.PatientRepository;
import com.hms.Hospital.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              PatientRepository patientRepository,
                              DoctorRepository doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    public Appointment saveAppointment(Appointment appointment) {

        Long patientId = appointment.getPatient().getId();
        Long doctorId = appointment.getDoctor().getId();

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        appointment.setPatient(patient);
        appointment.setDoctor(doctor);

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }


    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    public Appointment updateAppointment(Long id, Appointment updated) {

        Appointment existing = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        Long patientId = updated.getPatient().getId();
        Long doctorId = updated.getDoctor().getId();

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        existing.setAppointmentDate(updated.getAppointmentDate());
        existing.setStatus(updated.getStatus());
        existing.setPatient(patient);
        existing.setDoctor(doctor);

        return appointmentRepository.save(existing);
    }


}
