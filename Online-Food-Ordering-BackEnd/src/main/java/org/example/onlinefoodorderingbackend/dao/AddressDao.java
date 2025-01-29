package org.example.onlinefoodorderingbackend.dao;

import org.example.onlinefoodorderingbackend.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressDao extends JpaRepository<Address, Long> {
}
