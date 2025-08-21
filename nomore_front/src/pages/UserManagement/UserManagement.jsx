import React, { useEffect, useState } from 'react';
import { reqAllUser, reqBlockUser, reqUnBlockUser } from '../../api/userApi';
/** @jsxImportSource @emotion/react */
import * as s from './styles';

function UserManagement(props) {
    const [allUser, setAllUser] = useState([]);
    const [loading, setLoading] = useState(true);

    // 컴포넌트 마운트 시 사용자 목록 가져오기
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await reqAllUser();
            setAllUser(response?.data || []);
        } catch (error) {
            console.log('사용자 목록 조회 실패:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBlockUserOnClick = async (userId, nickName, userSiteBlock) => {
        const isBlocked = userSiteBlock === 1;
        const action = isBlocked ? '차단해제' : '차단';
        
        const isConfirmed = window.confirm(`"${nickName}" 님을 ${action}하시겠습니까?`);
        
        if (!isConfirmed) {
            return;
            
        }

        if (isBlocked) {
            try {
                await reqUnBlockUser(userId);
                setAllUser(prevUsers => 
                    prevUsers.map(user => 
                        user.userId === userId 
                            ? { ...user, userSiteBlock: 0 }
                            : user
                    )
                );
            } catch(error) {
                console.log('사용자 차단해제 실패', error);
            }
        } else {
            try {
                await reqBlockUser(userId);
                setAllUser(prevUsers => 
                    prevUsers.map(user => 
                        user.userId === userId 
                            ? { ...user, userSiteBlock: 1 }
                            : user
                    )
                );
            } catch(error) {
                console.log('사용자 차단 실패:', error);
            }
        }
    };

    if (loading) {
        return (
            <div css={s.container}>
                <h1 css={s.pageTitle}>사용자 관리</h1>
                <div css={s.loadingContainer}>로딩 중...</div>
            </div>
        );
    }
  
    return (
        <div css={s.container}>
            <h1 css={s.pageTitle}>사용자 관리</h1>
                         
            <div css={s.tableContainer}>
                <div css={s.tableWrapper}>
                    <table css={s.table}>
                        <thead css={s.tableHead}>
                            <tr>
                                <th css={s.tableHeader}>ID</th>
                                <th css={s.tableHeader}>닉네임</th>
                                <th css={s.tableHeader}>성명</th>
                                <th css={s.tableHeader}>이메일</th>
                                <th css={s.tableHeader}>프로필이미지</th>
                                <th css={s.tableHeader}>성별</th>
                                <th css={s.tableHeader}>생년월일</th>
                                <th css={s.tableHeader}>회원차단</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUser?.filter(user => user.userRole !== 'ROLE_ADMIN').map((user) => (
                                <tr key={user.userId} css={s.tableRow}>
                                    <td css={s.tableCell}>{user.userId}</td>
                                    <td css={s.tableCell}>{user.nickName}</td>
                                    <td css={s.tableCell}>{user.fullName}</td>
                                    <td css={s.tableCell}>{user.email}</td>
                                    <td css={s.tableCell}>
                                        {user.profileImgPath ? (
                                            <img
                                                 src={`${user.profileImgPath}`}
                                                 alt="프로필"
                                                 css={s.profileImage}
                                            />
                                        ) : (
                                            <span css={s.noImage}>이미지 없음</span>
                                        )}
                                    </td>
                                    <td css={s.tableCell}>{user.gender}</td>
                                    <td css={s.tableCell}>{user.birthDate}</td>
                                    <td css={s.tableCell}>
                                        {user.userSiteBlock === 1 ? (
                                            <button 
                                                css={s.unblockButton} 
                                                onClick={() => handleBlockUserOnClick(user.userId, user.nickName, user.userSiteBlock)}
                                            >
                                                차단해제
                                            </button>
                                        ) : (
                                            <button 
                                                css={s.blockButton} 
                                                onClick={() => handleBlockUserOnClick(user.userId, user.nickName, user.userSiteBlock)}
                                            >
                                                차단
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserManagement;