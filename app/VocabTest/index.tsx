import { useQuery } from '@apollo/client';
import { useFocusEffect, useGlobalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';

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
    backgroundColor: '#fff',
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  word: {
    padding: 10,
    margin: 5,
    width: 250,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#5E5DF0',
    borderRadius: 30,
    backgroundColor: 'white',
    shadowColor: '#5E5DF0',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  selectedWord: {
    backgroundColor: '#5E5DF0',
  },
  button: {
    padding: 10,
    width: 250,
    height: 60,
    backgroundColor: '#5E5DF0',
    shadowColor: '#5E5DF0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    borderRadius: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  Text: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  selectedText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    height: 300,
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

const Page: React.FC = () => {
  const { title }: { title: string } = useGlobalSearchParams();
  const router = useRouter();
  const { data, error, loading, refetch } = useQuery(GET_VOCABULARY_TEST, {
    variables: {
      title,
    },
  });

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useFocusEffect(() => {
    refetch();
  });

  if (loading || !data?.getVocabularyTest) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error fetching data</Text>;
  }

  const handleAnswerSelect = (word: string): void => {
    const currentTask = data?.getVocabularyTest.vocabularySelectionTests[currentTaskIndex];
    if (word === currentTask?.correctAnswer) {
      setUserAnswers([...userAnswers, word]);
    }
    setSelectedWord(word);
  };
  const handleNext = (): void => {
    if (selectedWord !== '') {
      if (currentTaskIndex < data?.getVocabularyTest.vocabularySelectionTests.length - 1) {
        setSelectedWord('');
        setCurrentTaskIndex(currentTaskIndex + 1);
      } else {
        setShowModal(true);
      }
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
    return userGrade;
  };

  const closeModal = (): void => {
    setShowModal(false);
    router.push('/(tabs)/');
  };

  const restart = (): void => {
    setCurrentTaskIndex(0);
    setSelectedWord(null);
    setUserAnswers([]);
    setShowModal(false);
  };

  const handleScreenTap = (): void => {
    setSelectedWord(null);
  };
  const renderQuizTask = (): JSX.Element => {
    const task = data?.getVocabularyTest.vocabularySelectionTests[currentTaskIndex];
    const length = data?.getVocabularyTest.vocabularySelectionTests.length;
    const { question, words } = task;
    return (
      <TouchableWithoutFeedback onPress={handleScreenTap}>
        <View style={styles.container}>
          <Text style={styles.question}>
            {currentTaskIndex}\{length}
          </Text>
          <Text style={styles.question}>{question}</Text>
          <View style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
            {words.map((word: string) => (
              <TouchableOpacity
                key={word}
                style={[styles.word, word === selectedWord && styles.selectedWord]}
                onPress={() => handleAnswerSelect(word)}
                disabled={selectedWord !== null}>
                <Text style={selectedWord === word ? styles.selectedText : styles.buttonText}>
                  {word}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.button]}
            onPress={handleNext}
            disabled={selectedWord === null}>
            <Text style={styles.selectedText}>
              {currentTaskIndex === data?.getVocabularyTest.vocabularySelectionTests.length - 1
                ? 'Done'
                : 'Next'}
            </Text>
          </TouchableOpacity>
          <Modal visible={showModal} animationType="slide" transparent>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.selectedText}>Your Grade: {calculateGrade().toFixed(2)}%</Text>
                <Button title="Close" onPress={closeModal} />
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderModal = (): JSX.Element => {
    const grade = calculateGrade();
    return (
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.Text}>
              Зөв хариу: {grade}/{data?.getVocabularyTest.vocabularySelectionTests.length}
            </Text>
            <TouchableOpacity style={styles.button} onPress={restart}>
              <Text style={styles.selectedText}>Дахин эхлэх</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={closeModal}>
              <Text style={styles.selectedText}>Хаах</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View>
      {renderQuizTask()}
      {renderModal()}
    </View>
  );
};

export default Page;
