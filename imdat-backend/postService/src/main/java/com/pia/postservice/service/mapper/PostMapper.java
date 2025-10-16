package com.pia.postservice.service.mapper;

import com.pia.postservice.entity.Post;
import com.pia.postservice.service.dto.AddPostRequest;
import com.pia.postservice.service.dto.GetPostListResponse;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface PostMapper {
    PostMapper INSTANCE= Mappers.getMapper(PostMapper.class);
    Post postFromAddRequest(AddPostRequest addPostRequest);
    GetPostListResponse postFromGetListResponse(Post post);

}
