package com.pia.postservice.service;

import com.pia.postservice.client.UserServiceClient;
import com.pia.postservice.entity.Donate;
import com.pia.postservice.entity.Post;
import com.pia.postservice.repository.DonateRepository;
import com.pia.postservice.repository.PostRepository;
import com.pia.postservice.service.dto.AddPostRequest;
import com.pia.postservice.service.dto.GetPostListResponse;
import com.pia.postservice.service.dto.HelpToPost;
import com.pia.postservice.service.dto.UserInfo;
import com.pia.postservice.service.mapper.PostMapper;
import com.pia.postservice.util.GeoUtils;
import com.pia.postservice.util.ImageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final DonateRepository donateRepository;
    private final UserServiceClient userServiceClient;

    public String save(AddPostRequest addPostRequest) throws IOException {

        if (!userServiceClient.isUserExist(addPostRequest.getEmail())) {
            throw new IllegalArgumentException("User Not Found!!!!");
        }
        // Description validation, the description cannot exceed 200 words
        String description = addPostRequest.getDescription();
        if (description.length() > 200) {
            throw new IllegalArgumentException("Açıklama 200 kelimeden fazla olamaz!");
        }
        //Image type validation, Image cannot be empty and must be in jpeg or png format
        if (addPostRequest.getImage() == null || addPostRequest.getImage().isEmpty()) {
            throw new IllegalArgumentException("Görsel yüklenmelidir.");
        }
        String contentType = addPostRequest.getImage().getContentType();
        if(!(contentType != null && (contentType.equals("image/jpeg") || contentType.equals("image/png")))) {
            throw new IllegalArgumentException("Görsel .jpg veya .png formatında olmalıdır.");
        }
        Post post = PostMapper.INSTANCE.postFromAddRequest(addPostRequest);
        post.setId(generatePostId());
        byte[] imageBytes = addPostRequest.getImage().getBytes();
        String imageBase64 = ImageUtil.encodeImageToBase64(imageBytes);
        post.setImageBase64(imageBase64);

        postRepository.save(post);
        return "Successfully Saved";
    }

    public String helpToPost(HelpToPost helpToPost){
        userServiceClient.helpToPost(helpToPost);
        Optional<Post> post = postRepository.findById(helpToPost.getPostId());
        if(post.isPresent()){
            post.get().setStatus(true);
            postRepository.save(post.get());
        }



        return "Successfully Updated";
    }
    public String removeHelpToPost(HelpToPost helpToPost){
        userServiceClient.removeHelpToPost(helpToPost);
        Optional<Post> post = postRepository.findById(helpToPost.getPostId());
        if(post.isPresent()){
            post.get().setStatus(false);
            postRepository.save(post.get());
        }



        return "Successfully Updated";
    }
    public List<GetPostListResponse> getEmergencyPosts() {
        List<Post> posts = postRepository.findByStatusFalseAndIsEmergencyPostTrue();
        return getPostListResponses(posts);
    }
    public List<GetPostListResponse> getDonatePosts() {
        List<Post> posts=postRepository.findByIsEmergencyPostFalse();

        return getPostListResponses(posts);


    }

    private List<GetPostListResponse> getPostListResponses(List<Post> posts) {
        List<GetPostListResponse> getPostListResponses=new ArrayList<>();
        for (Post post : posts) {
            UserInfo userInfo = userServiceClient.getUserInfo(post.getEmail());
            GetPostListResponse getPostListResponse=PostMapper.INSTANCE.postFromGetListResponse(post);
            getPostListResponse.setFirstName(userInfo.getFirstName());
            getPostListResponse.setLastName(userInfo.getLastName());
            getPostListResponses.add(getPostListResponse);
        }

        return getPostListResponses;
    }


    public boolean isPostExist(int postId) {
        Optional<Post> post = postRepository.findById(postId);
        return post.isPresent();
    }
    public void donate(Donate donate){
        Post post =postRepository.findById(donate.getPostId()).orElse(null);
        post.setTotalAmount(post.getTotalAmount()+ donate.getDonateAmount());
        postRepository.save(post);
        donateRepository.save(donate);
    }

    public List<GetPostListResponse> getPostsAroundUser(String email) {
        UserInfo userLocationInfo=userServiceClient.getUserInfo(email);

        List<GetPostListResponse> allPosts =getEmergencyPosts();

        return allPosts.stream()
                .filter(post -> GeoUtils.calculateDistance(userLocationInfo.getLatitude(), userLocationInfo.getLongitude(), post.getLatitude(), post.getLongitude()) <= 100) // 1 KM = 1000 meters
                .collect(Collectors.toList());
    }


    public List<GetPostListResponse> getAllPosts(String email) {
        List<Post> donatePosts = postRepository.findByIsEmergencyPostFalse();
        List<GetPostListResponse> emergencyPosts =getPostsAroundUser(email);
        List<GetPostListResponse> allActivePosts=new ArrayList<>();
        allActivePosts.addAll(emergencyPosts);
        allActivePosts.addAll(getPostListResponses(donatePosts));
        allActivePosts.sort(Comparator.comparing(GetPostListResponse::getCreatedAt).reversed());

        return allActivePosts;
    }
    public GetPostListResponse getPostById(int postId) {
        Optional<Post> post = postRepository.findById(postId);
        GetPostListResponse getPostListResponse=PostMapper.INSTANCE.postFromGetListResponse(post.get());
        UserInfo userInfo = userServiceClient.getUserInfo(post.get().getEmail());
        getPostListResponse.setFirstName(userInfo.getFirstName());
        getPostListResponse.setLastName(userInfo.getLastName());
        return getPostListResponse;
    }
    public int generatePostId() {
        int count = (int) postRepository.count();

        if (count > 0) {
            return count+1;
        } else {
            return 1;
        }

    }
}
