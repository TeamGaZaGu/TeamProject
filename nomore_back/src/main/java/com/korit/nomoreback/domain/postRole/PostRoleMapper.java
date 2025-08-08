package com.korit.nomoreback.domain.postRole;

import com.korit.nomoreback.dto.post.PostRoleDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostRoleMapper {

    int insertPostRole(PostRoleDto postRoleDto);

}
