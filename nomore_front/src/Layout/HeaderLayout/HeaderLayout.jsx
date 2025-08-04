import React from 'react';

function HeaderLayout(props) {
    
    return (
        <div>
            <div>
                <h1>MEEU</h1>
                <h4>meet+you</h4>
            </div>
            <div>
                <button>지역설정</button>
                <input type="text" placeholder='원하는 모임을 검색해주세요'/>
            </div>
        </div>
    );
}

export default HeaderLayout;