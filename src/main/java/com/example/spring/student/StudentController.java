package com.example.spring.student;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/students")
@AllArgsConstructor
public class StudentController {
    private final StudentService studentService;
@GetMapping
    public List<Student> getAllStudent(){
//throw new IllegalStateException("opppps");
        return studentService.getAllStudents();
    }
    @PostMapping
    public void addStudent(@Valid @RequestBody Student student){
    studentService.addStudent(student);

    }
    @DeleteMapping(path = "{studentId}")
    public void deleteStudent(@PathVariable("studentId") Long studentId){
    studentService.deleteStudent(studentId);
    }

    @PutMapping(path = "{studentId}")
    public void updateStudent(@PathVariable("studentId") Long studentId,
                              @RequestParam(required = false) String name,
                              @RequestParam(required = false) Gender gender ){
    studentService.updateStudent(studentId,name,gender);
    }
}
