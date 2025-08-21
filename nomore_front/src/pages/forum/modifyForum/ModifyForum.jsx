/** @jsxImportSource @emotion/react */
import * as s from './styles.js';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { reqDetailForum, reqModifyForum } from '../../../api/forumApi';
import useForumCategoryQuery from '../../../queries/useForumCategoryQuery';
import { Upload, X } from 'lucide-react';
import { BsSendArrowUpFill } from 'react-icons/bs';
import { useQueryClient } from '@tanstack/react-query';

function ModifyForum(props) {
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const [ searchParam ] = useSearchParams();
    const forumId = searchParam.get("forumId");

    const [forum, setForum] = useState(null);

    const forumCategoryQuery = useForumCategoryQuery();
    const respForumCategories = forumCategoryQuery?.data?.data || [];

    const [ forumValue, setForumValue ] = useState({
        forumTitle: "",
        forumContent: "",
        forumImages: [],
        forumCategoryId: "",
    });

    useEffect(() => {
        if (forum) {
            setForumValue({
                forumTitle: forum.forumTitle || '',
                forumContent: forum.forumContent || '',
                forumImages: forum.forumImgList || [],
                forumCategoryId: forum.forumCategory?.forumCategoryId || '',
            });
        }
    }, [forum]);


    useEffect(() => {
        const fetchForum = async () => {
            try {
                const response = await reqDetailForum(forumId);
                setForum(response.data);
            } catch (error) {
                console.error("게시글 불러오기 실패:", error);
            }
        };

        if (forumId) {
            fetchForum();
        }
    }, [forumId]);

    const [images, setImages] = useState([]);

    const handleInputChange = (e) => {
        setForumValue(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleImgDeleteOnClick = (index) => {
        setImages(prev => prev.filter((file, i) => i !== index));
    }

    const handlePlusOnClick =  () => {
        const fileInput = document.createElement("input");
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("multiple", "true");
        fileInput.click();
        fileInput.onchange = async (e) => {
            if (images.length + e.target.files.length > 10) {
                    alert("이미지는 최대 10개까지만 등록할 수 있습니다.")
                return;
            }
            const filesArray = [...e.target.files];
            
            Promise.all(filesArray.map(file => {
                return new Promise(resolve => {
                    const fileReader = new FileReader();
                    fileReader.onload = (e) => {
                        resolve({file, dataUrl: e.target.result});
                    }
                    fileReader.readAsDataURL(file);
                });
            })).then(resolves => {
                setImages(prev => [...prev, ...resolves]);
            });
        }
    }

    const handleModifyOnClick = async () => {

        if (!forumValue.forumTitle.trim() || !forumValue.forumContent.trim() || !forumValue.forumCategoryId) {
            alert("모든 필수 항목을 입력해주세요.");
            return;
        }

        const formData = new FormData();

        formData.append("forumTitle", forumValue.forumTitle);
        formData.append("forumContent", forumValue.forumContent);
        formData.append("forumCategoryId", Number(forumValue.forumCategoryId));

        images.forEach((image, index) => {
            formData.append("forumImages", image.file);
        });
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            await reqModifyForum(forum?.moim?.moimId, forumId, formData)
            await navigate(`/forum/detail?forumId=${forumId}`);
            await queryClient.invalidateQueries({ queryKey: ['forums', forum?.moim?.moimId] });
        } catch (error) {
            console.error("게시글 등록 실패:", error);
            alert("게시글 등록에 실패했습니다.");
        }
    }
    
    return (
        <div css={s.layout}>
            <h1>게시글 수정</h1>
            <p>게시글을 수정하세요.</p>
            
            {/* 카테고리 선택 */}
            <div css={s.category}>
                <p>카테고리</p>
                <span>*</span>
            </div>
            <select
                css={s.selectBox}
                name="forumCategoryId"
                value={forumValue.forumCategoryId}
                onChange={handleInputChange}
                required
                >
                {respForumCategories.map(category => (
                    <option
                        key={category.forumCategoryId}
                        value={category.forumCategoryId}
                        >
                        {category.forumCategoryName}
                    </option>
                ))}
            </select>

            {/* 제목 */}
            <div css={s.title}>
                <p>제목</p>
                <span>*</span>
            </div>
            <input
                css={s.titleInput}
                type="text"
                name="forumTitle"
                value={forumValue.forumTitle}
                onChange={handleInputChange}
                placeholder="게시글 제목을 입력하세요"
                required
            />

            {/* 내용 */}
            <div css={s.content}>
                <p>내용</p>
                <span>*</span>
            </div>
            <textarea
                css={s.contentTextarea}
                name="forumContent"
                value={forumValue.forumContent}
                onChange={handleInputChange}
                placeholder="게시글 내용을 입력하세요"
                required
            />

            <div css={s.imgbox}>
                <div css={s.imgCounter}>
                    이미지 ({images.length}/10)
                </div>
                <div css={s.imgContainer}>
                    {
                        <div css={s.uploadButton} onClick={handlePlusOnClick}>
                            <Upload size={20} />
                            <span>이미지 추가</span>
                        </div>
                    }
                    {
                        forumValue.forumImages?.map((img, index) => (
                            <div key={`existing-${index}`}>
                                <div css={s.previewImg}>
                                    <img src={`${img.path}`} alt={`forum-img-${index}`} />
                                    <button
                                        type="button"
                                        onClick={() => handleImgDeleteOnClick(index)}
                                        >
                                        <X size={12} />
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                    {
                        images.map((img, index) => (
                            <div key={`new-${index}`}>
                                <div css={s.previewImg}>
                                    <img src={img.dataUrl} alt="" />
                                    <button
                                        type="button"
                                        onClick={() => handleImgDeleteOnClick(index)}
                                        >
                                        <X size={12} />
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    images.length >= 10 && (
                        <div css={s.errorMessage}>
                            이미지는 최대 10개까지만 등록할 수 있습니다.
                        </div>
                )}
            </div>
            <div css={s.submitContainer}>
                <button css={s.submitButton} onClick={handleModifyOnClick}><BsSendArrowUpFill />게시글 수정하기</button>
            </div>
        </div>
    );
}

export default ModifyForum;