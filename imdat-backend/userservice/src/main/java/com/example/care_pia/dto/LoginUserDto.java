package com.example.care_pia.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginUserDto {
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    private String password;
    private double latitude;
    private double longitude;
}
