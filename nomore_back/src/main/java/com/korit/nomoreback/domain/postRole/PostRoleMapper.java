package com.korit.nomoreback.domain.postRole;

import com.korit.nomoreback.dto.forum.ForumRoleDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostRoleMapper {

    int insertPostRole(ForumRoleDto postRoleDto);

}
