package com.konvo.backend.repository;

import com.konvo.backend.entity.Unlock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UnlockRepository extends JpaRepository<Unlock, Long> {

    boolean existsByUserIdAndMediaId(Long userId, Long mediaId);

    Optional<Unlock> findByUserIdAndMediaId(Long userId, Long mediaId);

}