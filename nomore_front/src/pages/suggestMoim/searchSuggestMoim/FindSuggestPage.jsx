/** @jsxImportSource @emotion/react */
import * as s from './styles.js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCategoryQuery from '../../../queries/useCategoryQuery';
import { reqfindSuggestMoim } from '../../../api/suggestApi';

function FindSuggestPage(props) {
    const navigate = useNavigate();
    const [moimList, setMoimList] = useState([]);
    const categoryQuery = useCategoryQuery();
    const categories = categoryQuery?.data?.data || []

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await reqfindSuggestMoim();
                const list = response?.data;
                setMoimList(list);
            } catch (error) {
                console.error('추천 모임 불러오기 실패:', error);
            }
        };
        fetchData();
    }, []);


    const handleCreateMoimOnClick = () => {
        navigate("/suggest/create")
    }

    return (
        <div>
            <div css={s.layout}>
                <h2>추천모임</h2>
                <button onClick={handleCreateMoimOnClick}>모임 만들기</button>
            </div>
           <div css={s.moimContainer}>
            {
                moimList.map((moim) => {
                const category = categories.find(cat => cat.categoryId === moim.categoryId);
                const categoryName = category.categoryName;
                const categoryEmoji = category.categoryEmoji

                return (
                    <div key={moim.moimId} css={s.moimCard}>
                    <img src={`http://localhost:8080/image${moim.moimImgPath}`} alt={moim.title} />
                    <h3>{moim.title}</h3>
                    <p>{moim.discription}</p>
                    <div>
                        <p>👥 {moim.memberCount}명</p>
                        <p>{categoryEmoji}{categoryName}</p>
                    </div>
                    </div>
                );
                })
            }
            </div>
        </div>
    );
}

export default FindSuggestPage;