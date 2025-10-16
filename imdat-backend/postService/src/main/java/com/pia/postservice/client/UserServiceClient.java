package com.pia.postservice.client;

import com.pia.postservice.service.dto.HelpToPost;
import com.pia.postservice.service.dto.UserInfo;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "userService", url = "http://localhost:8082")
public interface UserServiceClient {

    @GetMapping("api/v1/test/is_user_exist/{email}")
    boolean isUserExist(@PathVariable String email);

    @GetMapping("api/v1/test/getUserInfo/{email}")
    UserInfo getUserInfo(@PathVariable String email);
    @PutMapping("api/v1/test/helpToPost")
    void helpToPost(@RequestBody HelpToPost helpToPost);
    @PutMapping("api/v1/test/removeHelpToPost")
    void removeHelpToPost(@RequestBody HelpToPost helpToPost);
}
