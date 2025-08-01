package com.korit.nomore.repository;
import com.korit.nomore.domain.entity.Moim;

import com.korit.nomore.dto.request.MoimFilterRequest;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Repository
public class MoimRepository {

    private final List<Moim> moims = Arrays.asList(
            Moim.builder()
                    .id(1L).title("해운대 러닝크루")
                    .description("매주 토요일 해운대 해변에서 함께 달려요! 초보자도 환영합니다.")
                    .category("sports").district("haeundae").location("해운대 해수욕장")
                    .memberCount(24).maxMembers(30).date(LocalDate.of(2025, 8, 9)).time(LocalTime.of(7, 0))
                    .tags(Arrays.asList("러닝", "해변", "운동", "새벽")).organizer("러닝매니아")
                    .emoji("🏃‍♂️").isOnline(false).fee(0)
                    .build(),

            Moim.builder()
                    .id(2L).title("서면 맛집탐방")
                    .description("부산진구 서면의 숨은 맛집들을 함께 발견해봐요!")
                    .category("food").district("busanjin").location("서면 롯데백화점 앞")
                    .memberCount(12).maxMembers(15).date(LocalDate.of(2025, 8, 10)).time(LocalTime.of(18, 30))
                    .tags(Arrays.asList("맛집", "서면", "미식투어")).organizer("부산맛집러버")
                    .emoji("🍕").isOnline(false).fee(30000)
                    .build(),

            Moim.builder()
                    .id(3L).title("남포동 독서모임")
                    .description("중구 남포동 카페에서 책을 읽고 이야기 나누는 모임입니다.")
                    .category("study").district("jung").location("남포동 BIFF광장 근처 카페")
                    .memberCount(8).maxMembers(12).date(LocalDate.of(2025, 8, 11)).time(LocalTime.of(14, 0))
                    .tags(Arrays.asList("독서", "남포동", "책토론", "카페")).organizer("책벌레")
                    .emoji("📚").isOnline(false).fee(8000)
                    .build(),

            Moim.builder()
                    .id(4L).title("광안리 버스킹")
                    .description("수영구 광안대교 앞에서 함께 음악을 연주해요!")
                    .category("music").district("suyeong").location("광안리 해수욕장")
                    .memberCount(6).maxMembers(10).date(LocalDate.of(2025, 8, 12)).time(LocalTime.of(19, 0))
                    .tags(Arrays.asList("버스킹", "광안리", "음악", "기타")).organizer("거리음악가")
                    .emoji("🎸").isOnline(false).fee(0)
                    .build(),

            Moim.builder()
                    .id(5L).title("금정산 등산")
                    .description("금정구 금정산에서 건강한 등산 모임을 가져요!")
                    .category("outdoor").district("geumjeong").location("금정산 범어사 입구")
                    .memberCount(18).maxMembers(25).date(LocalDate.of(2025, 8, 13)).time(LocalTime.of(9, 0))
                    .tags(Arrays.asList("등산", "금정산", "자연", "운동")).organizer("산악인")
                    .emoji("🏔️").isOnline(false).fee(0)
                    .build(),

            Moim.builder()
                    .id(6L).title("동래 카페투어")
                    .description("동래구 온천장 일대의 예쁜 카페들을 탐방해요!")
                    .category("cafe").district("dongnae").location("동래 온천장")
                    .memberCount(10).maxMembers(15).date(LocalDate.of(2025, 8, 14)).time(LocalTime.of(15, 0))
                    .tags(Arrays.asList("카페", "동래", "온천장", "디저트")).organizer("카페마니아")
                    .emoji("☕").isOnline(false).fee(15000)
                    .build(),

            Moim.builder()
                    .id(7L).title("사상 보드게임")
                    .description("사상구에서 다양한 보드게임을 즐기는 모임입니다.")
                    .category("hobby").district("sasang").location("사상역 근처 보드게임카페")
                    .memberCount(7).maxMembers(8).date(LocalDate.of(2025, 8, 15)).time(LocalTime.of(20, 0))
                    .tags(Arrays.asList("보드게임", "사상", "실내활동")).organizer("게임러버")
                    .emoji("🎮").isOnline(false).fee(12000)
                    .build(),

            Moim.builder()
                    .id(8L).title("연제 연극감상")
                    .description("연제구에서 연극을 보고 감상을 나누는 문화모임입니다.")
                    .category("culture").district("yeonje").location("연제구 문화회관")
                    .memberCount(15).maxMembers(20).date(LocalDate.of(2025, 8, 16)).time(LocalTime.of(19, 30))
                    .tags(Arrays.asList("연극", "문화", "예술감상")).organizer("문화애호가")
                    .emoji("🎭").isOnline(false).fee(25000)
                    .build()
    );

    public List<Moim> findAll() {
        return moims;
    }

    public Optional<Moim> findById(Long id) {
        return moims.stream()
                .filter(moim -> moim.getId().equals(id))
                .findFirst();
    }

    public List<Moim> findWithFilters(MoimFilterRequest request) {
        return moims.stream()
                .filter(moim -> moim.matchesDistrict(request.getDistrict()))
                .filter(moim -> moim.matchesCategory(request.getCategory()))
                .filter(moim -> moim.matchesSearch(request.getSearch()))
                .skip(request.getOffset())
                .limit(request.getSize())
                .toList();
    }

    public long countWithFilters(MoimFilterRequest request) {
        return moims.stream()
                .filter(moim -> moim.matchesDistrict(request.getDistrict()))
                .filter(moim -> moim.matchesCategory(request.getCategory()))
                .filter(moim -> moim.matchesSearch(request.getSearch()))
                .count();
    }

    public List<Moim> findByDistrict(String districtId) {
        return moims.stream()
                .filter(moim -> moim.getDistrict().equals(districtId))
                .toList();
    }

    public List<Moim> findByCategory(String categoryId) {
        return moims.stream()
                .filter(moim -> moim.getCategory().equals(categoryId))
                .toList();
    }

    public List<Moim> findPopular(int limit) {
        return moims.stream()
                .sorted((a, b) -> b.getMemberCount().compareTo(a.getMemberCount()))
                .limit(limit)
                .toList();
    }

    public List<Moim> findRecent(int limit) {
        return moims.stream()
                .sorted((a, b) -> a.getDate().compareTo(b.getDate()))
                .limit(limit)
                .toList();
    }
}