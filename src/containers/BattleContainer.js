import React from "react"
import UserField from "./UserField"
import OpponentField from "./OpponentField"
import battleLogic from "../BattleLogic"
import MessagesContainer from "./MessagesContainer"
import { NavLink } from "react-router-dom"

const opponent_decision = Math.floor(Math.random() * 2) + 1

export default class BattleContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      opponent_action: opponent_decision,
      messages: [],
      battleWon: false,
      battleLost: false
    }
    this.audio = this.props.audio
    this.audio.addEventListener('ended', function () {
      this.currentTime = 0
      this.play()
    }, false)
  }

  decideFirst = data => {
    let userPokemon = this.props.user_pokemon
    if (userPokemon.spd > data.spd) {
      return userPokemon
    } else if (userPokemon.spd < data.spd) {
      return data
    } else {
      const roll = Math.floor(Math.random() * 2) + 1
      return roll === 1 ? userPokemon : data
    }
  }

  battleAction = user_action => {
    let opponent_action = Math.floor(Math.random() * 2) + 1
    let userPokemon = this.props.user_pokemon
    const first = this.decideFirst(this.props.opponent_pokemon)
    const second =
      first === userPokemon ? this.props.opponent_pokemon : userPokemon
    // console.log("Battle Round!")
    this.setState({
      opponent_action,
      messages: [
        ...battleLogic(user_action, opponent_action, userPokemon, first, second)
      ]
    })
  }

  wonBattle = () => {
    this.setState({
      battleWon: true
    })
  }

  lostBattle = () => {
    this.setState({
      battleLost: true
    })
  }

  stopAudio = () => {
    this.audio.pause()
    this.audio.currentTime = 0
  }

  render() {
    console.log(this.props)
    this.audio.play()
    return (
      <>
        <NavLink to="/" className='flex-end quit btn' onClick={() => this.stopAudio()} ><strong>Quit Battle</strong></NavLink>
        <div className="battle-display">
          <UserField
            battleAction={this.battleAction}
            user={true}
            pokemon={this.props.user_pokemon}
          />
          <div className="simple-ai-rendering">
            <OpponentField pokemon={this.props.opponent_pokemon} />
            <MessagesContainer
              user={this.props.user}
              battleWon={this.state.battleWon}
              battleLost={this.state.battleLost}
              lostBattle={this.lostBattle}
              wonBattle={this.wonBattle}
              addLoss={this.props.addLoss}
              addWin={this.props.addWin}
              messages={this.state.messages}
            />
          </div>
          {this.state.battleWon ? (
            <div className='battle-end'>
              <strong>You Won!</strong>
              <br/>
              <NavLink className='endgame center btn' to='/' onClick={() => this.props.addWin(this.props.user, this.props.user_pokemon)}>Back</NavLink>
            </div>
          ) : null}
          {this.state.battleLost ? (
            <div className='battle-end'>
              <strong>You Lost!</strong>
              <br/>
              <NavLink className='endgame center btn' to='/' onClick={() => this.props.addLoss(this.props.user)}>Back</NavLink>
            </div>
          ) : null}
        </div>
      </>
    )
  }
}
