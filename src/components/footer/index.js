import React, { Component } from 'react'

export class Footer extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      };
    };

    handleChange = (num) => {
        this.props.changeStatus(num)
    }
    
    render() {
        const arr = this.props.arr;
        let num = 0
        const arrDone = arr.filter(item => {
            return item.isDone
        })
        // eslint-disable-next-line 
        arr.map(item => {
            if (!item.isDone){
                num++
            }
        })
        return (
            <div className="todo-footer">
                <span>
                    剩余{num}项未完成
                </span>
                <button onClick={() => {
                    this.handleChange(1)
                }}>全部</button>
                <button onClick={() => {
                    this.handleChange(2)
                }}>未完成</button>
                <button onClick={() => {
                    this.handleChange(3)
                }}>已完成</button>
                {
                    arrDone.length > 0? <button onClick={() => {
                        this.props.removeDone()
                    }}>清除已完成</button> : null
                }
                
            </div>
        )
    }
}

export default Footer
