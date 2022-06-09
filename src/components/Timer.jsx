import React, { Component } from 'react';
import styles from './Timer.module.css';
import { Button } from 'react-bootstrap';

class Timer extends Component {
    handleLeft = () => {
        const mode = this.props.mode;
        console.log(mode);
        switch (mode) {
            case 'ready':
                // this.props.timerPlay();
                break;
            case 'play':
            case 'end':
                this.props.timerStop();
                break;
            case 'stop':
                this.props.timerContinue();
                break;

        }
    }
    handleRight = () => {
        const mode = this.props.mode;
        console.log(mode);
        switch (mode) {
            case 'ready':
                this.props.timerPlay();
                break;
            case 'play':
            case 'end':
            case 'stop':
                this.props.timerCancle();
                break;
        }
    }
    render() {
        return (
            <main className={styles.container}>
                <strong className={styles.timer}>
                    {this.props.time.hour < 10 ? `0${this.props.time.hour}` : this.props.time.hour}:
                    {this.props.time.min < 10 ? `0${this.props.time.min}` : this.props.time.min}:
                    {this.props.time.sec < 10 ? `0${this.props.time.sec}` : this.props.time.sec}
                </strong>
                <div className={styles['btn-group']}>
                    {this.props.mode !== 'end' && <Button variant="secondary" className={styles.btn} onClick={this.handleLeft}>
                        {
                            this.props.mode === 'ready' ? '설정' : this.props.mode === 'stop' ? '계속' : '일시정지'
                        }
                    </Button>}
                    <Button variant="danger" className={styles.btn} onClick={this.handleRight}>
                        {
                            this.props.mode === 'ready' ? '시작' : this.props.mode === 'end' ? '확인' : '취소'
                        }
                    </Button>
                </div>
            </main>
        );
    }
}

export default Timer;