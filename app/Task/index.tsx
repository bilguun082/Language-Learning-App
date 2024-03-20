import { useGlobalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const Page: React.FC = () => {
  //   const [inputValue, setInputValue] = useState('');
  //   const [words, setWords] = useState(['Hello', 'world', 'React', 'Native', 'Duolingo']);

  //   const handleWordSelect = (word: string): void => {
  //     setInputValue((prevValue) => prevValue + (prevValue ? ' ' : '') + word);
  //     setWords((prevWords) => prevWords.filter((w) => w !== word));
  //   };

  //   return (
  //     <View style={styles.container}>
  //       <TextInput
  //         style={styles.input}
  //         value={inputValue}
  //         onChangeText={(text) => setInputValue(text)}
  //         placeholder="Tap words below to add to sentence"
  //       />
  //       <View style={styles.wordList}>
  //         {words.map((word) => (
  //           <TouchableOpacity key={word} onPress={() => handleWordSelect(word)}>
  //             <Text style={styles.word}>{word}</Text>
  //           </TouchableOpacity>
  //         ))}
  //       </View>
  //     </View>
  //   );
  // };

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
  // });
  const searchParams = useGlobalSearchParams();
  console.log(searchParams);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string): void => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Grammar Test</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>What is the past tense of 'go'?</Text>
        <TouchableOpacity
          style={[styles.option, selectedOption === 'went' && styles.selectedOption]}
          onPress={() => handleOptionSelect('went')}>
          <Text style={styles.optionText}>A) went</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, selectedOption === 'gone' && styles.selectedOption]}
          onPress={() => handleOptionSelect('gone')}>
          <Text style={styles.optionText}>B) gone</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, selectedOption === 'goed' && styles.selectedOption]}
          onPress={() => handleOptionSelect('goed')}>
          <Text style={styles.optionText}>C) goed</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
      <Text>This is task/index page.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  questionContainer: {
    padding: 20,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
  },
  option: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '80%',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Page;
