package com.example.care_pia;

import com.example.care_pia.controller.UserController;
import com.example.care_pia.dto.*;
import com.example.care_pia.entity.User;
import com.example.care_pia.repository.UserRepository;
import com.example.care_pia.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.cloud.client.ConditionalOnDiscoveryHealthIndicatorEnabled;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@WebMvcTest(UserController.class)
public class CarepiaApplicationTests {

    @Autowired
    private MockMvc mockMvc;
@Mock
UserController userController;
    @MockBean
    private UserService userService;
    @InjectMocks
            private UserService muc;
    @Mock
    UserRepository userRepository;
@InjectMocks
UserController mus;


    @Test
    public void testGetUserByEmail() throws Exception {
        String email = "test@example.com";
        User mockUser = new User();
        mockUser.setEmail(email);
        mockUser.setFirstName("John");
        mockUser.setLastName("Doe");

        when(userService.getUserByEmail(email)).thenReturn(mockUser);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/test/user/{email}", email))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(email));
    }

    @Test
    public void testRegisterUser() throws Exception {
        RegisterUserDto userDto = new RegisterUserDto();
        userDto.setEmail("test@example.com");
        userDto.setPassword("Password123");
        userDto.setFirstName("John");
        userDto.setLastName("Doe");

       // when(mus.register(userDto)).thenReturn("User successfully saved.");
        String result=muc.saveUser(userDto);
        assertEquals("User successfully saved.", result);
       }

    @Test
    void testLogin_Successful() {
        // Prepare test data
        LoginUserDto loginUserDto = new LoginUserDto();
        loginUserDto.setEmail("test@example.com");
        loginUserDto.setPassword("Password1");
        loginUserDto.setLatitude(123.456);
        loginUserDto.setLongitude(789.012);

        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("Password1");
        user.setFirstName("Test");
        user.setLastName("User");

        when(userRepository.findByEmailAndPassword(anyString(), anyString())).thenReturn(user);
        when(userRepository.save(any(User.class))).thenReturn(user);


        UserDto result = muc.login(loginUserDto);


        assertEquals("test@example.com", result.getEmail());
        assertEquals("Test", result.getFirstName());
        assertEquals("User", result.getLastName());
    }

    @Test
    public void testIsUserExist() throws Exception {
        String email = "test@example.com";

        when(userService.isUserExist(email)).thenReturn(true);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/test/is_user_exist/{email}", email))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("true"));
    }

    @Test
    public void testGetUserInfo() throws Exception {
        String email = "test@example.com";
        UserInfo userInfo = new UserInfo();
        userInfo.setFirstName("John");
        userInfo.setLastName("Doe");

        when(userService.getUserLocationInfo(email)).thenReturn(userInfo);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/test/getUserInfo/{email}", email))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value(userInfo.getFirstName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName").value(userInfo.getLastName()));
    }

    @Test
    void testHelpToPost() {
        // Prepare test data
        String email = "test@example.com";
        int postId = 123;

        HelpToPost helpToPost = new HelpToPost();
        helpToPost.setEmail(email);
        helpToPost.setPostId(postId);

        User user = new User();
        user.setEmail(email);
        List<Integer> helpToPostList = new ArrayList<>();
        user.setHelpToPostlist(helpToPostList);

        when(userRepository.findByEmail(email)).thenReturn(user);
        when(userRepository.save(any(User.class))).thenReturn(user);

        // Call the method
        muc.helpToPost(helpToPost);

        // Verify
        assertTrue(user.getHelpToPostlist().contains(postId));
    }
    @Test
    public void testGetUserByEmailController() {
        String email = "test@example.com";
        User mockUser = new User();
        mockUser.setEmail(email);
        mockUser.setFirstName("John");
        mockUser.setLastName("Doe");


        when(userRepository.findByEmail(email)).thenReturn(mockUser);

        User result = muc.getUserByEmail(email);

        assertEquals(email, result.getEmail());

    }
    @Test
    public void testSaveUser() {
        RegisterUserDto userDto = new RegisterUserDto();
        userDto.setEmail("test@example.com");
        userDto.setPassword("Password123");
        userDto.setFirstName("John");
        userDto.setLastName("Doe");

        when(userRepository.findByEmail(userDto.getEmail())).thenReturn(null);
        when(userRepository.count()).thenReturn(0L);

        String result = muc.saveUser(userDto);

        assertEquals("User successfully saved.", result);
    }
    @Test
    public void testLoginController() {
        LoginUserDto loginUserDto = new LoginUserDto();
        loginUserDto.setEmail("test@example.com");
        loginUserDto.setPassword("Password123");
        loginUserDto.setLatitude(12.345);
        loginUserDto.setLongitude(45.678);

        User mockUser = new User();
        mockUser.setEmail(loginUserDto.getEmail());
        mockUser.setPassword(loginUserDto.getPassword());
        mockUser.setFirstName("John");
        mockUser.setLastName("Doe");

        when(userRepository.findByEmailAndPassword(loginUserDto.getEmail(), loginUserDto.getPassword())).thenReturn(mockUser);

        UserDto userDto = muc.login(loginUserDto);

        assertEquals(loginUserDto.getEmail(), userDto.getEmail());
        assertEquals(mockUser.getFirstName(), userDto.getFirstName());
        assertEquals(mockUser.getLastName(), userDto.getLastName());
    }
    @Test
    void testIsUserExist_True() {
        // Prepare test data
        String email = "test@example.com";
        User existingUser = new User();
        existingUser.setEmail(email);

        when(userRepository.findByEmail(email)).thenReturn(existingUser);

        // Call the method
        boolean result = muc.isUserExist(email);

        // Verify
        assertTrue(result);
    }

    @Test
    public void testGetUserLocationInfo() {
        String email = "test@example.com";
        User mockUser = new User();
        mockUser.setEmail(email);
        mockUser.setFirstName("John");
        mockUser.setLastName("Doe");
        userRepository.save(mockUser);
        when(userRepository.findByEmail(email)).thenReturn(mockUser);

        UserInfo userInfo = muc.getUserLocationInfo(email);

        assertEquals("John", userInfo.getFirstName());
        assertEquals("Doe", userInfo.getLastName());
    }
    @Test
    public void testHelpToPostController() {
        HelpToPost helpToPost = new HelpToPost();
        helpToPost.setEmail("test@example.com");
        helpToPost.setPostId(1);

        User mockUser = new User();
        mockUser.setEmail(helpToPost.getEmail());
        mockUser.setHelpToPostlist(new ArrayList<>());
        userRepository.save(mockUser);
        when(userRepository.findByEmail(helpToPost.getEmail())).thenReturn(mockUser);
        when(userRepository.save(mockUser)).thenReturn(mockUser);

         muc.helpToPost(helpToPost);

        assertTrue(mockUser.getHelpToPostlist().contains(helpToPost.getPostId()));
    }
}
