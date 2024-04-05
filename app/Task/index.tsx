// import { useGlobalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';

interface Task {
  type: 'ChooseCorrectAnswer' | 'ArrangeWordsToFormSentence';
  sentence: string;
  words: string[];
  correctAnswer: string;
}

interface TestPageProps {
  tasks: Task[];
}

const TestPage: React.FC<TestPageProps> = ({ tasks }) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const currentTask = tasks[currentTaskIndex];

  const handleNext = (): void => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    }
  };

  const handleBack = (): void => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(currentTaskIndex - 1);
    }
  };

  const renderTask = (): React.JSX.Element | null => {
    switch (currentTask.type) {
      case 'ChooseCorrectAnswer':
        return (
          <View>
            <Text>{currentTask.sentence}</Text>
            {currentTask.words.map((word, index) => (
              <Button key={index} title={word} onPress={() => handleAnswer(word)} />
            ))}
          </View>
        );
      case 'ArrangeWordsToFormSentence':
        return (
          <View>
            {currentTask.words.map((word, index) => (
              <Button key={index} title={word} onPress={() => handleArrange(word)} />
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView>
      <View>
        {renderTask()}
        <View>
          <Button title="Back" onPress={handleBack} disabled={currentTaskIndex === 0} />
          <Button
            title="Next"
            onPress={handleNext}
            disabled={currentTaskIndex === tasks.length - 1}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default TestPage;
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   wordButton: {
//     padding: 10,
//     backgroundColor: 'white',
//     borderRadius: 999,
//     alignItems: 'center',
//     shadowColor: '#5E5DF0',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.5,
//     shadowRadius: 20,
//     marginTop: 20,
//   },
//   wordButtonText: {
//     color: 'black',
//     fontWeight: 'bold',
//   },
//   button: {
//     padding: 10,
//     backgroundColor: '#5E5DF0',
//     borderRadius: 999,
//     width: 100,
//     alignItems: 'center',
//     shadowColor: '#5E5DF0',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.5,
//     shadowRadius: 20,
//     marginTop: 20,
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: '700',
//     lineHeight: 24,
//     color: 'white',
//   },
// });

// const Page: React.FC = () => {
//   const [sentence, setSentence] = useState<string[]>([]);
//   const [words, setWords] = useState<string[]>(['He', 'plays', 'always', 'games', "at 6 o'clock"]);

//   const handleWordSelect = (word: string): void => {
//     setSentence([...sentence, word]);
//     setWords((prevWords) => prevWords.filter((w) => w !== word));
//   };

//   const handleRemoveWord = (word: string): void => {
//     setSentence(sentence.filter((w) => w !== word));
//     setWords([...words, word]);
//   };

//   const handleCheckAnswer = (): void => {
//     const answer = "He always plays games at 6 o'clock";
//     const userSentence = sentence.join(' ');
//     if (userSentence === answer) {
//       alert('Correct!');
//     } else {
//       alert('Incorrect!');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
//         {sentence.map((word, index) => (
//           <TouchableOpacity
//             onPress={() => handleRemoveWord(word)}
//             style={styles.wordButton}
//             key={index}>
//             <Text style={styles.wordButtonText}>{word}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <View
//         style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20 }}>
//         {words.map((word, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => handleWordSelect(word)}
//             style={styles.wordButton}>
//             <Text style={styles.wordButtonText}>{word}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <TouchableOpacity onPress={handleCheckAnswer} style={styles.button}>
//         <Text style={styles.buttonText}>Check</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Page;
