import axios from "axios"
import * as types from "./action-types"

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return ({ type: types.MOVE_CLOCKWISE })
 }

export function moveCounterClockwise() { 
  return ({ type: types.MOVE_COUNTERCLOCKWISE})
 }

 export function selectAnswer(id) {
  return ({ type: types.SET_SELECTED_ANSWER, payload: id })
 }

export function setMessage(infoMessage) {
  return ({ type: types.SET_INFO_MESSAGE, payload: infoMessage})
 }

export function setQuiz(quiz) {
  return ({ type: types.SET_QUIZ_INTO_STATE, 
    payload: { quiz_id: quiz.quiz_id, question: quiz.question, 
      answers: [{answer_id: quiz.answers[0].answer_id, text: quiz.answers[0].text},
      {answer_id: quiz.answers[1].answer_id, text: quiz.answers[1].text}] } })
 }

export function inputChange() { }

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios.get('http://localhost:9000/api/quiz/next')
    .then(res => {
      dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: res.data})
    })
    .catch(err => {
      console.error(err)
      debugger
    })
  }
}

export function postAnswer(quiz_id, answer_id) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    dispatch({ type:types.SET_SELECTED_ANSWER, payload: null})

    axios.post('http://localhost:9000/api/quiz/answer', { quiz_id, answer_id })
    .then(res => {
      dispatch({ type: types.SET_INFO_MESSAGE, payload: res.data})
      dispatch(fetchQuiz())
    })
    .catch(err => {
      debugger
    })
  }
}

export function postQuiz(form) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', {question_text: form.newQuestion, true_answer_text: form.newTrueAnswer, false_answer_text: form.newFalseAnswer})
    .then(res => {
      dispatch({ type: types.SET_INFO_MESSAGE, payload: {message: res.statusText}})
      console.log(res.statusText)
    })
    .catch(err => {
      debugger
    })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
