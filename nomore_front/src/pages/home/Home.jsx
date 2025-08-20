/** @jsxImportSource @emotion/react */
import React from 'react';
import * as s from './styles';
import useCategoryQuery from '../../queries/useCategoryQuery';
import HomeMoims from '../../components/HomeMoims/HomeMoims';

function Home(props) {
    const categoryQuery = useCategoryQuery();
    const categoryList = categoryQuery?.data?.data;
    const isLoading = categoryQuery.isLoading;
    const error = categoryQuery.error;

    if (isLoading) {
        return (
            <div css={s.containerStyle}>
                <div css={s.contentWrapperStyle}>
                    <div css={s.loadingStyle}>
                        <div></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div css={s.containerStyle}>
                <div css={s.contentWrapperStyle}>
                    <div css={s.emptyStateStyle}>
                        <h3>오류가 발생했습니다</h3>
                        <p>잠시 후 다시 시도해주세요.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div css={s.containerStyle}>
            <div css={s.contentWrapperStyle}>
                {categoryList.map((category) => (
                    <HomeMoims 
                        key={category.categoryId} 
                        category={category} 
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;