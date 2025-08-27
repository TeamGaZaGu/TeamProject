/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { reqDistrict } from '../../../api/searchApi';
import { reqCreateMoim } from '../../../api/moimApi';
import useCategoryQuery from '../../../queries/useCategoryQuery';
import usePrincipalQuery from '../../../queries/usePrincipalQuery';
import * as s from './styles';
import React, { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

function CreateMoim(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const principalQuery = usePrincipalQuery();
    const userId = principalQuery.data.data.user.userId
    const [ inputValue, setInputValue ] = useState({
        title: "",
        discription: "",
        maxMembers: "",
        districtId: "",
        categoryId: "",
        moimImgPath: "",
    })

    const categories = useCategoryQuery();
    const categoryList = (categories.data?.data || []).filter(category => category.categoryName !== '전체');

    const fileRef = useRef();
    const [previewImg, setPreviewImg] = useState('');

    const [ selectedCategory, setSelectedCategory ] = useState();
    const [ isCategoryOpen, setIsCategoryOpen ] = useState(false);

    const [ districtList, setDistrictList ] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [isDistrictOpen, setIsDistrictOpen] = useState(false);

    const [ selectedMaxMembers, setSelectedMaxMembers ] = useState();
    const [ isMaxMembersOpen, setIsMaxMembersOpen ] = useState(false);
    const maxMembersOptions = Array.from({ length: 29 }, (_, index) => index + 2);

    const handleMoimImgEditOnClick = (e) => {
        fileRef.current.click();
    }

    const handleFileOnChange = (e) => {
        const { files } = e.target;
        if (!files.length) {
            return;
        }
        const file = files[0];
        const reader = new FileReader();
        console.log("reader",reader)

        reader.onload = () => {  
            setPreviewImg(reader.result); 
        };
        reader.readAsDataURL(file);
        setInputValue(prev => ({
            ...prev,
            moimImgFile: file,
        }));
    };

    const handleToggleDistrictOnClick = async () => {
        setIsDistrictOpen((prev) => !prev);
        if (isCategoryOpen) {
            setIsCategoryOpen(false);
        }

        if (districtList.length === 0) {
            try {
                const response = await reqDistrict();
                const districts = (response?.data || []).filter(district => district.districtName !== '전체');
                setDistrictList(districts);
            } catch (error) {
                console.log(error);
            }
        }
    };
        
    const handleDistrictOnChange = (e) => {
        setSelectedDistrict(e.target.value);
        const findDistrict = districtList.find(prev => prev.districtName === e.target.value)
        setInputValue(prev => ({
            ...prev,
            districtId: findDistrict.districtId
        }))
        setIsDistrictOpen(false);
    }

    const handleOnChange = (e) => {
        setInputValue(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const handleToggleCategoryOnClik = () => {
        setIsCategoryOpen((prev) => !prev);
        if (isCategoryOpen) {
            setIsCategoryOpen(false);
        }
    }

    const handleToggleMaxMembersOnClick = () => {
        setIsMaxMembersOpen((prev) => !prev);
        if (isMaxMembersOpen) {
            setIsMaxMembersOpen(false);
        }
    }

    const handleCategoryOnChange = (e, category) => {
        setSelectedCategory(category.categoryId);
        setIsCategoryOpen(false);
        setInputValue(prev => ({
            ...prev,
            categoryId: category.categoryId,
        }));
    }    

    const handleMaxMembersOnChange = async (e, maxMembers) => {
        setSelectedMaxMembers(maxMembers);
        setIsMaxMembersOpen(false);
        setInputValue(prev => ({
            ...prev,
            maxMembers: maxMembers,
        }));
    }

    const handleCreateMoimOnClick = async () => {
        const { title, maxMembers, districtId, categoryId } = inputValue;

        if (!title || !maxMembers || !districtId || !categoryId) {
            alert("필수 항목을 모두 입력해주세요.");
            return;
        }

        const formData = new FormData();
        
        formData.append("title", title);
        formData.append("userId", userId);
        formData.append("discription", inputValue.discription);
        formData.append("maxMember", Number(maxMembers));
        formData.append("districtId", Number(districtId));
        formData.append("categoryId", Number(categoryId));

        if (inputValue.moimImgFile) {
            formData.append("moimImg", inputValue.moimImgFile);
        }

        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            await reqCreateMoim(formData);
            alert("모임 생성 성공!")
            queryClient.invalidateQueries(["moimpage"])
            navigate("/")
        } catch (error) {
            alert("모임 생성 실패")
            throw (error)
        }
    };

    return (
        <div css={s.layout}>
            <h1>모임 생성</h1>
            <div css={s.inputContainer}>
                <div css={s.imgStyle}>
                    <div css={s.ImgBox} onClick={handleMoimImgEditOnClick}>
                        <input type="file" name='moimImgPath' onChange={handleFileOnChange} ref={fileRef} accept="image/*" style={{ display: 'none' }} />
                        <img src={previewImg} alt="" />
                    </div>
                </div>
                <div css={s.title}>
                    <input type="text" name='title' value={inputValue.title} onChange={handleOnChange} placeholder="모임 제목" css={s.titleInput} />
                </div>
                <div>
                    <textarea
                        css={s.contentTextarea}
                        name="discription"
                        value={inputValue.discription}
                        onChange={handleOnChange}
                        placeholder="모임 소개"
                        required
                    />
                </div>
                
                <div css={s.dropdownContainer}>
                    <button css={s.dropdownButton} onClick={handleToggleMaxMembersOnClick}>
                        {selectedMaxMembers
                            ? `최대 ${selectedMaxMembers}명`
                            : '최대인원수 설정'
                        }
                    </button>
                    {isMaxMembersOpen && (
                        <div css={s.dropdownMenu}>
                            {maxMembersOptions.map((maxMembers) => (
                                <div key={maxMembers} css={s.dropdownItem}>
                                    <label>
                                        <input
                                            type="radio"
                                            name='maxMembers'
                                            value={inputValue.maxMembers}
                                            checked={selectedMaxMembers === maxMembers}
                                            onChange={(e) => handleMaxMembersOnChange(e, maxMembers)}
                                        />
                                        {maxMembers}명
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                        <button css={s.dropdownButton} onClick={handleToggleDistrictOnClick}>
                            {selectedDistrict || '지역설정'}
                        </button>
                        {isDistrictOpen && (
                            <div css={s.dropdownMenu}>
                                {districtList.map((district, index) => (
                                    <div key={index} css={s.dropdownItem}>
                                        <label>
                                            <input
                                                type='radio'
                                                name='districtId'
                                                value={district.districtName}
                                                checked={selectedDistrict === district.districtName}
                                                onChange={handleDistrictOnChange}
                                            />
                                            {district.districtName}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                </div>
            
                <div css={s.dropdownContainer}>
                    <button css={s.dropdownButton} onClick={handleToggleCategoryOnClik}>
                        {selectedCategory
                            ? categoryList.find(category => category.categoryId === selectedCategory)?.categoryName
                            : '카테고리설정'
                        }
                    </button>
                    {isCategoryOpen && (
                        <div css={s.dropdownMenu}>
                            {categoryList.map((category) => (
                                <div key={category.categoryId} css={s.dropdownItem}>
                                    <label>
                                        <input
                                            type="radio"
                                            name='categoryId'
                                            value={category.categoryName}
                                            checked={selectedCategory === category.categoryId}
                                            onChange={(e) => handleCategoryOnChange(e, category)}
                                        />
                                        {category.categoryName}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <button css={s.button} onClick={handleCreateMoimOnClick}>모임 만들기</button>
        </div>
    );
}

export default CreateMoim;