package org.example.onlinefoodorderingbackend.dao;

import org.example.onlinefoodorderingbackend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleDao extends JpaRepository<Role, Long> {
    Role findRoleByRoleName(String roleName);
}
