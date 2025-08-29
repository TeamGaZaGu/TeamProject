/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import * as s from './styles';
import { reqReport, submitReportComplete } from '../../api/reportApi';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ReportManagement() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("전체");
    const [selectedReason, setSelectedReason] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const response = await reqReport();
            setReports(Array.isArray(response?.data?.body) ? response.data.body : []);
        } catch (error) {
            console.error('신고 목록 조회 실패:', error);
            toast.error('신고 목록을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // 처리 버튼 클릭 함수
    const handleProcessReport = async (reportId) => {
        const confirmProcess = window.confirm("정말 이 신고를 처리완료 하시겠습니까?");
        if (!confirmProcess) return;

        try {
            await submitReportComplete(reportId);
            toast.success("신고가 처리되었습니다.");
            setReports(prev =>
                prev.map(r =>
                    r.reportId === reportId ? { ...r, status: 2 } : r
                )
            );
        } catch (error) {
            console.error("신고 처리 실패:", error);
            toast.error("신고 처리에 실패했습니다.");
        }
    };

    // 신고 대상 클릭 시 이동
    const handleNavigate = (report) => {
        console.log(report)
        if (report.targetType === 1) {
            navigate(`/admin/user/${report.targetId}`);
            return;
        } else if (report.targetType === 2) {
            // 모임
            navigate(`/moim/detail?moimId=${report.targetId}`);
        } else if (report.targetType === 3) {
            // 게시글 → forumId, moimId 필요
            if (report.moimId && report.targetId) {
                navigate(`/forum/detail?moimId=${report.moimId}&forumId=${report.targetId}`);
            } else {
                toast.error("게시글 상세 이동에 필요한 정보가 부족합니다.");
            }
        } else if (report.targetType === 4) {
            // 문의사항의 경우 사용자 상세 페이지로 이동
            navigate(`/admin/user/${report.targetId}`);
        }
    };

    // 사유 자르기 함수
    const truncateReason = (reason, maxLength = 30) => {
        if (!reason) return '';
        return reason.length > maxLength ? reason.substring(0, maxLength) + '...' : reason;
    };

    // 사유 상세보기 모달 열기
    const handleShowReason = (reason) => {
        setSelectedReason(reason);
        setIsModalOpen(true);
    };

    // 모달 닫기
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedReason(null);
    };

    // 타입별 이름 반환
    const getTypeDisplayName = (targetType) => {
        switch(targetType) {
            case 1: return '사용자';
            case 2: return '모임';
            case 3: return '게시글';
            case 4: return '문의';
            default: return '알수없음';
        }
    };

    if (loading) {
        return (
            <div css={s.container}>
                <h1 css={s.pageTitle}>신고 관리</h1>
                <div css={s.loadingContainer}>로딩 중...</div>
            </div>
        );
    }

    return (
        <div css={s.container}>
            <h1 css={s.pageTitle}>신고 관리</h1>

            {/* 필터 */}
            <div css={s.filterContainer}>
                {["전체", "사용자", "모임", "게시글", "문의"].map(option => (
                    <label key={option} css={s.filterLabel}>
                        <input
                            type="radio"
                            name="filter"
                            value={option}
                            checked={filter === option}
                            onChange={() => setFilter(option)}
                        />
                        {option}
                    </label>
                ))}
            </div>

            <div css={s.tableContainer}>
                <div css={s.tableWrapper}>
                    <table css={s.table}>
                        <thead css={s.tableHead}>
                            <tr>
                                <th css={s.tableHeader}>신고ID</th>
                                <th css={s.tableHeader}>신고자</th>
                                <th css={s.tableHeader}>신고 대상</th>
                                <th css={s.tableHeader}>타입</th>
                                <th css={s.tableHeader}>사유</th>
                                <th css={s.tableHeader}>신고일</th>
                                <th css={s.tableHeader}>상세보기</th>
                                <th css={s.tableHeader}>액션</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports
                                .filter(report => report.status === 1)
                                .filter(report => {
                                    if (filter === "전체") return true;
                                    if (filter === "사용자") return report.targetType === 1;
                                    if (filter === "모임") return report.targetType === 2;
                                    if (filter === "게시글") return report.targetType === 3;
                                    if (filter === "문의") return report.targetType === 4;
                                    return true;
                                })
                                .map((report) => (
                                    <tr key={report.reportId} css={s.tableRow}>
                                        <td css={s.tableCell}>{report.reportId}</td>
                                        <td css={s.tableCell}>{report.reporterNickName}</td>
                                        <td css={s.tableCell}>
                                            {report.targetId}
                                        </td>
                                        <td css={s.tableCell}>
                                            {getTypeDisplayName(report.targetType)}
                                        </td>
                                        <td css={s.tableCell}>
                                            <span 
                                                onClick={() => handleShowReason(report.reason)}
                                                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                title="클릭하여 전체 내용 보기"
                                            >
                                                {truncateReason(report.reason)}
                                            </span>
                                        </td>
                                        <td css={s.tableCell}>
                                            {new Date(report.createdAt).toLocaleString('ko-KR', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                            })}
                                        </td>
                                        <td>
                                            <button css={s.tableCell} onClick={() => handleNavigate(report)}>
                                                상세보기
                                            </button>
                                        </td>
                                        <td css={s.tableCell}>
                                            <button
                                                css={s.processButton}
                                                onClick={() => handleProcessReport(report.reportId)}
                                            >
                                                처리완료
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 사유 상세보기 모달 */}
            {isModalOpen && (
                <div css={s.modalOverlay} onClick={handleCloseModal}>
                    <div css={s.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div css={s.modalHeader}>
                            <h3>사유 상세보기</h3>
                            <button css={s.closeButton} onClick={handleCloseModal}>
                                ×
                            </button>
                        </div>
                        <div css={s.modalBody}>
                            <div css={s.reasonText}>
                                {selectedReason}
                            </div>
                        </div>
                        <div css={s.modalFooter}>
                            <button css={s.confirmButton} onClick={handleCloseModal}>
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Toaster />
        </div>
    );
}

export default ReportManagement;