package com.korit.nomoreback.domain.moim;

import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.dto.moim.MoimListRespDto;
import com.korit.nomoreback.dto.moim.MoimSearchReqDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MoimMapper {

    Integer getCountOfOptions(MoimsSearchOption option);
    List<Moim> findAllOfOptions(MoimsSearchOption option);

    Integer createMoim(Moim moim);
    Moim findMoimId(Integer moimId);
    int updateMoimCount(@Param("moimId") Integer moimId);
    int updateMoim(Moim moim);
    int deleteMoimById(@Param("moimId") Integer moimId);
    List<Moim> findMoimByCategoryId(@Param("categoryId") Integer categoryId);

    List<MoimListRespDto> searchMoim(MoimSearchReqDto searchReqDto);

    List<User> moimUserList(Integer moimId);


    List<Moim> myMoimList(Integer userId);

    List<Moim> findMoimsByUserId(@Param("userId") Integer userId);
}