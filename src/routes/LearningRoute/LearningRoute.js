import React, { Component } from 'react'
import LanguageService from '../../services/language-service'
import { Input, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import "../../components/App/App.css"

class LearningRoute extends Component {
  state = {
    guess: '',
    currentWord: '',
    nextWord: '',
    correctAnswer: '', 
    totalScore: 0,
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    isCorrect: null,
    hasAnswered: false,
  }

  componentDidMount() {
    LanguageService.getLanguageHead()
      .then(response => {
        this.setState({
          currentWord: response.nextWord,
          wordCorrectCount: response.wordCorrectCount,
          wordIncorrectCount: response.wordIncorrectCount,
          totalScore: response.totalScore,
        })
      })
  }

  handleSubmitButton = (e) =>{
    e.preventDefault()
    this.setState({
      hasAnswered: true
    })

    LanguageService.postGuess(this.state.guess)
      .then(response => {
        if(response.isCorrect) {
          this.setState({
            correctAnswer: response.answer,
            wordCorrectCount: this.state.wordCorrectCount + 1,
            totalScore: response.totalScore,
            isCorrect: true,
          })
        } else {
          this.setState({
            correctAnswer: response.answer,
            wordIncorrectCount: this.state.wordIncorrectCount + 1,
            isCorrect: false,
          })
        }
      }) 
  }

  handleNextWordButton = (e) => {
    e.preventDefault()
    this.setState({
      hasAnswered: false,
      isCorrect: null
    })
    LanguageService.getLanguageHead()
      .then(response => {
        this.setState({
          currentWord: response.nextWord,
          wordCorrectCount: response.wordCorrectCount,
          wordIncorrectCount: response.wordIncorrectCount,
          totalScore: response.totalScore,
        })
      })
  }

  trackUserInput = (e) => {
    this.setState({ 
      guess: e.target.value 
    })
  }

  displayForm() {
    if (!this.state.hasAnswered) {
      return (
      <fieldset>
        <form onSubmit={this.handleSubmitButton}> 
          <Label htmlFor='learn-guess-input'>
              What's the translation for this word?
          </Label>
          <Input type='text' id='learn-guess-input' name='guess_input' 
          onChange={this.trackUserInput} required></Input>
          <Button type="submit" className="btn">Submit your answer</Button>
        </form>
      </fieldset>
      )
    } else {
      return (
        <Button type="click" onClick={this.handleNextWordButton} className="btn">Try another word!</Button>
      )
    }
  }

  displayFeedbackMessage() {
    if(this.state.isCorrect === true) {
      return ( 
        <>
          <h2>You were correct! :D</h2>
          <p>The correct translation for {this.state.currentWord} was {this.state.correctAnswer} and you chose {this.state.guess}!</p>
        </>
        )
    }
    if(this.state.isCorrect === false){
      return (
        <>
          <h2>Good try, but not quite right :(</h2>
          <p>The correct translation for {this.state.currentWord} was {this.state.correctAnswer} and you chose {this.state.guess}!</p>
        </>
          )
    }
  }

  render(){
    let header = (this.state.hasAnswered) ?
      <div className="DisplayFeedback">
        {this.displayFeedbackMessage()}
      </div>
      :
      <>
      <h2>Translate the word:</h2>
      <span>{this.state.currentWord}</span>  
      </>

    return(
      <div>
        <main className="learning-route" role="main">
          <article className="translateWord">
            {header}
          </article>

          <div className="answerForm">
            {this.displayForm()} 
          </div> 

          <div className="DisplayScore">
            <p>Your total score is: {this.state.totalScore}</p>
          </div>

          <div className="score-info">
            <p>You have answered this word correctly {this.state.wordCorrectCount} times.</p>
            <p>You have answered this word incorrectly {this.state.wordIncorrectCount} times.</p>
          </div>
        </main>
      </div>
    )
  }
}

export default LearningRoute

