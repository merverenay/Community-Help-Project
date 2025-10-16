package com.pia.postservice.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.service.annotation.GetExchange;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetPostListResponse {
    private int id;
    private String email;
    private String lastName;
    private String firstName;
    private String description;
    private LocalDateTime createdAt;
    private Boolean isEmergencyPost;
    private long totalAmount;
    private boolean status;
    private double latitude;
    private double longitude;
    private String imageBase64;

}
