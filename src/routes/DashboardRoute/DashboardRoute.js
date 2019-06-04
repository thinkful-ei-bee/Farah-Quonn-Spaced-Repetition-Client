import React, { Component } from 'react'
import languageService from '../../services/language-service'
import "../../components/App/App.css"

class DashboardRoute extends Component {
  state = {
    totalScore: 0,
    words: []
  }

  componentWillMount() {
    languageService.getLanguageWords()
      .then(response => {
        this.setState({
         totalScore: response.language.total_score,
         words: response.words
        })
      })
  }

  renderWords() {
    return this.state.words.map((word, i) => {
      return <>
      <ul key={i}>
        <li>
          <h4>{word.original}</h4>
          <p>correct answer count: {word.correct_count}</p>
          <p>incorrect answer count: {word.incorrect_count}</p>
        </li>
      </ul>
      </>
    }
    )
  }

  render() {
    const subtitle = this.context.language
    let totalScore = this.state.totalScore 

    return (
      <section>
        <h2>{subtitle}</h2>
        <h1 className="dashboardScore">Total correct answers: {totalScore}</h1>
        <h3>Words to practice</h3>
        {this.renderWords()}
        <a href='/learn' className="btn">Start practicing</a>
      </section>
    );
  }
}

export default DashboardRoute
