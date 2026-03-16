package com.UpgradeU.Dto;

import java.util.List;

public class ExamSubmitRequest {

    private Long examId;
    private Long userId;
    private List<Integer> answers;

    public Long getExamId() {
        return examId;
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }

    public Long getUserId() {
        return userId;
        
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<Integer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Integer> answers) {
        this.answers = answers;
    }
}