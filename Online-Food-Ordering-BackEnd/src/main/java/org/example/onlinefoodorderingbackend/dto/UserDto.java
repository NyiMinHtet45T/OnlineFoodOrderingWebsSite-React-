package org.example.onlinefoodorderingbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {

    private Long id;
    private String username;
    private String email;
    private String password;
    private String roleName;
    private String phoneNumber;

}
