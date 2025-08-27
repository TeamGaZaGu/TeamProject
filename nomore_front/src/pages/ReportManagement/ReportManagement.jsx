/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import * as s from './styles';
import { reqReport } from '../../api/reportApi';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ReportManagement() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleNavigate = (report) => {
        if (report.targetType === 1) {
            navigate(`/admin/user/${report.targetId}`);
        }
    }

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const response = await reqReport();
            // 배열인지 확인하고 아니면 빈 배열로
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
        // 여기서 요청은 너가 할 예정이니까 이름만 만들어둠
        console.log(`reportId ${reportId} 처리 요청`);
        // 예시: 처리 완료 후 상태 업데이트
        setReports(prev =>
            prev.map(r =>
                r.reportId === reportId ? { ...r, status: 2 } : r
            )
        );
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
                                <th css={s.tableHeader}>상태</th>
                                <th css={s.tableHeader}>액션</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.reportId} css={s.tableRow}>
                                    <td css={s.tableCell}>{report.reportId}</td>
                                    <td css={s.tableCell}>{report.reporterNickName}</td>
                                    <td css={s.tableCell}
                                        onClick={() => handleNavigate(report)}>
                                        {report.targetId}
                                    </td>
                                    <td css={s.tableCell}>
                                        {report.targetType === 1
                                            ? '사용자'
                                            : report.targetType === 2
                                            ? '모임'
                                            : report.targetType === 3
                                            ? '게시글'
                                            : '알수없음'
                                        }
                                    </td>
                                    <td css={s.tableCell}>{report.reason}</td>
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
                                    <td css={s.tableCell}>
                                        {report.status === 1 ? '미처리' : '처리완료'}
                                    </td>
                                    <td css={s.tableCell}>
                                        {report.status === 1 && (
                                            <button
                                                css={s.processButton}
                                                onClick={() => handleProcessReport(report.reportId)}
                                            >
                                                처리완료
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Toaster />
        </div>
    );
}

export default ReportManagement;
