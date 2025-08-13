/** @jsxImportSource @emotion/react */
import * as s from './styles.js';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { reqDeleteMoim, reqJoinMoim, reqSelectMoim } from '../../../api/moimApi';
import useCategoryQuery from '../../../queries/useCategoryQuery.jsx';
import { IoChatbubbleEllipses, IoChatbubbleEllipsesOutline, IoClipboard, IoClipboardOutline } from 'react-icons/io5';
import { RiHome7Fill, RiHome7Line } from 'react-icons/ri';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

function DescriptionSuggestPage(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [ searchParam ] = useSearchParams();
    const moimId = searchParam.get("moimId")

    const [activeTab, setActiveTab] = useState("home");

    const [ moim, setMoim ] = useState("");
    
    const categoryQuery = useCategoryQuery();
    const categories = categoryQuery?.data?.data || [];
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

    const handleModifyOnClick = () => {
        navigate(`/suggest/modify?moimId=${moimId}`)
    }

    const handleDeleteOnClick = async () => {
        await reqDeleteMoim(moimId)
        queryClient.invalidateQueries(["moimpage"])
        alert("모임 삭제 성공")
        await navigate("/")
    }
    

    return (
        <div css={s.container}>
            <div css={s.header}>
                <div>
                    <button 
                        css={activeTab === "home" ? s.click : s.unClick}
                        onClick={() => setActiveTab("home")}
                    >
                        {
                            activeTab === "home" ?
                            <RiHome7Fill />
                            :
                            <RiHome7Line />
                        }
                        Home
                    </button>
                    <button
                        css={activeTab === "board" ? s.click : s.unClick}
                        onClick={() => setActiveTab("board")}
                    >
                        {
                            activeTab === "board" ?
                            <IoClipboard />
                            :
                            <IoClipboardOutline />
                        }
                        게시판
                    </button>
                    <button
                        css={activeTab === "chat" ? s.click : s.unClick}
                        onClick={() => setActiveTab("chat")}
                    >
                        {
                            activeTab === "chat" ?
                            <IoChatbubbleEllipses />
                            :
                            <IoChatbubbleEllipsesOutline />
                        }
                        채팅
                    </button>
                </div>
                <div>
                    <button css={s.Transaction} onClick={handleModifyOnClick}><FaPen />수정</button>
                    <button css={s.Transaction} onClick={handleDeleteOnClick}><FaTrashAlt />삭제</button>
                </div>
            </div>
            
            {activeTab === "home" && (
                <div css={s.mainContent}>
                    <div css={s.moimInfo}>
                        <img src={`http://localhost:8080/image${moim.moimImgPath}`} alt="모임 썸네일" />
                        <div css={s.moimTextInfo}>
                        <h1 css={s.moimTitle}>{moim.title}</h1>
                        <div css={s.moimMeta}>
                            <span>{getCategory?.categoryEmoji}{getCategory?.categoryName}</span> · <span>{moim.districtName}</span> · <span>{moim.memberCount}/{moim.maxMember}</span>
                        </div>
                    </div>
                </div>

                    <div css={s.section}>
                        <h2 css={s.sectionTitle}>모임 소개</h2>
                        <div css={s.description}>
                            <p>{moim.discription}</p>
                        </div>
                    </div>

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
            )}
            {activeTab === "board" && (
                <div>
                    <button onClick={() => navigate(`/forum/create?moimId=${moimId}`)}>게시글 작성</button>
                </div>
            )}
            {activeTab === "chat" && (
                <div>

                </div>
            )}

            <div css={s.bottomActions}>
                <button css={s.joinButton} onClick={handleJoinMoimOnClick}>
                    모임 가입하기
                </button>
            </div>
        </div>
    );
}

export default DescriptionSuggestPage;