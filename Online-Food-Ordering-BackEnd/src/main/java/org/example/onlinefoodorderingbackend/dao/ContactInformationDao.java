package org.example.onlinefoodorderingbackend.dao;

import org.example.onlinefoodorderingbackend.model.ContactInformation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactInformationDao extends JpaRepository<ContactInformation, Long> {
}
