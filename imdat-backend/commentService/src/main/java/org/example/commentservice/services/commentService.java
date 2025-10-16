package org.example.commentservice.services;

import org.example.commentservice.Client.PostServiceClient;
import org.example.commentservice.entity.Comment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.example.commentservice.repos.commentRepository;

@Service
@RequiredArgsConstructor
public class commentService {
    private final commentRepository repository;

    private final PostServiceClient postServiceClient;

    public void save(Comment comment) {
        if(postServiceClient.isPostExist(Integer.parseInt(comment.getPostId()))) {
            repository.save(comment);
        }
        else {
            throw new IllegalArgumentException("Post yok!!");
        }
    }

    public void delete(String commentId) {
        repository.deleteById(commentId);
    }


}
