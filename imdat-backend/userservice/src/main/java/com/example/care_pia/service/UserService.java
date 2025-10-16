package com.example.care_pia.service;

import com.example.care_pia.dto.*;
import com.example.care_pia.entity.User;
import com.example.care_pia.repository.UserRepository;
import com.example.care_pia.service.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class UserService {
    private final UserRepository userRepository;

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public String saveUser( RegisterUserDto registerUserDto) {
        if(userRepository.findByEmail(registerUserDto.getEmail()) !=null){
            return "Email already exists!";
        }
        isValidPassword(registerUserDto.getPassword());
        User user = UserMapper.INSTANCE.getUserFromRegisterUserDto(registerUserDto);
        user.setUserId(generateUserId());
        userRepository.save(user);
        return "User successfully saved.";

    }
    public UserDto login (LoginUserDto loginUserDto) {
        User user = userRepository.findByEmailAndPassword(loginUserDto.getEmail(), loginUserDto.getPassword());

        if(user!=null){
            user.setLatitude(loginUserDto.getLatitude());
            user.setLongitude(loginUserDto.getLongitude());
            userRepository.save(user);
            return UserMapper.INSTANCE.getUserDtoFromUser(user);
        }
        return new UserDto();
    }

    public boolean isUserExist(String email) {
        User user = userRepository.findByEmail(email);
        return user != null;
    }
    public UserInfo getUserLocationInfo(String email) {
        User user = userRepository.findByEmail(email);
        return UserMapper.INSTANCE.getUserInfoFromUser(user);
    }
    public void isValidPassword(String password){
        if (password.length() < 5) {
            throw new IllegalArgumentException("Şifre 5 karakterden az olmamalıdır!");
        }
        boolean hasUpperCase = false;
        boolean hasLowerCase = false;
        boolean hasDigit = false;
        for (char ch : password.toCharArray()) {
            if (Character.isUpperCase(ch)) {
                hasUpperCase = true;
            }
            if (Character.isLowerCase(ch)) {
                hasLowerCase = true;
            }
            if (Character.isDigit(ch)) {
                hasDigit = true;
            }
        }
        if (!hasUpperCase || !hasLowerCase || !hasDigit) {
            throw new IllegalArgumentException("Şifre en az bir büyük harf bir küçük harf ve bir sayı içermelidir!");
        }
    }

    public void helpToPost(HelpToPost helpToPost) {
        User user = getUserByEmail(helpToPost.getEmail());
        List<Integer> userHelpList=user.getHelpToPostlist();
        userHelpList.add(helpToPost.getPostId());
        user.setHelpToPostlist(userHelpList);
        userRepository.save(user);
    }
    public int generateUserId(){
        int count= (int) userRepository.count();
        if(count>0){
            return count+1;
        }else{
            return 1;
        }

    }

    public void removeHelpToPost(HelpToPost helpToPost) {
        User user = getUserByEmail(helpToPost.getEmail());
        List<Integer> userHelpList = user.getHelpToPostlist();

        for (int i = 0; i < userHelpList.size(); i++) {
            if (userHelpList.get(i).equals(helpToPost.getPostId())) {
                userHelpList.remove(i);
            }
        }

        user.setHelpToPostlist(userHelpList);
        userRepository.save(user);
    }
}
