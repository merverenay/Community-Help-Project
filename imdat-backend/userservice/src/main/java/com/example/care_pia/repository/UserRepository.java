package com.example.care_pia.repository;

import com.example.care_pia.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, Integer> {
    User findByEmailAndPassword(String email, String password);

    User findByEmail(String email);


}
