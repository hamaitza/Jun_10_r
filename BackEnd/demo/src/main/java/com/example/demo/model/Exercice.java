package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
	

@Entity
@Table(name = "exercices")
public class Exercice {
    private int id;
    private String exerciceName;
    private String userId;

    public Exercice() {
    }

    public Exercice(int id, String exerciceName, String userId) {
        this.id = id;
        this.exerciceName = exerciceName;
        this.userId = userId;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

	public String getExerciceName() {
		return exerciceName;
	}

	public void setExerciceName(String exerciceName) {
		this.exerciceName = exerciceName;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public void setId(int id) {
		this.id = id;
	}
    
}