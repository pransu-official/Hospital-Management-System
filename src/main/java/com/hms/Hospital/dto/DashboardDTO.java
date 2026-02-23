package com.hms.Hospital.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardDTO {
    private long totalPatients;
    private long totalDoctors;
    private long totalAppointments;
    private long todaysAppointments;
    private long scheduledAppointments;
    private long completedAppointments;
    private long cancelledAppointments;
}
