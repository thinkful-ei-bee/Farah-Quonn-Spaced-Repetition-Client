import React, { Component } from 'react'
import LanguageService from '../../services/language-service'
import { Input, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'

class LearningRoute extends Component {
  state = {
    nextWord: '',
    haveSubmittedAnswer: null,
    lastWord: '',
    wordCorrectCount: null,
    wordIncorrectCount: null,
    lastWordCorrectCount: null,
    lastWordIncorrectCount: null,
    totalScore: null,
    guess: '',
    correctGuess: 0,
    isCorrect: null,
    translatedWord: true,
  }

  componentDidMount() {
    LanguageService.getLanguageHead()
      .then(response => {
        this.setState({
          nextWord: response.nextWord,
          lastWord: response.nextWord,
          wordCorrectCount: response.wordCorrectCount,
          wordIncorrectCount: response.wordIncorrectCount,
          totalScore: response.totalScore,
          guess: '',
          correctGuess: 0,
          isCorrect: null,
        })
      })
  }
  
  handleSubmitAnswer(event) {
    event.preventDefault()
    this.setState({
      translatedWord: false,
    })

    if (this.state.isCorrect !== null) {
      this.setState({
        haveSubmittedAnswer: null,
        lastWord: this.state.nextWord,
        guess: '',
        correctGuess: 0,
        isCorrect: null,
      })

      return;
    }
    this.postGuess();
}

  handleNextWordButton = (e) => {
    e.preventDefault();
    this.setState({ 
      translatedWord: true,
      guess: ''
    })
  }


postGuess() {
  LanguageService.postGuess(this.state.guess)
      .then(response => {
        console.log(response)
        console.log(this.state.translatedWord)
        if (response.isCorrect) {
          
          this.setState({
            nextWord: response.nextWord,
            haveSubmittedAnswer: response.answer,
            lastWordCorrectCount: this.state.wordCorrectCount + 1,
            lastWordIncorrectCount: this.state.wordIncorrectCount,
            wordCorrectCount: response.wordCorrectCount,
            wordIncorrectCount: response.wordIncorrectCount,
            totalScore: response.totalScore,
            correctGuess: true,
            isCorrect: response.isCorrect,
          })
          return;
        }
        else {
          this.setState({
            nextWord: response.nextWord,
            haveSubmittedAnswer: response.answer,
            lastWordCorrectCount: this.state.wordCorrectCount,
            lastWordIncorrectCount: this.state.wordIncorrectCount + 1,
            wordCorrectCount: response.wordCorrectCount,
            wordIncorrectCount: response.wordIncorrectCount,
            totalScore: response.totalScore,
            correctGuess: false,
            isCorrect: response.isCorrect,
          })
          return;
        }
      })
  }
  
  handleChangeAnswer = (guess) => {
    this.setState({ guess: guess.target.value })
  }

  displayWord() {
      const word =
      <>
        <h2 className="translateWord">Translate the word:</h2>
        <span>{this.state.lastWord}</span>
      </>
      return word;
  }
  displayFeedbackMessage() { 
      if (this.state.isCorrect === true) { return <h2>You were correct! :D</h2>}
      if (this.state.isCorrect === false) { return <h2>Good try, but not quite right :(</h2> }
      if (this.state.isCorrect === null) { return ''}
  }
  displayHeaderMessage() {
    let headerMessage = (this.state.translatedWord) ?
      this.displayWord() :
      <div className="DisplayFeedback">
        {this.displayFeedbackMessage()}
        <p>The correct translation for {this.state.nextWord} was {this.state.correctAnswer} and you chose {this.state.guess}!</p>
      </div>
      

    return headerMessage;
  }

  displayForm() {
    return (
      <form className='main_form' onSubmit={(event) => this.handleSubmitAnswer(event)}>
      <Label htmlFor='learn-guess-input' className="translation-label">
        What's the translation for this word?
      </Label>
      <Input
        className="translation-input"
        ref={this.firstInput}
        id='learn-guess-input'
        name='learn-guess-input'
        value={this.state.guess}
        onChange={e => this.handleChangeAnswer(e)}
        required
      />
      <Button type='submit' className="btn">
        Submit your answer
      </Button>
    </form>
    )
  }

  toggleButtonsAndForm(){
    let displayForm = 
    (this.state.translatedWord === true) ? 
      this.displayForm()
    : <Button type="button" className="btn" onClick={this.handleNextWordButton}>
        Try another word!
      </Button> ;

    return displayForm;
  }

  render() {
    return (

      <section className='learn-section'>
        <h2>
          {this.displayHeaderMessage() }
        </h2>

          {this.toggleButtonsAndForm()}

        <div className='DisplayScore'>
          <p>
            {`Your total score is: ${this.state.totalScore}`}
          </p>
        </div>

        <div className='DisplayFeedback'>
          <p>{this.state.answer && `The correct translation for ${this.state.lastWord} was ${this.state.answer} and you chose ${this.state.guess}!`}</p>
        </div>

        <div >
          <p>You have answered this word correctly {this.state.wordCorrectCount} times.</p>
          <p>You have answered this word incorrectly {this.state.wordIncorrectCount} times.</p>
        </div>
       
      </section>
    );
  }
}
export default LearningRoute