import React from 'react';
import useCategoryQuery from '../../queries/useCategoryQuery';

function Mypage(props) {

    const categoryQuery = useCategoryQuery();

    const categories = categoryQuery.data?.data || [];
 

    return (
        <div>
            <h1>마이페이지</h1>
            <div>
                <h3>프로필 이미지</h3>
                <img alt="미리보기" width="120" />
                <input
                    type="file"
                    accept="image/*"
                />
                <button>이미지 업로드</button>
            </div>
            <div>
                <input type="text" name='nickName'placeholder="닉네임" />
            </div>
            <div>
                <input type="text" name='introduction' placeholder='한줄 소개' />
            </div>
            <div>
                <div>관심 카테고리</div>
                {categories.map((category, index) => (
                <div key={index}>
                    <label>
                        <input
                            type="radio"
                            name="category"
                            value={category.categoryName}
                        />
                        <span>{category.categoryEmoji} {category.categoryName}</span>
                    </label>
                </div>
                ))}
                
            </div>
            <button>개인정보수정</button>
        </div>
    );  
}

export default Mypage;