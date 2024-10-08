package com.example.demo.controller;

import com.example.demo.model.Exercice;
import com.example.demo.service.ExerciceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin
@RequestMapping("/exercices")
public class ExerciceController {

    @Autowired
    ExerciceService exerciceService;
    
    @GetMapping("")
    public List<Exercice> list() {
        return exerciceService.listAllExercices();
    }
    
    @GetMapping("/id/{id}")
    public ResponseEntity<List<Exercice>> get3(@PathVariable String id) {
    	List<Exercice> exercices = exerciceService.listAllExercices();
    	List<Exercice> user_exercice = new ArrayList<Exercice>();
    	for(int i = 0; i < exercices.size(); i++) {
    		if(exercices.get(i).getUserId().equals(id)){
    			user_exercice.add(exercices.get(i));
    		}
    	}
    	return new ResponseEntity<List<Exercice>>(user_exercice, HttpStatus.OK);
    }
    
    @PostMapping("/add")
    public void add5(@RequestBody Exercice exercice) {
    	List<Exercice> exercices = exerciceService.listAllExercices();
    	for(int i = 0; i < exercices.size(); i++)
    		if(exercices.get(i).getExerciceName().equals(exercice.getExerciceName()) && exercices.get(i).getUserId().equals(exercice.getUserId())) {
    			break;
    		}
    		else if( i == exercices.size() - 1) {
    			exerciceService.saveExercice(exercice);
    		}
    	
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {

        exerciceService.deleteExercice(id);
    }
}