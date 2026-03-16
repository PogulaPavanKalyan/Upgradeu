package com.UpgradeU.Dto;


import java.util.List;

public class QuestionResponse {

    private String questionText;
    private List<String> options;

    public QuestionResponse(String questionText, List<String> options) {
        this.questionText = questionText;
        this.options = options;
    }

    public String getQuestionText() {
        return questionText;
    }
    

    public List<String> getOptions() {
        return options;
    }
}

