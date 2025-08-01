package com.korit.nomore.service;

import com.korit.nomore.domain.entity.District;
import com.korit.nomore.repository.DistrictRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DistrictService {

    private final DistrictRepository districtRepository;

    public List<District> getAllDistricts() {
        return districtRepository.findAll();
    }

    public Optional<District> getDistrictById(String id) {
        return districtRepository.findById(id);
    }

    public List<District> getDistrictsByType(District.DistrictType type) {
        return districtRepository.findByType(type);
    }
}
