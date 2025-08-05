package com.korit.nomoreback.repository;

import com.korit.nomoreback.domain.district.District;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DistrictRepository extends JpaRepository<District , String> {
}
