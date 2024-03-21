// import { useGlobalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//     width: '100%',
//   },
//   wordList: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   word: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     margin: 5,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
//   button: {
//     padding: 10,
//     backgroundColor: 'blue',
//     borderRadius: 5,
//     marginVertical: 10,
//   },
//   buttonText: {
//     color: 'white',
//     textAlign: 'center',
//   },
//   option: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginBottom: 10,
//   },
// });

// const tasks = [
//   { type: 'wordSelection', words: ['Hello', 'world', 'React', 'Native', 'Duolingo'] },
//   { type: 'wordSelection', words: ['This', 'is', 'a', 'test'] },
//   {
//     type: 'quiz',
//     question: 'What is the capital of France?',
//     options: ['London', 'Paris', 'Berlin'],
//     answer: 'Paris',
//   },
//   { type: 'quiz', question: 'What is 2 + 2?', options: ['3', '4', '5'], answer: '4' },
// ];

// const Page: React.FC = () => {
//   const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState<string[]>([]);
//   console.log(userAnswers);

//   const handleWordSelect = (word: string): void => {
//     setUserAnswers([...userAnswers, word]);
//     const currentTask = tasks[currentTaskIndex];
//     if (currentTask !== null && currentTask !== undefined) {
//       currentTask.words = currentTask.words.filter((w) => w !== word);
//     }
//   };
//   const handleAnswerSelect = (option: string): void => {
//     const currentTask = tasks[currentTaskIndex];
//     if (option === currentTask.answer) {
//       setUserAnswers([...userAnswers, option]);
//     }
//   };

//   const handleNext = (): void => {
//     if (currentTaskIndex < tasks.length - 1) {
//       setCurrentTaskIndex(currentTaskIndex + 1);
//     }
//   };

//   const renderWordSelectionTask = (): JSX.Element => {
//     const words = tasks[currentTaskIndex].words;
//     return (
//       <View style={styles.container}>
//         <TextInput style={styles.input} value={userAnswers.join(' ')} editable={false} />
//         <View style={styles.wordList}>
//           {words.map((word) => (
//             <TouchableOpacity key={word} onPress={() => handleWordSelect(word)}>
//               <Text style={styles.word}>{word}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//         <TouchableOpacity style={styles.button} onPress={handleNext}>
//           <Text style={styles.buttonText}>Next</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   const renderQuizTask = (): JSX.Element => {
//     const { question, options } = tasks[currentTaskIndex];
//     return (
//       <View style={styles.container}>
//         <Text>{question}</Text>
//         {options.map((option) => (
//           <TouchableOpacity
//             key={option}
//             style={styles.option}
//             onPress={() => handleAnswerSelect(option)}>
//             <Text>{option}</Text>
//           </TouchableOpacity>
//         ))}
//         <TouchableOpacity style={styles.button} onPress={handleNext}>
//           <Text style={styles.buttonText}>Next</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   const renderTask = (): JSX.Element => {
//     const task = tasks[currentTaskIndex];
//     if (task.type === 'wordSelection') {
//       return renderWordSelectionTask();
//     } else if (task.type === 'quiz') {
//       return renderQuizTask();
//     }
//     return <></>;
//   };

//   return <View style={styles.container}>{renderTask()}</View>;
// };

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
});

const Page: React.FC = () => {
  const [sentence, setSentence] = useState<string[]>([]);
  const [words, setWords] = useState<string[]>(['He', 'plays', 'always', 'games', "at 6 o'clock"]);

  const handleWordSelect = (word: string): void => {
    setSentence([...sentence, word]);
    setWords((prevWords) => prevWords.filter((w) => w !== word));
  };

  const handleRemoveWord = (word: string): void => {
    setSentence(sentence.filter((w) => w !== word));
    setWords([...words, word]);
  };

  const handleCheckAnswer = (): void => {
    const answer = "He always plays games at 6 o'clock";
    const userSentence = sentence.join(' ');
    if (userSentence === answer) {
      alert('Correct!');
    } else {
      alert('Incorrect!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {sentence.map((word, index) => (
          <TouchableOpacity
            onPress={() => handleRemoveWord(word)}
            style={styles.wordButton}
            key={index}>
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
      <TouchableOpacity onPress={handleCheckAnswer} style={styles.button}>
        <Text style={styles.buttonText}>Check</Text>
      </TouchableOpacity>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 20,
//     width: '80%',
//   },
//   wordList: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//   },
//   word: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     margin: 5,
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
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: '700',
//     lineHeight: 24,
//     color: 'white',
//   },
// });
//   const searchParams = useGlobalSearchParams();
//   console.log(searchParams);
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);

//   const handleOptionSelect = (option: string): void => {
//     setSelectedOption(option);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Grammar Test</Text>
//       </View>
//       <View style={styles.questionContainer}>
//         <Text style={styles.questionText}>What is the past tense of 'go'?</Text>
//         <TouchableOpacity
//           style={[styles.option, selectedOption === 'went' && styles.selectedOption]}
//           onPress={() => handleOptionSelect('went')}>
//           <Text style={styles.optionText}>A) went</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.option, selectedOption === 'gone' && styles.selectedOption]}
//           onPress={() => handleOptionSelect('gone')}>
//           <Text style={styles.optionText}>B) gone</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.option, selectedOption === 'goed' && styles.selectedOption]}
//           onPress={() => handleOptionSelect('goed')}>
//           <Text style={styles.optionText}>C) goed</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Previous</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Next</Text>
//         </TouchableOpacity>
//       </View>
//       <Text>This is task/index page.</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   header: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     width: '100%',
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   questionContainer: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   questionText: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
//   option: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//     width: '80%',
//     alignItems: 'center',
//   },
//   selectedOption: {
//     backgroundColor: '#ccc',
//   },
//   optionText: {
//     fontSize: 16,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//     width: '80%',
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 10,
//     borderRadius: 5,
//     width: '48%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

export default Page;
