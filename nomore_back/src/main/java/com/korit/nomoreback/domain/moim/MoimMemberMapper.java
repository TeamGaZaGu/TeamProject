package com.korit.nomoreback.domain.moim;

import com.korit.nomoreback.dto.moim.MoimMemberUserDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MoimMemberMapper {

    List<MoimMemberUserDto> findVisibleMembers(@Param("moimId") int moimId,
                                               @Param("viewerId") int viewerId);

    int updateStatus(@Param("moimId") Integer moimId,
                     @Param("userId") Integer userId,
                     @Param("status") String status);

    String findStatus(@Param("moimId") Integer moimId, @Param("userId") Integer userId);
}
