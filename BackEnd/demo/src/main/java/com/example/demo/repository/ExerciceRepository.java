package com.example.demo.repository;

import com.example.demo.model.Exercice;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciceRepository extends JpaRepository<Exercice, Integer>{

}