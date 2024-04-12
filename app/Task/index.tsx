import { useQuery } from '@apollo/client';
import { useGlobalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';

import { GET_LESSON_TEST } from '../graphql/lessonTest';

interface SelectionTests {
  id: string;
  type: string;
  sentence: string;
  words: string[];
  correctForm: string;
  isLast: boolean;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  wordButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5E5DF0',
    shadowColor: '#5E5DF0',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 20,
    marginRight: 20,
  },
  sentenceWord: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#5E5DF0',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 20,
    marginRight: 20,
  },
  textButton: {
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
  sentenceContainer: {
    width: '90%',
    height: 200,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 30,
  },
  wordButtonText: {
    color: 'black',
    fontWeight: 'bold',
    marginRight: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
  },
  OnPressText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
  },
  selectedWord: {
    backgroundColor: '#5E5DF0',
    color: 'white',
  },
  sentenceText: {
    fontSize: 20,
    fontWeight: 'bold',
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
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: 'white',
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
    gap: 15,
  },
});

const TestType: React.FC<{
  task: SelectionTests;
  setSentence: React.Dispatch<React.SetStateAction<string[]>>;
  sentence: string[];
  onNext: () => void;
}> = ({ task, setSentence, sentence, onNext }) => {
  const [words, setWords] = useState<string[]>(task.words);
  const handleWordSelect = (word: string): void => {
    setSentence([...sentence, word]);
    setWords((prevWords) => prevWords.filter((w) => w !== word));
  };

  const handleRemoveWord = (word: string): void => {
    setSentence(sentence.filter((w) => w !== word));
    setWords([...words, word]);
  };

  const handleNext = (): void => {
    if (words.length > 0) {
      alert('Please finish arranging all words before moving to the next question.');
      return;
    }
    onNext();
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        <View style={styles.sentenceContainer}>
          {sentence.map((word, index) => (
            <TouchableOpacity
              onPress={() => handleRemoveWord(word)}
              style={styles.sentenceWord}
              key={index}>
              <Text style={styles.wordButtonText}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View
        style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20 }}>
        {words.map((word, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleWordSelect(word)}
            style={styles.wordButton}>
            <Text style={styles.wordButtonText}>{word}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={handleNext} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const ChooseType: React.FC<{
  task: SelectionTests;
  onNext: () => void;
  setSelectedWord: React.Dispatch<React.SetStateAction<string | null>>;
  selectedWord: string | null;
}> = ({ task, onNext, setSelectedWord, selectedWord }) => {
  const handleAnswerSelect = (word: string): void => {
    setSelectedWord(word);
  };
  const handleNext = (): void => {
    if (selectedWord === null) {
      alert('Please finish arranging all words before moving to the next question.');
      return;
    }
    onNext();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sentenceText}>{task.sentence}</Text>
      <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center' }}>
        {task.words.map((word: string, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleAnswerSelect(word)}
            style={[styles.textButton, selectedWord === word && styles.selectedWord]}>
            <Text style={selectedWord === word ? styles.OnPressText : styles.wordButtonText}>
              {word}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={handleNext} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const Page: React.FC = () => {
  const { title }: { title: string } = useGlobalSearchParams();
  const { data, error, loading, refetch } = useQuery(GET_LESSON_TEST, {
    variables: {
      title,
    },
  });

  useFocusEffect(() => {
    refetch();
  });

  const router = useRouter();

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [sentence, setSentence] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );

  if (error) {
    return <Text>Error fetching data</Text>;
  }

  // eslint-disable-next-line no-extra-boolean-cast
  if (!Boolean(data)) {
    return <Text>Loading...</Text>;
  }

  const handleNext = (): void => {
    HandleScore();
    if (currentTaskIndex < data?.getLessonTest?.selectionTests.length - 1) {
      setSelectedWord(null);
      setSentence([]);

      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      setShowModal(true);
    }
  };
  const task = data?.getLessonTest?.selectionTests[currentTaskIndex];
  const length = data?.getLessonTest?.selectionTests.length;

  const HandleScore = (): void => {
    if (task?.type === 'choose') {
      const answer = task.correctForm;
      const userSentence = sentence.join(' ');
      if (userSentence === answer) {
        setScore((prev) => prev + 1);
      }
    } else if (task?.type === 'test') {
      const answer = task.correctForm;
      console.log(answer);
      if (selectedWord === answer) {
        setScore((prev) => prev + 1);
      }
    }
  };

  const handleRestart = (): void => {
    setCurrentTaskIndex(0);
    setSelectedWord(null);
    setSentence([]);
    setScore(0);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      {task?.type === 'test' && (
        <ChooseType
          task={task}
          onNext={handleNext}
          setSelectedWord={setSelectedWord}
          selectedWord={selectedWord}
        />
      )}
      {task?.type === 'choose' && (
        <TestType task={task} onNext={handleNext} setSentence={setSentence} sentence={sentence} />
      )}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.wordButtonText}>
              Зөв хариунууд:{score}/{length}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleRestart();
              }}>
              <Text style={styles.modalButtonText}>Дахин эхлэх</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setShowModal(false);
                router.push('/(tabs)/');
              }}>
              <Text style={styles.modalButtonText}>Хаах</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Page;
