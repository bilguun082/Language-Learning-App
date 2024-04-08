import { useQuery } from '@apollo/client';
import { useGlobalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';

import { GET_VOCABULARY_TEST } from '../graphql/vocabularyTest';

interface VocabularySelectionTest {
  id: string;
  question: string;
  words: string[];
  correctAnswer: string;
  isLast: boolean;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  word: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  selectedWord: {
    backgroundColor: '#ccc',
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

const Page: React.FC = () => {
  const { title }: { title: string } = useGlobalSearchParams();
  const { data, error, loading } = useQuery(GET_VOCABULARY_TEST, {
    variables: {
      title,
    },
  });

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleAnswerSelect = (word: string): void => {
    const currentTask = data?.getVocabularyTest.vocabularySelectionTests[currentTaskIndex];
    if (word === currentTask?.correctAnswer) {
      setUserAnswers([...userAnswers, word]);
    }
    setSelectedWord(word);
    setTimeout(() => {
      handleNext();
    }, 500);
  };

  const handleNext = (): void => {
    if (currentTaskIndex < data?.getVocabularyTest.vocabularySelectionTests.length - 1) {
      setSelectedWord(null);
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      setShowModal(true);
    }
  };

  const calculateGrade = (): number => {
    const correctAnswers = data?.getVocabularyTest.vocabularySelectionTests.map(
      (task: VocabularySelectionTest) => task.correctAnswer,
    );
    const userGrade = userAnswers.reduce((grade, answer, index) => {
      if (answer === correctAnswers[index]) {
        return grade + 1;
      }
      return grade;
    }, 0);
    return (userGrade / correctAnswers.length) * 100;
  };

  const closeModal = (): void => {
    setShowModal(false);
  };

  const renderQuizTask = (): JSX.Element => {
    const task = data?.getVocabularyTest.vocabularySelectionTests[currentTaskIndex];
    const { question, words } = task;
    return (
      <View style={styles.container}>
        <Text style={styles.question}>{question}</Text>
        <View style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
          {words.map((word: string) => (
            <TouchableOpacity
              key={word}
              style={[styles.word, word === selectedWord && styles.selectedWord]}
              onPress={() => handleAnswerSelect(word)}
              disabled={selectedWord !== null}>
              <Text>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
          disabled={selectedWord === null}>
          <Text style={styles.buttonText}>
            {currentTaskIndex === data.getVocabularyTest.vocabularySelectionTests.length - 1
              ? 'Done'
              : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderModal = (): JSX.Element => {
    const grade = calculateGrade();
    return (
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Your Grade: {grade.toFixed(2)}%</Text>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    );
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error fetching data</Text>;
  }

  return (
    <View>
      {renderQuizTask()}
      {renderModal()}
    </View>
  );
};

export default Page;
