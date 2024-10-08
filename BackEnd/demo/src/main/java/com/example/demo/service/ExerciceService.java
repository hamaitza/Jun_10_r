package com.example.demo.service;

import com.example.demo.model.Exercice;
import com.example.demo.repository.ExerciceRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Transactional
public class ExerciceService {
    @Autowired
    private ExerciceRepository exerciceRepository;
    public List<Exercice> listAllExercices() {
        return exerciceRepository.findAll();
    }

    public void saveExercice(Exercice exercice) {
        exerciceRepository.save(exercice);
    }

    public Exercice getExercice(Integer id) {
        return exerciceRepository.findById(id).get();
    }
    
    public void deleteExercice(Integer id) {
        exerciceRepository.deleteById(id);
    }
}