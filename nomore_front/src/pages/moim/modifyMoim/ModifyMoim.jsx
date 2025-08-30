/** @jsxImportSource @emotion/react */
import * as s from './styles';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { reqModifyMoim, reqSelectMoim } from '../../../api/moimApi';
import useCategoryQuery from '../../../queries/useCategoryQuery';
import { reqDistrict } from '../../../api/searchApi';

function ModifyMoim(props) {
    const navigate = useNavigate();
    const [ searchParam ] = useSearchParams();
    const moimId = searchParam.get("moimId");
    const [ moim, setMoim ] = useState("");
    
    const [inputValue, setInputValue] = useState({
        title: "",
        discription: "",
        maxMember: "",
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

    const [ selectedmaxMember, setSelectedmaxMember ] = useState();
    const [ ismaxMemberOpen, setIsmaxMemberOpen ] = useState(false);
    const maxMemberOptions = Array.from({ length: 29 }, (_, index) => index + 2);

    console.log(moim)
    useEffect(() => {
        const fetchMoim = async () => {
            try {
                const response = await reqSelectMoim(moimId);
                const moimData = response.data;
                setMoim(moimData);
                setInputValue({
                    title: moimData.title || "",
                    discription: moimData.discription || "",
                    maxMember: moimData.maxMember || "",
                    districtId: moimData.districtId || "",
                    districtName: moimData.districtName || "",
                    categoryId: getCategory?.categoryId || "",
                    moimImgPath: moimData.moimImgPath || "",
                });

                setSelectedCategory(getCategory.categoryName);
                setSelectedDistrict(moimData.districtName);
                setSelectedmaxMember(moimData.maxMember);
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

    const handleTogglemaxMemberOnClick = () => {
        setIsmaxMemberOpen((prev) => !prev);
        if (ismaxMemberOpen) {
            setIsmaxMemberOpen(false);
        }
    }

    const handleCategoryOnChange = (e, category) => {
        setSelectedCategory(category.categoryName);
        setIsCategoryOpen(false);
        setInputValue(prev => ({
            ...prev,
            categoryId: category.categoryId,
        }));
    }    

    const handlemaxMemberOnChange = async (e, maxMember) => {
        setSelectedmaxMember(maxMember);
        setIsmaxMemberOpen(false);
        setInputValue(prev => ({
            ...prev,
            maxMember: maxMember,
        }));
    }

    const handleCreateMoimOnClick = async () => {
        const { title, maxMember, districtId, categoryId, discription, moimImgFile } = inputValue;

        const formData = new FormData();

            formData.append("title", title);
            formData.append("discription", discription);
            formData.append("maxMember", maxMember);  // NaN 방지
            formData.append("districtId", districtId);
            formData.append("categoryId", categoryId);

        if (moimImgFile) {
            formData.append("moimImgPath", moimImgFile);
        }

        try {
            await reqModifyMoim(formData, moimId);
            alert("모임 수정 성공!");
            navigate(`/moim/detail?moimId=${moimId}`);
        } catch (error) {
            console.error("모임 수정 실패:", error);
            alert("모임 수정 실패");
        }
    };

    console.log(categories)
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
                        <button css={s.dropdownButton} onClick={handleTogglemaxMemberOnClick}>
                            {selectedmaxMember
                                ? `최대 ${selectedmaxMember}명`
                                : '최대인원수 설정'
                            }
                        </button>
                        {ismaxMemberOpen && (
                            <div css={s.dropdownMenu}>
                                {maxMemberOptions.map((maxMember) => (
                                    <div key={maxMember} css={s.dropdownItem}>
                                        <label>
                                            <input
                                                type="radio"
                                                name='maxMember'
                                                value={inputValue.maxMember}
                                                checked={selectedmaxMember === maxMember}
                                                onChange={(e) => handlemaxMemberOnChange(e, maxMember)}
                                            />
                                            {maxMember}명
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
                <button css={s.button} onClick={handleCreateMoimOnClick}>모임 수정</button>
            </div>
    )};
}

export default ModifyMoim;