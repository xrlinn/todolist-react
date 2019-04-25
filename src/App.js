import React from 'react';
import Header from './components/Header'
import './index.scss'
import TodoItem from './components/todoItem'
import Footer from './components/footer'

class App extends React.Component {
    constructor(props) {
      super(props)
    
      this.state = {
        arr:[
            {
                text: '学习js',
                isEdit: false,
                isDone: false
            },
            {
                text: '学习高级js',
                isEdit: false,
                isDone: false
            },
            {
                text: '学习react',
                isEdit: false,
                isDone: true
            },
        ],
        status: 1 // 1.显示全部 2.未完成 3.已完成

      };
    };

    changeStatus = (status) => {
        this.setState({
            status
        })
    }

    removeDone = () => {
        let newArr = this.state.arr.filter(item => {// 返回为真的会被保留
            return !item.isDone
        })
        this.setState({
            arr: newArr
        })
    }

    addItem = (item) => {
        let newArr = [...this.state.arr]
        newArr.push(item)
        this.setState({
            arr: newArr
        })
    }

    removeOne = (index) => {
        let newArr = [...this.state.arr]
        newArr.splice(index,1)
        this.setState({
            arr: newArr
        })
    }

    editItem = (index,item) => {
        return new Promise((resolve) => {
            let newArr = [...this.state.arr]
            newArr[index] = item
            this.setState({
            arr: newArr
            },() => {
                resolve()
            })
        })  
    }

    render () {
        const arr = this.state.arr
        const status = this.state.status
        return (
            <div className="App">
                <h1 style={{textAlign:'center'}}>ToDoList</h1> 
                <div className="todo-container">
                    <Header addItem={this.addItem}/>
                    <ul className="todo-box">
                        {
                            // eslint-disable-next-line 
                            arr.map((item,index) => {
                                if (status === 1) {
                                    return <TodoItem item={item} key={index}
                                    index={index}
                                    removeOne={this.removeOne}
                                    editItem={this.editItem}
                                    />
                                } else if (status === 2) {
                                    if (!item.isDone){
                                        return <TodoItem item={item} key={index}
                                    index={index}
                                    removeOne={this.removeOne}
                                    editItem={this.editItem}
                                    />
                                    } else {
                                        return null
                                    }
                                } else if (status === 3) {
                                    if (item.isDone) {
                                        return <TodoItem item={item} key={index}
                                    index={index}
                                    removeOne={this.removeOne}
                                    editItem={this.editItem}
                                    /> 
                                    } else {
                                        return null
                                    }

                                }
                                
                            })
                        }
                    </ul>
                    <Footer changeStatus={this.changeStatus} 
                        arr={arr}
                        removeDone={this.removeDone}
                    />
                </div>
            </div>
        );
    }
    
}

export default App;
