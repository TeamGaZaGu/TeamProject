    package com.korit.nomoreback.domain.forum;

    import com.korit.nomoreback.domain.moim.Moim;
    import org.apache.ibatis.annotations.Mapper;
    import org.apache.ibatis.annotations.Param;

    import java.util.List;

    @Mapper
    public interface ForumMapper {
        int registerForum(Forum forum);
        Forum findByForumIdAndUserId(@Param("forumId")Integer forumId, @Param("userId")Integer userId );
        Forum findByForumId(@Param("forumId") Integer forumId);
        int modifyForum(Forum forum);
        int deleteForum(@Param("forumId") Integer forumId);

        List<Forum> findByCategoryId(
                @Param("moimId") Integer moimId,
                @Param("categoryId") Integer categoryId,
                @Param("userId") Integer userId
        );
        List<ForumImg> findImgsByForumId(@Param("forumId") Integer forumId);

        List<ForumCategory> getFourumCategories();

        // 게시글 조회
        Integer getCountOfOptions(ForumsSearchOption option);
        List<Forum> findAllOfOptions(ForumsSearchOption option);

        List<Forum> findPostsByUserId(@Param("userId") Integer userId);
        void deleteByUserId(Integer userId);
    }