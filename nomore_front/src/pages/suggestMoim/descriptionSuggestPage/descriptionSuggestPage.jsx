/** @jsxImportSource @emotion/react */
import * as s from './styles.js';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { reqJoinMoim, reqSelectMoim } from '../../../api/moimApi';
import useCategoryQuery from '../../../queries/useCategoryQuery.jsx';

function DescriptionSuggestPage(props) {
    const [ searchParam ] = useSearchParams();
    const moimId = searchParam.get("moimId")

    const [ moim, setMoim ] = useState("");
    const categoryQuery = useCategoryQuery();
    const categories = categoryQuery?.data?.data || []

    const getCategory = categories.find(category => category.categoryId === moim.categoryId)

    useEffect(() => {
        const fetchMoim = async () => {
            try {
                const response = await reqSelectMoim(moimId);
                setMoim(response.data);
            } catch (err) {
                setError("모임 정보를 불러오는 데 실패했습니다.");
                console.error(err);
            }
        };

        if (moimId) {
            fetchMoim();
        }
    }, []);

    const handleJoinMoimOnClick = () => {
        reqJoinMoim(moimId)
    }

    return (
        <div css={s.container}>
            <div css={s.header}>
                <button css={s.homeButton}>Home</button>
                    <button css={s.headerButton}>게시판</button>
                    <button css={s.headerButton}>💬</button>
            </div>

            <div css={s.mainContent}>
                <div css={s.moimInfo}>
                    <img src={`http://localhost:8080/image${moim.moimImgPath}`} alt="모임 썸네일" />
                    <div css={s.moimTextInfo}>
                    <h1 css={s.moimTitle}>{moim.title}</h1>
                    <div css={s.moimMeta}>
                        <span>{getCategory.categoryEmoji}{getCategory.categoryName}</span> · <span>{moim.districtId}</span> · <span>{moim.memberCount}/{moim.maxMember}</span>
                    </div>
                </div>
            </div>

                <div css={s.section}>
                    <h2 css={s.sectionTitle}>모임 소개</h2>
                    <div css={s.description}>
                        <p>{moim.discription}</p>
                    </div>
                </div>

                {/* 모임 멤버 섹션 */}
                <div css={s.section}>
                    <h2 css={s.sectionTitle}>모임 멤버</h2>
                    <div css={s.memberSection}>
                        <div css={s.memberCard}>
                            <div css={s.memberAvatar}>👑</div>
                            <div css={s.memberInfo}>
                                <span css={s.memberRole}>운영진</span>
                                <span css={s.memberName}>모임장</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 하단 가입 버튼 */}
            <div css={s.bottomActions}>
                <button css={s.joinButton} onClick={handleJoinMoimOnClick}>
                    모임 가입하기
                </button>
            </div>
        </div>
    );
}

export default DescriptionSuggestPage;