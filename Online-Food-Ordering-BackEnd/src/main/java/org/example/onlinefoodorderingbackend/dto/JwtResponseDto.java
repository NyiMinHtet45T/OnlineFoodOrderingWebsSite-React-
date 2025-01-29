package org.example.onlinefoodorderingbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponseDto {

    private String token;
    private String message;
    private final String type = "Bearer";
    private Long userId;
    private String userRole;
}
