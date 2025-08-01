package com.korit.nomore.service;

import com.korit.nomore.domain.entity.Category;
import com.korit.nomore.domain.entity.District;
import com.korit.nomore.domain.entity.Moim;
import com.korit.nomore.dto.request.MoimFilterRequest;
import com.korit.nomore.dto.response.MoimListResponse;
import com.korit.nomore.dto.response.MoimResponse;
import com.korit.nomore.dto.response.PageResponse;
import com.korit.nomore.repository.CategoryRepository;
import com.korit.nomore.repository.DistrictRepository;
import com.korit.nomore.repository.MoimRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MoimService {

    private final MoimRepository moimRepository;
    private final DistrictRepository districtRepository;
    private final CategoryRepository categoryRepository;

    public MoimListResponse getMoimsWithFilters(MoimFilterRequest request) {
        List<Moim> moims = moimRepository.findWithFilters(request);
        long totalCount = moimRepository.countWithFilters(request);

        List<MoimResponse> moimResponses = moims.stream()
                .map(this::convertToResponse)
                .toList();

        PageResponse pagination = PageResponse.of(request.getPage(), totalCount, request.getSize());

        Map<String, String> filters = Map.of(
                "district", request.getDistrict(),
                "category", request.getCategory(),
                "search", request.getSearch()
        );

        return MoimListResponse.builder()
                .moims(moimResponses)
                .pagination(pagination)
                .filters(filters)
                .build();
    }

    public Optional<MoimResponse> getMoimById(Long id) {
        return moimRepository.findById(id)
                .map(this::convertToResponse);
    }

    public List<MoimResponse> getPopularMoims(int limit) {
        return moimRepository.findPopular(limit).stream()
                .map(this::convertToResponse)
                .toList();
    }

    public List<MoimResponse> getRecentMoims(int limit) {
        return moimRepository.findRecent(limit).stream()
                .map(this::convertToResponse)
                .toList();
    }

    private MoimResponse convertToResponse(Moim moim) {
        String districtName = districtRepository.findById(moim.getDistrict())
                .map(District::getName)
                .orElse("");

        String categoryName = categoryRepository.findById(moim.getCategory())
                .map(Category::getName)
                .orElse("");

        return MoimResponse.from(moim, districtName, categoryName);
    }
}
