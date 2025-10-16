package com.pia.postservice.controller;

import com.pia.postservice.entity.Donate;
import com.pia.postservice.service.PostService;
import com.pia.postservice.service.dto.AddPostRequest;
import com.pia.postservice.service.dto.GetPostListResponse;
import com.pia.postservice.service.dto.HelpToPost;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    @PostMapping("/create")
    public String createPost(@ModelAttribute AddPostRequest post) throws IOException {
        return postService.save(post);

    }
    @PutMapping("/helpToPost")
    public String helpToPost(@RequestBody HelpToPost helpToPost) {
        return postService.helpToPost(helpToPost);
    }


    @GetMapping("/getAllPosts/{email}")
    public List<GetPostListResponse> getAllPosts(@PathVariable String email){
        return postService.getAllPosts(email);
    }

    @GetMapping("/getAllEmergencyPosts")
    public List<GetPostListResponse> getEmergencyPosts(){
        return postService.getEmergencyPosts();
    }
    @GetMapping("/getAllDonatePosts")
    public List<GetPostListResponse> getDonatePosts(){
        return postService.getDonatePosts();
    }
    @GetMapping("/is_post_exist/{postId}")
    public boolean isPostExist(@PathVariable int postId) {
        return postService.isPostExist(postId);
    }
    @PostMapping("/donate")
    public void donate(@RequestBody Donate donate){
        postService.donate(donate);
    }
    @GetMapping("/getPostsAroundUser/{email}")
    public List<GetPostListResponse> getPostsAroundUser(@PathVariable String email){
        return postService.getPostsAroundUser(email);

    }
    @GetMapping("/getPostById/{postId}")
    public GetPostListResponse getPostById(@PathVariable int postId){
        return postService.getPostById(postId);
    }
    @PutMapping("/removeHelpToPost")
    public String removeHelpToPost(@RequestBody HelpToPost helpToPost) {
        return postService.removeHelpToPost(helpToPost);
    }

}
