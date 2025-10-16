package com.pia.postservice.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;


@Getter
@Setter
@Document
public class Post {
    @Id
    private int id;
    private String email;
    private String description;
    private LocalDateTime createdAt=LocalDateTime.now();
    private Boolean isEmergencyPost;
    private long totalAmount=0;
    private boolean status=false;
    private String imageBase64;
    private Double latitude;
    private Double longitude;

}

