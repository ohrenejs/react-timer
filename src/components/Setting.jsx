import React, { Component } from 'react';

class Setting extends Component {
    handleSetting = (e) => {
        e.preventDefault();
        this.props.settingTime();
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSetting}>
                    <input ref={this.props.hourRef} type="number" min="0" max="99" />
                    <input ref={this.props.minRef} type="number" min="0" max="59" />
                    <input ref={this.props.secRef} type="number" min="0" max="59" />
                    <button type='submit'>설정</button>
                    <button type='button'>취소</button>
                </form>
            </div>
        );
    }
}

export default Setting;