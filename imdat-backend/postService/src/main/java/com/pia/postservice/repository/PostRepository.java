package com.pia.postservice.repository;

import com.pia.postservice.entity.Post;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepository extends MongoRepository<Post, Integer> {
    List<Post> findByStatusFalse();

    List<Post> findByStatusFalseAndIsEmergencyPostTrue();

    List<Post> findByIsEmergencyPostFalse();
}
