package org.example.commentservice.repos;

import org.example.commentservice.entity.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface commentRepository extends MongoRepository<Comment,String> {
}
