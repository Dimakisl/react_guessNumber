import React from 'react';
import style from './ClassComponent.module.css';

export class ClassComponent extends React.Component {
  state = {
    result: '',
    userNumber: '',
    randomNumber: Math.floor((Math.random() * this.props.max - this.props.min) + this.props.min),
    count: 0,
    repeat: false,
  };


  handleSubmit = e => {
    e.preventDefault();
    this.setState(state => ({
      count: state.count + 1,
    }));

    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: `Введите число!`,
        };
      }
      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
        };
      }
      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
        };
      }
      return {
        result: `Вы угадали загаданное число ${state.userNumber}. Число попыток ${state.count}`,
        repeat: true
      };
    }, () => this.setState({userNumber: ''}));
  };

  handleChange = (e) => {
    this.setState((state, props) => ({
      userNumber: e.target.value,
    }));
  };

  init = () => {
    this.setState({
      result: '',
      userNumber: '',
      randomNumber: Math.floor((Math.random() * this.props.max - this.props.min) + this.props.min),
      count: 0,
      repeat: false,
    });
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>
          <input className={style.input}
            type='number'
            id='user_number'
            onChange={this.handleChange}
            value={this.state.userNumber}
            disabled={this.state.repeat}
          />
          {!this.state.repeat && <button className={style.btn}>Угадать</button>}
          {this.state.repeat && <button className={style.btn} onClick={this.init} type='button'>Повторить игру</button>}
        </form>
      </div>
    );
  }
}
