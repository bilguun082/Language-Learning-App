import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  wordList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  word: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

const tasks = [
  {
    type: 'quiz',
    question: 'What is the meaning of play?',
    options: ['тоглох', 'дуулах', 'идэх', 'амрах'],
    answer: 'тоглох',
  },
  {
    type: 'quiz',
    question: 'What is the meaning of sing?',
    options: ['тоолох', 'унших', 'сонсох', 'дуулах'],
    answer: 'дуулах',
  },
];

const Page: React.FC = () => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleAnswerSelect = (option: string): void => {
    const currentTask = tasks[currentTaskIndex];
    if (option === currentTask.answer) {
      setUserAnswers([...userAnswers, option]);
    }
    setSelectedOption(option);
    setTimeout(() => {
      handleNext();
    }, 500);
  };

  const handleNext = (): void => {
    if (currentTaskIndex < tasks.length - 1) {
      setSelectedOption(null);
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      setShowModal(true);
    }
  };

  const calculateGrade = (answers: string[]): number => {
    const correctAnswers = tasks.map((task) => task.answer);
    const userGrade = answers.reduce((grade, answer, index) => {
      if (answer === correctAnswers[index]) {
        return grade + 1;
      }
      return grade;
    }, 0);
    return (userGrade / tasks.length) * 100;
  };

  const closeModal = (): void => {
    setShowModal(false);
  };

  const renderQuizTask = (): JSX.Element => {
    const { question, options } = tasks[currentTaskIndex];
    return (
      <View style={styles.container}>
        <Text>{question}</Text>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, option === selectedOption && { backgroundColor: 'gray' }]}
            onPress={() => handleAnswerSelect(option)}>
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
        {currentTaskIndex === tasks.length - 1 ? (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  const renderModal = (): JSX.Element => {
    const grade = calculateGrade(userAnswers);
    return (
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Your Grade: {grade}%</Text>
            {tasks.map((task, index) => (
              <Text key={index}>
                {task.question}: {task.answer}
              </Text>
            ))}
            <Button title="хаах" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    );
  };

  const renderTask = (): JSX.Element => {
    return (
      <>
        {renderQuizTask()}
        {renderModal()}
      </>
    );
  };

  return <View style={styles.container}>{renderTask()}</View>;
};

export default Page;
