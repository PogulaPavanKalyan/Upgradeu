package com.UpgradeU.Dto;

import java.util.Map;

public class ExamSubmitDto {
	private Long examId;
	private Map<Long, Long> answers; // questionId -> optionId

	public ExamSubmitDto() {
	}

	public Long getExamId() {
		return examId;
	}

	public void setExamId(Long examId) {
		this.examId = examId;
	}

	public Map<Long, Long> getAnswers() {
		return answers;
	}

	public void setAnswers(Map<Long, Long> answers) {
		this.answers = answers;
	}

	public ExamSubmitDto(Long examId, Map<Long, Long> answers) {
		super();
		this.examId = examId;
		this.answers = answers;
	}

}