import { useQuery } from '@apollo/client';
import { useGlobalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';

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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  wordButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 999,
    alignItems: 'center',
    shadowColor: '#5E5DF0',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    marginTop: 20,
  },
  wordButtonText: {
    color: 'black',
    fontWeight: 'bold',
    marginRight: 10,
  },
  selectedWord: {
    backgroundColor: '#ccc',
  },
  button: {
    padding: 10,
    backgroundColor: '#5E5DF0',
    borderRadius: 999,
    width: 100,
    alignItems: 'center',
    shadowColor: '#5E5DF0',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    marginTop: 20,
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
  },
});

const ChooseType: React.FC<{
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
        {sentence.map((word, index) => (
          <TouchableOpacity onPress={() => handleRemoveWord(word)} key={index}>
            <Text style={styles.wordButtonText}>{word}</Text>
          </TouchableOpacity>
        ))}
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

const TestType: React.FC<{
  task: SelectionTests;
  onNext: () => void;
  setSelectedWord: React.Dispatch<React.SetStateAction<string | null>>;
  selectedWord: string | null;
}> = ({ task, onNext, setSelectedWord, selectedWord }) => {
  const handleAnswerSelect = (word: string): void => {
    setSelectedWord(word);
    // onNext();
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
      <Text>{task.sentence}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {task.words.map((word: string, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleAnswerSelect(word)}
            style={[styles.wordButton, selectedWord === word && styles.selectedWord]}>
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

  if (loading) {
    return <Text>Loading...</Text>;
  }

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

  const HandleScore = (): void => {
    if (task?.type === 'choose') {
      const answer = task.correctForm;
      const userSentence = sentence.join(' ');
      if (userSentence === answer) {
        setScore((prev) => prev + 1);
      }
    } else if (task?.type === 'test') {
      const answer = task.correctForm;
      if (selectedWord === answer) {
        setScore((prev) => prev + 1);
      }
    }
  };

  return (
    <View style={styles.container}>
      {task?.type === 'test' && (
        <TestType
          task={task}
          onNext={handleNext}
          setSelectedWord={setSelectedWord}
          selectedWord={selectedWord}
        />
      )}
      {task?.type === 'choose' && (
        <ChooseType task={task} onNext={handleNext} setSentence={setSentence} sentence={sentence} />
      )}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Your Grade: {score}%</Text>
            {data?.getLessonTest?.selectionTests.map((task: SelectionTests, index: number) => (
              <Text key={index}>
                {index + 1}: {task.correctForm}
              </Text>
            ))}
            <Button
              title="done"
              onPress={() => {
                setShowModal(false);
                router.push('/(tabs)/');
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Page;
