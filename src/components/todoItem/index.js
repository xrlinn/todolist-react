import React, { Component } from 'react'

export class TodoItem extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            text: 'todo内容',
            isEdit: false,
            isDone: false,
        }
    }

    handleChange = (e) => {
        // console.log(e.target.checked)
        const value = e.target.type === 'checkbox'? e.target.checked: e.target.value
        // this.setState({
        //     [e.target.name]: value
        // })
        const {editItem,index,item} = this.props
        const items = {
            ...item,
            [e.target.name]: value
        }
        editItem(index, items)
    }

    handleDoubleClick = () => {

        // this.setState({
        //     isEdit: true
        // },() => {
        //     this.refs.editor.focus()
        //     this.refs.editor.value = this.state.text
        // })
        const {editItem,index,item} = this.props
        const items ={
            ...item,
            isEdit: true
        }
        editItem(index,items).then(() => {
            this.refs.editor.focus()
            this.refs.editor.value = item.text
        })

    }

    handleBlur = () => {
        this.props.editItem(this.props.index,{
            ...this.props.item,
            isEdit: false
        })
    }
    
    render() {
        const {item,index} = this.props
        // const _this = this
        const isShowEdit = () => {
            if (!item.isEdit) {
                return (
                    <div className="todo-item-body">
                        <input type="checkbox" name="isDone" value={item
                        .isDone} onChange={this.handleChange}
                            checked={item.isDone}
                        />
                        <span className={
                            item.isDone? 'isDone':null
                        }
                        onDoubleClick = {this.handleDoubleClick}
                        >{item.text}</span>
                        <button onClick={() => {
                        this.props.removeOne(index)}}
                        >删除该todo</button>
                    </div>
                )
            } else {
                return (
                    <div className="todo-item-editor">
                        <input type="text"  ref="editor" name="text" 
                        onChange={this.handleChange}
                        onBlur= {this.handleBlur}
                        />
                    </div>
                )
            }
        }
      return (
        <li className="todo-item">
            {
                isShowEdit()
            }
        </li>
      )
    }
}

export default TodoItem
