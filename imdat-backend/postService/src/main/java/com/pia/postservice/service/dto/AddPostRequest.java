package com.pia.postservice.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddPostRequest {
    private String email;
    private Boolean isEmergencyPost;
    private String description;
    private MultipartFile image;
    private Double latitude;
    private Double longitude;
}
