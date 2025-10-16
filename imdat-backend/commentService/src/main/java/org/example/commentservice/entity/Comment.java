package org.example.commentservice.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
@Data
@Document
public class Comment {
    @Id
    private int commentId;
    private String content;
    private int  userId;
   // private LocalDateTime date;
    private String postId;
}
