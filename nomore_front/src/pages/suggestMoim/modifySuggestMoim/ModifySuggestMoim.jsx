/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { reqModifyMoim, reqSelectMoim } from '../../../api/moimApi';
import useCategoryQuery from '../../../queries/useCategoryQuery';
import { reqDistrict } from '../../../api/searchApi';

function ModifySuggestMoim(props) {
    const navigate = useNavigate();
    const [ searchParam ] = useSearchParams();
    const moimId = searchParam.get("moimId");
    const [ moim, setMoim ] = useState("");
    
    const [inputValue, setInputValue] = useState({
        title: "",
        discription: "",
        maxMembers: "",
        districtId: "",
        districtName: "",
        categoryId: "",
        moimImgPath: "",
        moimImgFile: null,
    });

    const categoryQuery = useCategoryQuery();
    const categories = categoryQuery?.data?.data || [];
    const getCategory = categories?.find(category => category.categoryId === moim?.categoryId)
    const categoryList = (categories || []).filter(category => category.categoryName !== '전체');

    console.log(moim)

    const fileRef = useRef();
    const [ previewImg, setPreviewImg ] = useState('');
    
    const [ selectedCategory, setSelectedCategory ] = useState();
    const [ isCategoryOpen, setIsCategoryOpen ] = useState(false);

    const [ districtList, setDistrictList ] = useState([]);
    const [ selectedDistrict, setSelectedDistrict ] = useState('');
    const [ isDistrictOpen, setIsDistrictOpen ] = useState(false);

    const [ selectedMaxMembers, setSelectedMaxMembers ] = useState();
    const [ isMaxMembersOpen, setIsMaxMembersOpen ] = useState(false);
    const maxMembersOptions = Array.from({ length: 29 }, (_, index) => index + 2);

    useEffect(() => {
        const fetchMoim = async () => {
            try {
                const response = await reqSelectMoim(moimId);
                const moimData = response.data;
                setMoim(moimData);
                setInputValue({
                    title: moimData.title || "",
                    discription: moimData.discription || "",
                    maxMembers: moimData.maxMember || "",
                    districtId: moimData.districtId || "",
                    districtName: moimData.districtName || "",
                    categoryId: getCategory?.categoryId || "",
                    moimImgPath: moimData.moimImgPath || "",
                });

                setSelectedCategory(getCategory.categoryName);
                setSelectedDistrict(moimData.districtName);
                setSelectedMaxMembers(moimData.maxMember);
                setPreviewImg(`${moimData.moimImgPath}`);
;
            } catch (err) {
                console.error(err);
            }
        };

        if (moimId) {
            fetchMoim();
        }
    }, [getCategory]);
    
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

        reader.onloadend = () => {
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
                const districts = (response.data || []).filter(res => res.districtName !== '전체');
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

    const handleCreateSuggestMoimOnClick = async () => {
    const { title, maxMember, districtId, categoryId, discription, moimImgFile } = inputValue;

    const formData = new FormData();

        formData.append("title", title);
        formData.append("discription", discription);
        formData.append("maxMember", maxMember ? Number(maxMember) : 0);  // NaN 방지
        formData.append("districtId", districtId ? Number(districtId) : 0);
        formData.append("categoryId", categoryId ? Number(categoryId) : 0);

    if (moimImgFile) {
        formData.append("moimImgPath", moimImgFile);
    }

    try {
        await reqModifyMoim(formData, moimId);
        alert("모임 수정 성공!");
        navigate(`/suggest/description?moimId=${moimId}`);
    } catch (error) {
        console.error("모임 수정 실패:", error);
        alert("모임 수정 실패");
    }
};


    if (categoryQuery.isFetched && categoryQuery.isSuccess) {
        return (
            <div css={s.layout}>
                <h1>모임 수정</h1>
                <div css={s.inputContainer}>
                    <div css={s.imgStyle}>
                        <div css={s.ImgBox} onClick={handleMoimImgEditOnClick}>
                            <input type="file" name='moimImgPath' onChange={handleFileOnChange} ref={fileRef} accept="image/*" style={{ display: 'none' }} />
                            <img src={previewImg} alt="" />
                        </div>
                    </div>
                    <div>
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
                            {selectedCategory}
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
                <button css={s.button} onClick={handleCreateSuggestMoimOnClick}>모임 수정</button>
            </div>
    )};
}

export default ModifySuggestMoim;