export const saveRecentlyViewed = (moimData) => {
  try {
    const recentItems = getRecentlyViewed();
    
    // 중복 제거 (이미 있으면 제거)
    const filteredItems = recentItems.filter(item => item.moimId !== moimData.moimId);
    
    // 새 항목을 맨 앞에 추가하고 최대 8개까지만 유지
    const newItems = [
      {
        moimId: moimData.moimId,
        title: moimData.title,
        moimImgPath: moimData.moimImgPath,
        discription: moimData.discription,
        categoryName: moimData.categoryName,
        categoryEmoji: moimData.categoryEmoji,
        districtName: moimData.districtName,
        memberCount: moimData.memberCount,
        maxMember: moimData.maxMember,
        viewedAt: new Date().toISOString()
      },
      ...filteredItems
    ].slice(0, 5);
    
    localStorage.setItem('recentlyViewed', JSON.stringify(newItems));
  } catch (error) {
    console.error('최근 본 모임 저장 실패:', error);
  }
};

/**
 * 최근 본 모임 목록 불러오기
 */
export const getRecentlyViewed = () => {
  try {
    const items = localStorage.getItem('recentlyViewed');
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error('최근 본 모임 불러오기 실패:', error);
    return [];
  }
};

/**
 * 특정 모임을 최근 본 목록에서 제거
 */
export const removeFromRecentlyViewed = (moimId) => {
  try {
    const recentItems = getRecentlyViewed();
    const filteredItems = recentItems.filter(item => item.moimId !== moimId);
    localStorage.setItem('recentlyViewed', JSON.stringify(filteredItems));
  } catch (error) {
    console.error('최근 본 모임 제거 실패:', error);
  }
};

/**
 * 최근 본 모임 전체 삭제
 */
export const clearRecentlyViewed = () => {
  try {
    localStorage.removeItem('recentlyViewed');
  } catch (error) {
    console.error('최근 본 모임 전체 삭제 실패:', error);
  }
};