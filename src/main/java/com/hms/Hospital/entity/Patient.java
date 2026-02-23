package com.hms.Hospital.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "patient_seq_gen")
    @SequenceGenerator(name = "patient_seq_gen", sequenceName = "PATIENT_SEQ", allocationSize = 1)
    private Long id;

    private String name;
    private int age;
    private String disease;

    @Column(name = "doctor_name")
    private String doctorName;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }

    public void setAge(int age) { this.age = age; }

    public String getDisease() { return disease; }

    public void setDisease(String disease) { this.disease = disease; }

    public String getDoctorName() { return doctorName; }

    public void setDoctorName(String doctorName) { this.doctorName = doctorName; }
}