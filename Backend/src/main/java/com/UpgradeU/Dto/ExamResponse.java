package com.UpgradeU.Dto;



import java.util.List;

public class ExamResponse {

    private Long examId;
    private String examName;
    private int totalMarks;
    private int passMarks;
    private List<QuestionResponse> questions;

    public ExamResponse(Long examId,
                        String examName,
                        int totalMarks,
                        int passMarks,
                        List<QuestionResponse> questions) {
        this.examId = examId;
        this.examName = examName;
        this.totalMarks = totalMarks;
        this.passMarks = passMarks;
        this.questions = questions;
    }

    public Long getExamId() {
        return examId;
    }

    public String getExamName() {
        return examName;
    }

    public int getTotalMarks() {
        return totalMarks;
    }

    public int getPassMarks() {
        return passMarks;
    }

    public List<QuestionResponse> getQuestions() {
        return questions;
    }
}

