import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Component, createRef } from 'react';
import Timer from './components/Timer';
import alarm from './audios/alarm.mp3';
import Setting from './components/Setting';

class App extends Component {
  state = {
    time: { hour: 0, min: 0, sec: 0, total: 150 },
    handleTimer: '',
    mode: 'ready',
    originalTime: {},
    nowTime: '',
    finishTime: '',
  }
  hourRef = createRef();
  minRef = createRef();
  secRef = createRef();
  audioAlarm = new Audio(alarm);
  componentDidMount() {
    this.timePrint(1);
  }
  timePrint = (check) => {
    const time = check ? { ...this.state.time } : { ...this.state.time, total: (this.state.time.total / 1000) };
    time.hour = Math.floor(time.total / 3600);
    time.min = Math.floor((time.total % 3600) / 60);
    time.sec = Math.floor((time.total % 3600) % 60);
    this.setState({ time });
  }

  timerPlay = () => {
    // setInterval(() => {
    //   console.log(Date.now());
    // }, 1000)
    this.setState((state) => {
      state.nowTime = Date.now();
      state.finishTime = state.nowTime + (state.time.total * 1000);
      state.originalTime = { ...this.state.time };
      // console.log(`원본 : ${this.state.originalTime.hour} : ${this.state.originalTime.min} : ${this.state.originalTime.sec}`);

    }, () => {
      console.log(`finishTime : ${this.state.finishTime}`);
      console.log(`nowTime : ${this.state.nowTime}`);
      this.timerCalculate();
    });
  }
  timerContinue = () => {
    this.setState({ mode: 'play' });
    this.timerCalculate();
  }
  timerCalculate = () => {
    this.setState({
      handleTimer: setInterval(() => {
        if (this.state.nowTime >= this.state.finishTime) {
          console.log(`nowTime : ${this.state.nowTime}`);
          console.log(`finishTime : ${this.state.finishTime}`);
          this.setState({ mode: 'end', time: { ...this.state.time, total: 0 } }, () => {
            this.audioAlarm.currentTime = 0;
            this.audioAlarm.play();
            this.timePrint(1);
            clearInterval(this.state.handleTimer);
          });
        } else {
          this.setState({ mode: 'play', nowTime: Date.now() }, () => {
            this.setState({ time: { ...this.state.time, total: this.state.finishTime - this.state.nowTime } }, () => {
              if (this.state.time.total >= 0) {
                this.timePrint();
              }
            });
          });
        }
      }, 1000)
    })
  }
  timerStop = () => {
    this.setState({ mode: 'stop' });
    clearInterval(this.state.handleTimer);
  }
  timerCancle = () => {
    this.timerStop();
    // this.setState((state) => {
    //   return { time: { ...state.originalTime }, mode: 'ready' };
    // });
    this.setState({ time: { ...this.state.originalTime }, mode: 'ready' }, () => {
      this.audioAlarm.pause();
      this.timePrint(1);
    });
  }
  settingTime = () => {
    const hour = Number(this.hourRef.current.value);
    const min = Number(this.minRef.current.value);
    const sec = Number(this.secRef.current.value);
    console.log(`${hour} : ${min} : ${sec}`);
    const total = (hour * 3600) + (min * 60) + sec;
    console.log(total);
    const time = { ...this.state.time, total };
    this.setState({ time }, () => {
      this.timePrint(1);
    });
  }
  render() {
    return (
      <div className="App">
        <Timer
          time={this.state.time}
          mode={this.state.mode}
          timerPlay={this.timerPlay}
          timerStop={this.timerStop}
          timerContinue={this.timerContinue}
          timerCancle={this.timerCancle}></Timer>
        <Setting
          hourRef={this.hourRef}
          minRef={this.minRef}
          secRef={this.secRef}
          settingTime={this.settingTime}
        ></Setting>
      </div>
    );
  }
}

export default App;
