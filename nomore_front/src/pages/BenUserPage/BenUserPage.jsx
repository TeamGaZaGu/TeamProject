/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import toast, { Toaster } from 'react-hot-toast';

import usePrincipalQuery from '../../queries/usePrincipalQuery';
import { submitReport } from '../../api/reportApi';

const styles = {
  container: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background-color: #f3f4f6;
    position: relative;
    padding-bottom: 12rem;
    box-sizing: border-box;
  `,

  box: css`
    text-align: center;
    background-color: white;
    padding: 4rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    max-width: 60rem;
    width: 100%;
  `,

  title: css`
    font-size: 2.5rem;
    font-weight: 600;
    color: #dc2626;
    margin-bottom: 1rem;
  `,

  subTitle: css`
    font-size: 1.8rem;
    color: #6b7280;
    margin-bottom: 3rem;
    line-height: 1.5;
  `,

  homeButton: css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 0.1rem solid #3b82f6;
    border-radius: 0.8rem;
    padding: 1.2rem 2rem;
    width: fit-content;
    background-color: #3b82f6;
    color: white;
    font-size: 1.6rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #2563eb;
      border-color: #2563eb;
    }

    &:active {
      background-color: #1d4ed8;
    }
  `,

  modalOverlay: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 2rem;
    box-sizing: border-box;
  `,

  modalContent: css`
    background-color: white;
    border-radius: 1rem;
    padding: 2rem;
    width: 100%;
    max-width: 50rem;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  `,

  modalHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 1rem;

    h3 {
      margin: 0;
      font-size: 2rem;
      font-weight: 600;
      color: #111827;
    }
  `,

  closeButton: css`
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #6b7280;
    padding: 0.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background-color: #f3f4f6;
      color: #374151;
    }
  `,

  modalBody: css`
    margin-bottom: 2rem;
  `,

  modalDescription: css`
    font-size: 1.4rem;
    color: #6b7280;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  `,

  textarea: css`
    width: 100%;
    min-height: 12rem;
    padding: 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 1.4rem;
    resize: vertical;
    font-family: inherit;
    box-sizing: border-box;
    
    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    &::placeholder {
      color: #9ca3af;
    }
  `,

  charCount: css`
    text-align: right;
    font-size: 1.2rem;
    color: #6b7280;
    margin-top: 0.5rem;
  `,

  modalFooter: css`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  `,

  cancelButton: css`
    padding: 1rem 2rem;
    background-color: #f3f4f6;
    color: #374151;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.4rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: #e5e7eb;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,

  submitButton: css`
    padding: 1rem 2rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.4rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    &:hover:not(:disabled) {
      background-color: #2563eb;
    }
    
    &:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }
  `
};

const MAX_LENGTH = 500;

function BenUserPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inquiryReason, setInquiryReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const principalQuery = usePrincipalQuery();
  const userId = principalQuery?.data?.data?.user?.userId;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setInquiryReason('');
    setIsSubmitting(false);
  };

  const handleModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  };

  const handleReasonChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_LENGTH) {
      setInquiryReason(value);
    }
  };

  const validateForm = () => {
    if (!inquiryReason.trim()) {
      toast.error('문의 내용을 입력해주세요.');
      return false;
    }

    if (!userId) {
      toast.error('사용자 정보를 불러올 수 없습니다.');
      return false;
    }

    return true;
  };

  const handleSubmitInquiry = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const reportData = {
        userId: userId,
        targetType: 4,
        targetId: userId,
        reason: inquiryReason.trim()
      };
      
      await submitReport(reportData);
      
      toast.success('문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.');
      handleCloseModal();
      
    } catch (error) {
      console.error('문의 제출 실패:', error);
      toast.error('문의 제출에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderModal = () => (
    <div 
      css={styles.modalOverlay} 
      onClick={handleModalOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div css={styles.modalContent}>
        <div css={styles.modalHeader}>
          <h3>고객센터 문의</h3>
          <button 
            css={styles.closeButton} 
            onClick={handleCloseModal}
            aria-label="닫기"
          >
            <IoClose />
          </button>
        </div>

        <div css={styles.modalBody}>
          <p css={styles.modalDescription}>
            계정 제재와 관련하여 문의사항이 있으시면 아래에 상세히 작성해주세요.
            <br />
            담당자가 확인 후 빠른 시일 내에 답변드리겠습니다.
          </p>

          <textarea
            css={styles.textarea}
            placeholder="문의 내용을 입력해주세요..."
            value={inquiryReason}
            onChange={handleReasonChange}
            maxLength={MAX_LENGTH}
            autoFocus
          />

          <div css={styles.charCount}>
            {inquiryReason.length}/{MAX_LENGTH}
          </div>
        </div>

        <div css={styles.modalFooter}>
          <button 
            css={styles.cancelButton} 
            onClick={handleCloseModal}
            disabled={isSubmitting}
          >
            취소
          </button>
          <button 
            css={styles.submitButton} 
            onClick={handleSubmitInquiry}
            disabled={isSubmitting || !inquiryReason.trim()}
          >
            {isSubmitting ? '제출 중...' : '문의하기'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div css={styles.container}>
        <div css={styles.box}>
          <h1 css={styles.title}>⚠️ 계정 이용 제한</h1>
          <p css={styles.subTitle}>
            현재 이용이 제한된 사용자입니다.<br />
            문의사항이 있으시면 고객센터로 연락해주세요.
          </p>
          <button css={styles.homeButton} onClick={handleOpenModal}>
            고객센터 문의하기
          </button>
        </div>
      </div>
      
      {isModalOpen && renderModal()}
      
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: '1.4rem'
          }
        }}
      />
    </>
  );
}

export default BenUserPage;