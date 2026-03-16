package com.UpgradeU.Dto;

public class ExamResultResponse {

    private int totalQuestions;
    private int correctAnswers;
    private int score;
    private boolean passed;

    public ExamResultResponse(int totalQuestions,
                              int correctAnswers,
                              int score,
                              boolean passed) {
        this.totalQuestions = totalQuestions;
        this.correctAnswers = correctAnswers;
        this.score = score;
        this.passed = passed;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }

    public int getScore() {
        return score;
    }

    public boolean isPassed() {
        return passed;
    }
}
