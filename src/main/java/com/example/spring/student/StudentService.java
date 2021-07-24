package com.example.spring.student;

import com.example.spring.student.exception.BadRequestException;
import com.example.spring.student.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;
    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    public void addStudent(Student student) {
                if(studentRepository.selectExistsEmail(student.getEmail())){
                    throw new BadRequestException("Student Already Registered!");
                }
        studentRepository.save(student);

    }

    public void deleteStudent(Long studentId) {
        if(!studentRepository.existsById(studentId)){
            throw new StudentNotFoundException("Student Not Found!");
        }
        studentRepository.deleteById(studentId);
    }

    @Transactional
    public void updateStudent(Long studentId, String name, Gender gender) {
     Student student=  studentRepository.findById(studentId).orElseThrow(()->new IllegalStateException(
               "Student Not Found toUpdate!"
        ));
        student.setName(name);
        student.setGender(gender);
    }
}
