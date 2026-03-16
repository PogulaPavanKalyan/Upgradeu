package com.UpgradeU.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class Question {

    private String questionText;

    @Column(length = 1000)
    private String options;   // comma-separated values

    private int correctOptionIndex;

    // ✅ REQUIRED no-arg constructor
    public Question() {
    }

    // ✅ GETTERS & SETTERS

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getOptions() {
        return options;
    }

    public void setOptions(String options) {
        this.options = options;
    }

    public int getCorrectOptionIndex() {
        return correctOptionIndex;
    }

    public void setCorrectOptionIndex(int correctOptionIndex) {
        this.correctOptionIndex = correctOptionIndex;
    }
}
