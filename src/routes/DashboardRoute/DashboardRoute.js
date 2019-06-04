import React, { Component } from 'react'
import languageService from '../../services/language-service'
import LanguageContext from '../../contexts/LanguageContext'
import { Link } from 'react-router-dom'
import "../../components/App/App.css"

class DashboardRoute extends Component {

  static contextType = LanguageContext;

  componentWillMount() {
    languageService.getLanguageWords()
      .then(language => language.language.name)
      .then(this.context.setLanguage)

    languageService.getLanguageWords()
      .then(language => (language.words))
      .then(this.context.setWords)

      languageService.getLanguageHead()
      .then(totalScore =>  totalScore.totalScore)
      .then(this.context.setTotalScore)

      languageService.getLanguageHead()
      .then(wordCorrectCount =>  wordCorrectCount.wordCorrectCount)
      .then(this.context.setWordCorrectCount)

      languageService.getLanguageHead()
      .then(wordIncorrectCount =>  wordIncorrectCount.wordIncorrectCount)
      .then(this.context.setWordIncorrectCount)
  }

  
  renderWords() {
    let { words = [] } = this.context
    let { wordIncorrectCount, wordCorrectCount } = this.context
    return words.map(word => {
      console.log()
      return <>
        <li>
          <h4>{word.original}</h4>
          correct answer count: {wordCorrectCount}
          incorrect answer count: {wordIncorrectCount}
        </li>
      </>
    }
    )
  }

  render() {
    const subtitle = this.context.language
    let { totalScore } = this.context 
    let words = this.renderWords()
    return (
      <section>
        <h2>{subtitle}</h2>
        <h1 className="dashboardScore">Total correct answers: {totalScore}</h1>
        <h3>Words to practice</h3>
        <ul>{words}</ul>
        <a href='/learn' className="btn">Start practicing</a>
      </section>
    );
  }
}

export default DashboardRoute
