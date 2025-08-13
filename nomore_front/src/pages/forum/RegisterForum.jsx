/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React, { useState, useRef } from 'react';
import { Upload, X, Send } from 'lucide-react';
import { BsSendArrowUpFill } from 'react-icons/bs';
import { reqRegisterForum } from '../../api/forumApi';
import { useNavigate, useSearchParams } from 'react-router-dom';

function RegisterForum(props) {
    const navigate = useNavigate();
    const [ searchParam ] = useSearchParams();
    const moimId = searchParam.get("moimId");

    const [formData, setFormData] = useState({
        forumTitle: '',
        forumContent: '',
        forumCategoryId: '',
        moimId: moimId,
    });
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
        if (images.length >= 10) {
            alert('이미지는 최대 10개까지만 등록할 수 있습니다.');
            return;
        }
        
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
            setImages(prev => {
                if (prev.length >= 10) return prev;
                return [...prev, {
                file: file,
                preview: event.target.result,
                id: Date.now() + Math.random()
                }];
            });
            };
            reader.readAsDataURL(file);
        }
        });
        
        // 파일 input 초기화
        e.target.value = '';
    };

    const removeImage = (imageId) => {
        setImages(prev => prev.filter(img => img.id !== imageId));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.forumTitle.trim()) {
        alert('제목을 입력해주세요.');
        return;
        }
        
        if (!formData.forumContent.trim()) {
        alert('내용을 입력해주세요.');
        return;
        }
        
        if (!formData.forumCategoryId) {
        alert('카테고리를 선택해주세요.');
        return;
        }

        // FormData 생성 (실제 서버 전송용)
        const submitData = new FormData();
        submitData.append('forumTitle', formData.forumTitle);
        submitData.append('forumContent', formData.forumContent);
        submitData.append('forumCategoryId', formData.forumCategoryId);
        
        // 이미지 파일들 추가
        images.forEach((image, index) => {
        submitData.append('forumImgPath', image.file);
        });

        console.log('전송할 데이터:', {
        title: formData.forumTitle,
        content: formData.forumContent,
        categoryId: formData.forumCategoryId,
        imageCount: images.length
        });
        
        reqRegisterForum(submitData)
        alert('게시글이 등록되었습니다!');
        navigate("/")
    };

    return (
        <div css={s.layout}>
            <h1>게시글 작성</h1>
            <p>새로운 게시글을 작성해보세요.</p>
            
            {/* 카테고리 선택 */}
            <div css={s.category}>
                <p>카테고리</p>
                <span>*</span>
            </div>
            <select
                css={s.selectBox}
                name="forumCategoryId"
                value={formData.forumCategoryId}
                onChange={handleInputChange}
                required
            >
                <option value="">카테고리를 선택하세요</option>
                <option value="1">일반</option>
                <option value="2">공지사항</option>
                <option value="3">질문</option>
                <option value="4">자유게시판</option>
                <option value="5">정보공유</option>
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
                value={formData.forumTitle}
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
                value={formData.forumContent}
                onChange={handleInputChange}
                placeholder="게시글 내용을 입력하세요"
                required
            />

            {/* 이미지 업로드 */}
                <div css={s.imgbox}>
                    <div className="image-counter">
                    이미지 ({images.length}/10)
                    </div>
                    
                    <div className="image-container">
                    {/* 이미지 업로드 버튼 */}
                    <div>
                        <input
                        className="hidden-input"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        multiple
                        />
                        <button
                        className="upload-button"
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={images.length >= 10}
                        >
                        <Upload size={20} />
                        <span>이미지 추가</span>
                        </button>
                    </div>

                {/* 업로드된 이미지들 */}
                {images.map((image) => (
                    <div key={image.id} className="image-preview">
                    <img
                        src={image.preview}
                        alt="업로드된 이미지"
                    />
                    <button
                        type="button"
                        className="delete-button"
                        onClick={() => removeImage(image.id)}
                    >
                        <X size={12} />
                    </button>
                    </div>
                ))}
                </div>

                {images.length >= 10 && (
                <div className="error-message">
                    이미지는 최대 10개까지만 등록할 수 있습니다.
                </div>
                )}
            </div>

            {/* 제출 버튼 */}
                <div css={s.submitContainer}>
                    <button
                    css={s.submitButton}
                    type="button"
                    onClick={handleSubmit}
                    >
                    <BsSendArrowUpFill />
                    게시글 등록
                    </button>
                </div>
            </div>
        );
    }

export default RegisterForum;