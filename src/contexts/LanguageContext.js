import React, { Component } from 'react'

const LanguageContext = React.createContext({
  language: "",
  words: [],
  totalScore: 0,
  wordCorrectCount: 0,
  wordIncorrectCount: 0,
  setLanguage: () => { },
  setWords: () => { },
  setTotalScore: () => { },
  setWordIncorrectCount: () => { },
  setWordCorrectCount: () => { }
})

export default LanguageContext

export class LanguageProvider extends Component {
  state = {
    language: "",
    words: [],
    totalScore: 0,
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
  };

  setLanguage = language => {
    console.log('Setting Language Context language')
    console.log(language)
    this.setState({ language })
  }
  setWords = words => {
    console.log('Set Words Language Context', words)
    this.setState({ words })
  }
  setTotalScore = totalScore => {
    this.setState({ totalScore })
  }
  setWordIncorrectCount = wordIncorrectCount => {
    console.log("setting incorrect word count")
    this.setState({ wordIncorrectCount })
  }
  setWordCorrectCount = wordCorrectCount => {
    this.setState({ wordCorrectCount })
  }

  render() {
    const value = {
      language: this.state.language,
      setLanguage: this.setLanguage,
      words: this.state.words,
      setWords: this.setWords,
      totalScore: this.state.totalScore,
      wordIncorrectCount: this.state.wordIncorrectCount,
      wordCorrectCount: this.state.wordCorrectCount,
      setTotalScore: this.setTotalScore,
      setWordIncorrectCount: this.setWordIncorrectCount,
      setWordCorrectCount: this.setWordCorrectCount
    }

    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}