package com.korit.nomore.service;

import com.korit.nomore.domain.entity.Category;
import com.korit.nomore.domain.entity.District;
import com.korit.nomore.domain.entity.Moim;
import com.korit.nomore.dto.response.StatsResponse;
import com.korit.nomore.repository.CategoryRepository;
import com.korit.nomore.repository.DistrictRepository;
import com.korit.nomore.repository.MoimRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatsService {

    private final MoimRepository moimRepository;
    private final DistrictRepository districtRepository;
    private final CategoryRepository categoryRepository;

    public List<StatsResponse> getDistrictStats() {
        List<District> districts = districtRepository.findAll();
        List<Moim> allMoims = moimRepository.findAll();

        return districts.stream()
                .filter(district -> !district.isAll())
                .map(district -> {
                    List<Moim> districtMoims = allMoims.stream()
                            .filter(moim -> moim.getDistrict().equals(district.getId()))
                            .toList();

                    long totalMembers = districtMoims.stream()
                            .mapToLong(Moim::getMemberCount)
                            .sum();

                    return StatsResponse.builder()
                            .id(district.getId())
                            .name(district.getName())
                            .type(district.getType().name())
                            .moimCount((long) districtMoims.size())
                            .totalMembers(totalMembers)
                            .build();
                })
                .sorted((a, b) -> b.getMoimCount().compareTo(a.getMoimCount()))
                .toList();
    }

    public List<StatsResponse> getCategoryStats() {
        List<Category> categories = categoryRepository.findAll();
        List<Moim> allMoims = moimRepository.findAll();

        return categories.stream()
                .filter(category -> !category.isAll())
                .map(category -> {
                    List<Moim> categoryMoims = allMoims.stream()
                            .filter(moim -> moim.getCategory().equals(category.getId()))
                            .toList();

                    long totalMembers = categoryMoims.stream()
                            .mapToLong(Moim::getMemberCount)
                            .sum();

                    return StatsResponse.builder()
                            .id(category.getId())
                            .name(category.getName())
                            .emoji(category.getEmoji())
                            .moimCount((long) categoryMoims.size())
                            .totalMembers(totalMembers)
                            .build();
                })
                .sorted((a, b) -> b.getMoimCount().compareTo(a.getMoimCount()))
                .toList();
    }
}