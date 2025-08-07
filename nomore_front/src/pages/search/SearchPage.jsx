import React from 'react';
import useSearchQuery from '../../queries/useSearchQuery';

function SearchPage(props) {
    const searchQuery = useSearchQuery();
    const searchMoim = searchQuery.data || []
    console.log(searchMoim)

     return (
        <div style={{ padding: 24 }}>
            <h2>검색 결과</h2>
            {searchMoim.length === 0 ? (
                <div>검색 결과가 없습니다.</div>
            ) : (
                <ul>
                    {searchMoim.map((moim) => (
                        <li key={moim.moimId}>
                            <h3>{moim.moimTitle}</h3>
                            <p>{moim.moimDiscription}</p>
                            <p>지역: {moim.districtName} / 카테고리: {moim.categoryName}</p>
                            <p>모집 인원: {moim.moimMemberCount}/{moim.moimMaxMember}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchPage;