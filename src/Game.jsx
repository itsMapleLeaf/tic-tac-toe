import React from 'react'
import Board from './Board'

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default class Game extends React.Component {
  state = {
    history: [{ squares: Array(9).fill('') }],
    currentPlayer: 'X',
    currentStep: 0,
  }

  handleClick(index) {
    const history = this.state.history.slice(0, this.state.currentStep + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (calculateWinner(squares) || squares[index] !== '') return

    squares[index] = this.state.currentPlayer

    this.setState({
      history: history.concat([{ squares }]),
      currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X',
      currentStep: history.length,
    })
  }

  jumpTo(step) {
    this.setState({
      currentStep: step,
      currentPlayer: step % 2 === 0 ? 'X' : 'O',
    })
  }

  render() {
    const { history, currentStep } = this.state
    const currentBoard = history[currentStep]
    const winner = calculateWinner(currentBoard.squares)
    const status = winner ? 'Winner: ' + winner : 'Next player: ' + this.state.currentPlayer

    const moves = history.map((step, move) => {
      const desc = move > 0 ? 'Move #' + move : 'Game Start'
      const isCurrentStep = move === currentStep
      const style = { fontWeight: isCurrentStep ? 'bold' : 'normal' }

      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)} style={style}>
            {desc}
          </a>
        </li>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={currentBoard.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>
            {status}
          </div>
          <ol>
            {moves}
          </ol>
        </div>
      </div>
    )
  }
}
