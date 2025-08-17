/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { reqMoimMembers } from "../api/moimApi";
import { baseURL } from "../api/axios";
import * as s from "./styles";

function MoimMemberList({ moimId }) {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                setLoading(true);
                const response = await reqMoimMembers(moimId);
                setMembers(response?.data || []);
            } catch (error) {
                console.error("모임 멤버 조회 실패:", error);
                setError("멤버 목록을 불러오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        if (moimId) {
            fetchMembers();
        }
    }, [moimId]);

    const getRoleText = (role) => {
        switch (role) {
            case "OWNER":
                return "모임장";
            case "MEMBER":
            default:
                return "멤버";
        }
    };

    const getRoleEmoji = (role) => {
        switch (role) {
            case "OWNER":
                return "👑";
            case "MEMBER":
            default:
                return "👤";
        }
    };

    if (loading) {
        return (
            <div css={s.memberSection}>
                <h3 css={s.sectionTitle}>모임 멤버</h3>
                <div css={s.loadingText}>멤버 목록을 불러오는 중...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div css={s.memberSection}>
                <h3 css={s.sectionTitle}>모임 멤버</h3>
                <div css={s.errorText}>{error}</div>
            </div>
        );
    }

    return (
        <div css={s.memberSection}>
            <h3 css={s.sectionTitle}>모임 멤버 ({members.length}명)</h3>
            <div css={s.memberGrid}>
                {members.map((member) => (
                    <div key={member.userId} css={s.memberCard}>
                        <div css={s.memberAvatar}>
                            {member.profileImgPath ? (
                                <img
                                    src={`${baseURL}/image${member.profileImgPath}`}
                                    alt={member.nickName}
                                    css={s.profileImage}
                                />
                            ) : (
                                <div css={s.defaultAvatar}>{getRoleEmoji(member.role)}</div>
                            )}
                        </div>
                        <div css={s.memberInfo}>
                            <div css={s.memberName}>{member.nickName}</div>
                            <div css={s.memberRole}>{getRoleText(member.role)}</div>
                            {member.introduction && <div css={s.memberIntro}>{member.introduction}</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MoimMemberList;
