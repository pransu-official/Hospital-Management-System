package com.hms.Hospital.service;

import com.hms.Hospital.dto.DashboardDTO;
import com.hms.Hospital.repository.PatientRepository;
import com.hms.Hospital.repository.DoctorRepository;
import com.hms.Hospital.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.time.LocalDate;

@Service
public class DashboardService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public DashboardDTO getDashboardStats() {
        long totalPatients = patientRepository.count();
        long totalDoctors = doctorRepository.count();
        long totalAppointments = appointmentRepository.count();

        long todaysAppointments = appointmentRepository.findAll().stream()
                .filter(a -> a.getAppointmentDate() != null)
                .filter(a -> a.getAppointmentDate().equals(LocalDate.now()))
                .count();

        long scheduledAppointments = appointmentRepository.findAll().stream()
                .filter(a -> "Scheduled".equalsIgnoreCase(a.getStatus()))
                .count();

        long completedAppointments = appointmentRepository.findAll().stream()
                .filter(a -> "Completed".equalsIgnoreCase(a.getStatus()))
                .count();

        long cancelledAppointments = appointmentRepository.findAll().stream()
                .filter(a -> "Cancelled".equalsIgnoreCase(a.getStatus()))
                .count();

        return new DashboardDTO(totalPatients, totalDoctors, totalAppointments,
                todaysAppointments, scheduledAppointments, completedAppointments, cancelledAppointments);
    }
}
