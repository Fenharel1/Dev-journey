package com.backend.springjpa2.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.springjpa2.models.Video;

public interface VideoRepository extends JpaRepository<Video, Integer> {

}
