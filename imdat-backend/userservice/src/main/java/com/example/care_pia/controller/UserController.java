package com.example.care_pia.controller;

import com.example.care_pia.dto.*;
import com.example.care_pia.entity.User;
import com.example.care_pia.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/test")
@RequiredArgsConstructor
@Validated
public class UserController {
    private final UserService userService;

    @GetMapping("/user/{email}")
    public User getUser(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

   @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterUserDto user) {
        return userService.saveUser(user);

   }

   @PostMapping("login")
   public UserDto login(@RequestBody LoginUserDto loginUserDto){
        return userService.login(loginUserDto);
   }

   @GetMapping("/is_user_exist/{email}")
   public boolean isUserExist(@PathVariable String email) {
        return userService.isUserExist(email);
   }

   @GetMapping("/getUserInfo/{email}")
   public UserInfo getUserInfo(@PathVariable String email){
        return userService.getUserLocationInfo(email);
   }
   @PutMapping("/helpToPost")
   public void helpToPost(@RequestBody HelpToPost helpToPost){
        userService.helpToPost(helpToPost);
   }
    @PutMapping("/removeHelpToPost")
    public void removeHelpToPost(@RequestBody HelpToPost helpToPost){
        userService.removeHelpToPost(helpToPost);

    }
}
