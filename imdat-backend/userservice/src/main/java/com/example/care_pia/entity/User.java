package com.example.care_pia.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
@NoArgsConstructor
@Data
public class User {

    @Id
    private int userId;
    private String firstName;
    private String lastName;
    private String email;
    private List<Integer> helpToPostlist=new ArrayList<>();
    private String password;
    private double latitude;
    private double longitude;


}
