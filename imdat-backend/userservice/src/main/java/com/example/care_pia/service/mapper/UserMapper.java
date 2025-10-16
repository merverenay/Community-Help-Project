package com.example.care_pia.service.mapper;

import com.example.care_pia.dto.RegisterUserDto;
import com.example.care_pia.dto.UserDto;
import com.example.care_pia.dto.UserInfo;
import com.example.care_pia.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE= Mappers.getMapper(UserMapper.class);

    UserDto getUserDtoFromUser(User user);
    UserInfo getUserInfoFromUser(User user);
    User getUserFromRegisterUserDto(RegisterUserDto registerUserDto);

}
