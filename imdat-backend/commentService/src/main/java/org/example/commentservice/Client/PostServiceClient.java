package org.example.commentservice.Client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "postService", url = "${postService.url}")
public interface PostServiceClient {

    @GetMapping("api/posts/is_post_exist/{postId}")
    boolean isPostExist(@PathVariable int postId);

}
