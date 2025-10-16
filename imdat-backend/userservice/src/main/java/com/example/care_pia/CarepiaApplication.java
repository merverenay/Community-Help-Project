package com.example.care_pia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class CarepiaApplication {

    public static void main(String[] args) {
        SpringApplication.run(CarepiaApplication.class, args);
    }

}
