package com.korit.nomore.repository;

import com.korit.nomore.domain.entity.District;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Repository
public class DistrictRepository {

    private final List<District> districts = Arrays.asList(
            new District("all", "전체", District.DistrictType.ALL),
            new District("haeundae", "해운대구", District.DistrictType.GU),
            new District("busanjin", "부산진구", District.DistrictType.GU),
            new District("dongnae", "동래구", District.DistrictType.GU),
            new District("nam", "남구", District.DistrictType.GU),
            new District("buk", "북구", District.DistrictType.GU),
            new District("suyeong", "수영구", District.DistrictType.GU),
            new District("sasang", "사상구", District.DistrictType.GU),
            new District("geumjeong", "금정구", District.DistrictType.GU),
            new District("gangseo", "강서구", District.DistrictType.GU),
            new District("saha", "사하구", District.DistrictType.GU),
            new District("yeongdo", "영도구", District.DistrictType.GU),
            new District("dong", "동구", District.DistrictType.GU),
            new District("seo", "서구", District.DistrictType.GU),
            new District("jung", "중구", District.DistrictType.GU),
            new District("yeonje", "연제구", District.DistrictType.GU),
            new District("gijang", "기장군", District.DistrictType.GUN)
    );

    public List<District> findAll() {
        return districts;
    }

    public Optional<District> findById(String id) {
        return districts.stream()
                .filter(district -> district.getId().equals(id))
                .findFirst();
    }

    public List<District> findByType(District.DistrictType type) {
        return districts.stream()
                .filter(district -> district.getType() == type)
                .toList();
    }
}