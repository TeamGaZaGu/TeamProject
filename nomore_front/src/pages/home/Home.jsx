import React, { useEffect } from 'react';
import useCategoryQuery from '../../queries/useCategoryQuery';
import usePrincipalQuery from '../../queries/usePrincipalQuery';
import Loading from '../../Loading/Loading';
import useMoimQuery from '../../queries/useMoimQuery';

function Home(props) {

    const categoryQuery = useCategoryQuery();
    const categoryList = categoryQuery?.data?.data;
    console.log(categoryList)
    const moimQuery = useMoimQuery();
    console.log(moimQuery);

    return (
        <div>
            {
                categoryList?.map((category) => (
                    <div key={category.categoryId}>
                        <div>{category.categoryEmoji} {category.categoryName}</div>

                    </div>
                ))
            }
        </div>
    );
}

export default Home;