package org.example.commentservice.controller;

import org.example.commentservice.entity.Comment;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.example.commentservice.services.commentService;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class commentController {
    private final commentService cs;

    @PostMapping("/publish")
    private void publishComment(@RequestBody Comment comment)
    {
         cs.save(comment);
    }
    @DeleteMapping("/delete/{commentId}")
    private void deleteComment(@PathVariable String commentId)
    {
        cs.delete(commentId);
    }

}
