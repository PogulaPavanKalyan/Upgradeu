package com.UpgradeU.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OptionEntity {

	public OptionEntity() {
	}

	private Long id;
	private String label; // e.g., "A", "B"
	private String optionText;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Boolean correct;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getOptionText() {
		return optionText;
	}

	public void setOptionText(String optionText) {
		this.optionText = optionText;
	}

	public Boolean getCorrect() {
		return correct;
	}

	public void setCorrect(Boolean correct) {
		this.correct = correct;
	}
}
