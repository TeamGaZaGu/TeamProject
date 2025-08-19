package com.korit.nomoreback.domain.role;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface RoleMapper {
    Role findByRoleName(@Param("roleName") String roleName);
}
