package com.UpgradeU.Entity;

import java.util.List;

public class QuestionEntity {

	public QuestionEntity() {
	}

	private Long id;
	private String questionText;
	private Double marks;
	private String explanation;
	private String type; // SINGLE_CHOICE, MULTIPLE_CHOICE
	private List<OptionEntity> options;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getQuestionText() {
		return questionText;
	}

	public void setQuestionText(String questionText) {
		this.questionText = questionText;
	}

	public Double getMarks() {
		return marks;
	}

	public void setMarks(Double marks) {
		this.marks = marks;
	}

	public String getExplanation() {
		return explanation;
	}

	public void setExplanation(String explanation) {
		this.explanation = explanation;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<OptionEntity> getOptions() {
		return options;
	}

	public void setOptions(List<OptionEntity> options) {
		this.options = options;
	}
}
