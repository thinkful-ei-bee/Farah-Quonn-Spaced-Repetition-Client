import React, { Component } from 'react'
import languageService from '../../services/language-service'
import {Link} from 'react-router-dom'
import "../../components/App/App.css"

class DashboardRoute extends Component {
  state = {
    totalScore: 0,
    words: [],
    language: ''
  }

  componentWillMount() {
    languageService.getLanguageWords()
      .then(response => {
        this.setState({
         totalScore: response.language.total_score,
         words: response.words,
         language: response.language.name
        })
      })
  }

  renderWords() {
    let words = this.state.words.map((word, i) =>
      <ul key={i}>
        <li>
          <h4>{word.original}</h4>
          <p>correct answer count: {word.correct_count}</p>
          <p>incorrect answer count: {word.incorrect_count}</p>
        </li>
      </ul>
    )
    return words;
  }

  render() {
    const subtitle = this.state.language
    let totalScore = this.state.totalScore 

    return (
      <section>
        <div className='dashboard'>
          <div className="words-box">
            <h1>{subtitle}</h1>
            <h2 className="dashboardScore">Total correct answers: {totalScore}</h2>
            
            <h3>Words to practice</h3>
            
            <div className="dashboard-words">
              {this.renderWords()}
            </div>

            <div className="learn-btn">
              <Link to="/learn" className="btn">Start practicing</Link>
            </div>
          </div>


        </div>
      </section>
    );
  }
}

export default DashboardRoute
