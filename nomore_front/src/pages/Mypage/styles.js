import { css } from '@emotion/react';

// 메인 레이아웃 - 회원가입과 동일한 구조
export const layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  min-width: 300px;
  margin-left: auto;
  margin-right: auto;
  background-color: #fafafa;
  border-radius: 1rem;
  min-height: 80vh;
  box-sizing: border-box;
`;

// 페이지 제목
export const pageTitle = css`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

// 프로필 이미지 섹션
export const profileSection = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
`;

// 수정된 프로필 이미지 스타일
export const profileImage = css`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #e0e0e0;
  overflow: hidden;
  margin-bottom: 1rem;
  position: relative;
  background-color: #f5f5f5;
  
  & > img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    display: block !important;
    border-radius: 0 !important;
    position: relative !important;
    z-index: 1 !important;
  }
  
  /* 이미지 로드 실패시 플레이스홀더 */
  & .placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: #666;
    background-color: #f5f5f5;
    z-index: 0;
  }
`;

export const profileImageUpload = css`
  padding: 0.5rem 1rem;
  background-color: #7e57c2;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #673ab7;
  }
`;

// 정보 표시 컨테이너
export const infoContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 48rem;   /* 기존 40rem → 48rem 로 확대 */
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

// 정보 아이템 (읽기 전용)
export const infoItem = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const infoLabel = css`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;

export const infoValue = css`
  padding: 1rem;
  border-radius: 0.8rem;
  border: 1px solid #dbdbdb;
  font-size: 1rem;
  background-color: #f9f9f9;
  color: #333;
  box-sizing: border-box;
`;

// 편집 가능한 입력 필드 (회원가입과 동일)
export const inputStyle = css`
  padding: 1rem;
  border-radius: 0.8rem;
  border: 1px solid #dbdbdb;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border: 1px solid #7e57c2;
  }
`;

// 편집 모드 토글
export const editModeContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 40rem;
  margin-bottom: 1rem;
`;

export const editToggleButton = css`
  padding: 0.8rem 1.5rem;
  background-color: #ffffff;
  color: #7e57c2;
  border: 2px solid #7e57c2;
  border-radius: 0.8rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #7e57c2;
    color: white;
  }

  &.active {
    background-color: #7e57c2;
    color: white;
  }
`;

// 버튼 컨테이너 (회원가입과 동일)
export const buttonContainer = css`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  width: 100%;
  max-width: 48rem;
`;

// 저장 버튼 (회원가입 버튼과 동일한 스타일)
export const saveButton = css`
  padding: 1rem 2rem;
  background-color: #7e57c2;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  flex: 1;

  &:hover {
    background-color: #673ab7;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const dangerButton = css`
  padding: 0.8rem 1.5rem;
  background-color: #ff4d4f; /* 진한 빨간색 */
  color: white;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff1f1f; /* hover 시 더 진하게 */
  }

  &:active {
    background-color: #d9363e; /* 클릭 시 색 살짝 어둡게 */
  }

  &:disabled {
    background-color: #ffa39e;
    cursor: not-allowed;
  }
`;

// 취소 버튼
export const cancelButton = css`
  padding: 1rem 2rem;
  background-color: #ffffff;
  color: #666;
  font-size: 1.2rem;
  font-weight: 600;
  border: 2px solid #dbdbdb;
  border-radius: 1rem;
  cursor: pointer;
  flex: 1;

  &:hover {
    background-color: #f5f5f5;
    border-color: #bbb;
  }
`;

// 탭 네비게이션 (추가 기능용)
export const tabContainer = css`
  display: flex;
  width: 100%;
  max-width: 40rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
`;

export const tabItem = css`
  flex: 1;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  border-bottom: 3px solid transparent;
  transition: all 0.2s ease;

  &:hover {
    color: #7e57c2;
    background-color: rgba(126, 87, 194, 0.05);
  }

  &.active {
    color: #7e57c2;
    border-bottom-color: #7e57c2;
    background-color: rgba(126, 87, 194, 0.05);
  }
`;

// 섹션 구분자
export const sectionDivider = css`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 2rem 0;
`;

// 드롭다운 스타일 (회원가입과 동일)
export const dropdownContainer = css`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const dropdownButton = css`
  position: relative;
  padding: 12px 16px;
  background-color: #ffffff;
  border: 1px solid #dbdbdb;
  border-radius: 0.8rem;
  width: 100%;
  font-size: 1rem;
  color: #374151;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    border-color: #7e57c2;
  }

  &:focus {
    outline: none;
    border-color: #7e57c2;
  }

  &::after {
    content: '▼';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #9ca3af;
  }
`;

export const dropdownMenu = css`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-top: none;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const dropdownItem = css`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }

  input[type="radio"] {
    margin-right: 8px;
    accent-color: #7e57c2;
  }

  label {
    font-size: 14px;
    color: #374151;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
  }
`;

export const mypageLayout = css`
  display: grid;
  grid-template-columns: 1.6fr 1fr;   
  width: 100%;
  margin: 0;
  padding: 2rem;
  box-sizing: border-box;
  background-color: #fafafa;
  min-height: 100vh;
  align-items: start;

    @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const leftSection = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: 520px;   /* 왼쪽이 너무 눌리지 않도록 최소폭 가드 */
`;

export const rightSection = css`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const moimHeader = css`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const moimCard = css`
  display: flex;
  gap: 1rem;
  padding: 1rem 0; 
  margin-bottom: 1rem;
  border-radius: 0.8rem;
  background-color: #fafafa; 
  align-items: flex-start;
  cursor: pointer;
`;

export const moimImageContainer = css`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 0.8rem;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const moimImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const moimDefaultImage = css`
  font-size: 2rem;
`;

export const moimContent = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: bold;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #555;
  }

  span {
    font-size: 0.8rem;
    color: #777;
  }
`;

export const rightTwoCol = css`
  display: grid;
  grid-template-columns: 1fr 1fr;  /* 좌: 내가 참여한 모임 / 우: 내가 쓴 글 */
  gap: 2rem;
  align-items: start;
  width: 100%;
`;

/* [추가] 두 패널 공통 스타일 */
export const panel = css`
  background: #fff;
  border-radius: 0.8rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  padding: 1rem;
`;

/* [추가] 내가 쓴 글 목록 스타일 (간단) */
export const postList = css`
  display: grid;
  gap: 0.75rem;

  .item {
    padding: 0.75rem 0.9rem;
    border: 1px solid #eee;
    border-radius: 0.8rem;
    background: #fff;
    cursor: pointer;
  }

  .title {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .meta {
    font-size: 0.85rem;
    color: #777;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
`;