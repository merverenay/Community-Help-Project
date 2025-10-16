package com.pia.postservice;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.pia.postservice.client.UserServiceClient;
import com.pia.postservice.controller.PostController;
import com.pia.postservice.entity.Donate;
import com.pia.postservice.entity.Post;
import com.pia.postservice.repository.DonateRepository;
import com.pia.postservice.repository.PostRepository;
import com.pia.postservice.service.PostService;
import com.pia.postservice.service.dto.AddPostRequest;
import com.pia.postservice.service.dto.GetPostListResponse;
import com.pia.postservice.service.dto.HelpToPost;
import com.pia.postservice.service.dto.UserInfo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;

public class PostServiceApplicationTests {

	@Mock
	private PostRepository postRepository;

	@Mock
	private DonateRepository donateRepository;

	@Mock
	private UserServiceClient userServiceClient;

	@InjectMocks
	private PostService postService;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}
	@Test
	void contextLoads() {
		PostServiceApplication.main(new String[0]);
	}
	@Test
	void testSavePostSuccessfully() throws IOException {
		AddPostRequest addPostRequest = new AddPostRequest();
		addPostRequest.setEmail("test@example.com");
		addPostRequest.setDescription("Test Description");
		addPostRequest.setImage(new MockMultipartFile("image", "image.jpg", "image/jpeg", new byte[] {1, 2, 3}));
		addPostRequest.setIsEmergencyPost(false);
		addPostRequest.setLatitude(0.0);
		addPostRequest.setLongitude(0.0);

		when(userServiceClient.isUserExist(anyString())).thenReturn(true);
		when(postRepository.count()).thenReturn(0L);

		String result = postService.save(addPostRequest);

		assertEquals("Successfully Saved", result);
		verify(postRepository, times(1)).save(any(Post.class));
	}

	@Test
	void testSavePostUserNotFound() {
		AddPostRequest addPostRequest = new AddPostRequest();
		addPostRequest.setEmail("test@example.com");

		when(userServiceClient.isUserExist(anyString())).thenReturn(false);

		assertThrows(IllegalArgumentException.class, () -> {
			postService.save(addPostRequest);
		});
	}

	@Test
	void testHelpToPost() {
		HelpToPost helpToPost = new HelpToPost();
		helpToPost.setPostId(1);

		Post post = new Post();
		post.setId(1);

		when(postRepository.findById(anyInt())).thenReturn(Optional.of(post));

		String result = postService.helpToPost(helpToPost);

		assertEquals("Successfully Updated", result);
		verify(postRepository, times(1)).save(any(Post.class));
	}

	@Test
	void testGetEmergencyPosts() {
		Post post = new Post();
		post.setIsEmergencyPost(true);
		post.setEmail("test@example.com");

		List<Post> posts = new ArrayList<>();
		posts.add(post);

		when(postRepository.findByStatusFalseAndIsEmergencyPostTrue()).thenReturn(posts);

		UserInfo userInfo = new UserInfo();
		userInfo.setFirstName("Test");
		userInfo.setLastName("User");
		userInfo.setLatitude(0.0);
		userInfo.setLongitude(0.0);

		when(userServiceClient.getUserInfo("test@example.com")).thenReturn(userInfo);

		List<GetPostListResponse> responses = postService.getEmergencyPosts();

		assertFalse(responses.isEmpty());
		assertEquals("Test", responses.get(0).getFirstName());
		assertEquals("User", responses.get(0).getLastName());
	}


	@Test
	void testDonate() {
		Donate donate = new Donate();
		donate.setPostId(1);
		donate.setDonateAmount(50);

		Post post = new Post();
		post.setId(1);
		post.setTotalAmount(100);

		when(postRepository.findById(anyInt())).thenReturn(Optional.of(post));

		postService.donate(donate);

		verify(postRepository, times(1)).save(any(Post.class));
		verify(donateRepository, times(1)).save(any(Donate.class));
	}

	@Test
	void testGetPostById() {
		int postId = 1;

		Post post = new Post();
		post.setId(postId);
		post.setEmail("test@example.com");

		UserInfo userInfo = new UserInfo();
		userInfo.setFirstName("Test");
		userInfo.setLastName("User");

		when(postRepository.findById(postId)).thenReturn(Optional.of(post));
		when(userServiceClient.getUserInfo(post.getEmail())).thenReturn(userInfo);

		GetPostListResponse response = postService.getPostById(postId);

		assertEquals(postId, response.getId());
		assertEquals("Test", response.getFirstName());
		assertEquals("User", response.getLastName());
	}
}
