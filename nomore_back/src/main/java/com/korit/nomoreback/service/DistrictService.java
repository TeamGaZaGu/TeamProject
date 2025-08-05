package com.korit.nomoreback.service;

import com.korit.nomoreback.dto.DistrictReqDto;
import com.korit.nomoreback.repository.DistrictRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DistrictService {
    private final DistrictRepository districtRepository;

    public DistrictService(DistrictRepository districtRepository) {
        this.districtRepository = districtRepository;
    }

    public List<DistrictReqDto> getDistrict () {
        return districtRepository.findAll().stream()
                .map(DistrictReqDto::getDistrict)
                .collect(Collectors.toList());
    }
}
