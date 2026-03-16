package com.UpgradeU.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.UpgradeU.Dto.ExamCreateRequest;
import com.UpgradeU.Dto.ExamResponse;
import com.UpgradeU.Dto.ExamResultResponse;
import com.UpgradeU.Dto.QuestionRequest;
import com.UpgradeU.Dto.QuestionResponse;
import com.UpgradeU.Entity.*;
import com.UpgradeU.Repo.CourseRepo;
import com.UpgradeU.Repo.ExamRepo;
import com.UpgradeU.Repo.VideoRepo;
import com.UpgradeU.Entity.Question;



@Service
public class ExamService {

    private final ExamRepo examRepo;
    private final CourseRepo courseRepo;
    private final VideoRepo vr;
    
    

    public ExamService(ExamRepo examRepo,
                       CourseRepo courseRepo,
                       VideoRepo vr) {
        this.examRepo = examRepo;
        this.courseRepo = courseRepo;
        this.vr = vr;
    }

    public Exam createExam(Long courseId,
            int videoId,
            ExamCreateRequest request) {

Course course = courseRepo.findById(courseId)
 .orElseThrow(() -> new RuntimeException("Course not found"));

VideoEntity video = vr.findById(videoId)
.orElseThrow(() -> new RuntimeException("Video not found"));

// 🔹 Convert DTO → Entity
Exam exam = new Exam();
exam.setExamName(request.getExamName());
exam.setTotalMarks(request.getTotalMarks());
exam.setPassMarks(request.getPassMarks());
exam.setCourse(course);
exam.setVideo(video);

List<Question> questionList = new ArrayList<>();


for (QuestionRequest qr : request.getQuestions()) {
Question q = new Question();
q.setQuestionText(qr.getQuestionText());
q.setOptions(String.join(",", qr.getOptions()));
q.setCorrectOptionIndex(qr.getCorrectOptionIndex());
questionList.add(q);
}

exam.setQuestions(questionList);

return examRepo.save(exam);
}

public Exam getExamByVideoId(int videoId) {
return examRepo.findByVideo_Id(videoId);
}


public ExamResultResponse submitExam(Long examId,
        List<Integer> answers) {

Exam exam = examRepo.findById(examId)
.orElseThrow(() -> new RuntimeException("Exam not found"));

List<Question> questions = exam.getQuestions();

if (answers.size() != questions.size()) {  
throw new RuntimeException("All questions must be answered");
}

int correctCount = 0;
for (int i = 0; i < questions.size(); i++) {
if (questions.get(i).getCorrectOptionIndex() == answers.get(i)) {
correctCount++;
}
}

int score = correctCount;
boolean passed = score >= exam.getPassMarks();

// Unlock next video if passed
if (passed) {
unlockNextVideo(exam.getVideo());
}

return new ExamResultResponse(
questions.size(), correctCount, score, passed
);
}



public ExamResponse getExamForStudentByVideoId(int videoId) {
    Exam exam = examRepo.findByVideo_Id(videoId);
    if (exam == null) {
        return null;
    }

    List<QuestionResponse> questionResponses = new ArrayList<>();
    for (Question q : exam.getQuestions( )) {
        List<String> options = Arrays.asList(q.getOptions().split(","));
        questionResponses.add(
            new QuestionResponse(q.getQuestionText(), options)
        );
    }

    return new ExamResponse(
        exam.getId(),
        exam.getExamName(),
        exam.getTotalMarks(),
        exam.getPassMarks(),
        questionResponses
    );
}




private void unlockNextVideo(VideoEntity currentVideo) {

    System.out.println("Unlock next video process");

    // later connect merged code here
}

public void deleteExam(Long examId) {

    Exam exam = examRepo.findById(examId)
            .orElseThrow(() ->
                new RuntimeException("Exam not found"));

    examRepo.delete(exam);
}





}