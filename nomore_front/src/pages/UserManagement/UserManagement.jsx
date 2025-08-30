// UserManagement.jsx 완전한 코드
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reqAllUser, reqBlockUser, reqUnBlockUser } from '../../api/userApi';
/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { baseURL } from '../../api/axios';

function UserManagement(props) {
    const navigate = useNavigate();
    const [allUser, setAllUser] = useState([]);
    const [loading, setLoading] = useState(true);

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

    console.log(allUser)
    // 사용자 상세 페이지로 이동
    const handleUserDetailOnClick = (userId) => {
        const choiceUser = allUser.find(user =>  user.userId === Number(userId));
        console.log(choiceUser)
        navigate(`/admin/user/${userId}`, { state: { user: choiceUser } });
    };

    const handleBlockUserOnClick = async (userId, nickName, siteBlock) => {
        const isBlocked = siteBlock === 1;
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
                            ? { ...user, siteBlock: 0 }
                            : user
                    )
                );
                alert('차단이 해제되었습니다.');
            } catch (error) {
                console.log('사용자 차단해제 실패', error);
                alert('차단 해제에 실패했습니다.');
            }
        } else {
            try {
                await reqBlockUser(userId);
                setAllUser(prevUsers =>
                    prevUsers.map(user =>
                        user.userId === userId
                            ? { ...user, siteBlock: 1 }
                            : user
                    )
                );
                alert('사용자가 차단되었습니다.');
            } catch (error) {
                console.log('사용자 차단 실패:', error);
                alert('차단에 실패했습니다.');
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
                                <th css={s.tableHeader}>성별</th>
                                <th css={s.tableHeader}>생년월일</th>
                                <th css={s.tableHeader}>회원상태</th>
                                <th css={s.tableHeader}>사이트차단</th>
                                <th css={s.tableHeader}>상세보기</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUser?.filter(user => user.userRole !== 'ROLE_ADMIN').map((user) => (
                                <tr key={user.userId} css={s.tableRow}>
                                    <td css={s.tableCell}>{user.userId}</td>
                                    <td css={s.tableCell}>{user.nickName}</td>
                                    <td css={s.tableCell}>{user.fullName}</td>
                                    <td css={s.tableCell}>{user.email}</td>
                                    <td css={s.tableCell}>{user.gender || '-'}</td>
                                    <td css={s.tableCell}>
                                        {user.birthDate ? new Date(user.birthDate).toLocaleDateString() : '-'}
                                    </td>
                                    <td css={s.tableCell}>
                                        {user.userRole === 'ROLE_BEN' ? '사용자차단' : '정상'}
                                    </td>
                                    <td css={s.tableCell}>
                                        <button
                                            css={user.siteBlock === 1 ? s.unblockButton : s.blockButton}
                                            onClick={() => handleBlockUserOnClick(user.userId, user.nickName, user.siteBlock)}
                                        >
                                            {user.siteBlock === 1 ? '차단해제' : '차단'}
                                        </button>
                                    </td>
                                    <td css={s.tableCell}>
                                        <button
                                            css={s.detailButton}
                                            onClick={() => handleUserDetailOnClick(user.userId)}
                                        >
                                            상세보기
                                        </button>
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