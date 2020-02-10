## react

- TodoList

```
TodoList.jsx
============
import React, {Component} from "react";
import TodoItems from './TodoItems';
import "./css/TodoList.css"

class TodoList extends Component {
    state={
        items:[]
    }
    deleteItem=(key)=>{
        const filteredItems=this.state.items.filter((item)=>{
           return item.key!== key
        });
        this.setState({
            items:filteredItems
        })
    }
    addItem=()=>{
        this.state.items.unshift({
            text:this._inputElement.value,
            key: Date.now()
        })
        this.setState({
            items: this.state.items
        })
        this._inputElement.value=""
        this._inputElement.focus();

        console.log(this.state.items)
    }
    
    render(){
        return(
            <div className="todoListMain">
                <div className="header">
                    <input ref={ref=>this._inputElement=ref}placeholder='enter task'></input>
                    <button onClick={this.addItem}>add</button>
                </div>
                <TodoItems entries={this.state.items} superDelete={this.deleteItem} />
            </div>
        );
    }
}

export default TodoList;
```

```
TodoItem.jsx
============

import React, {Component} from "react";
import "./css/TodoList.css"

class TodoItems extends Component{
    /* subDelete=(key)=>{
        this.props.superDelete(key);
    } */
    
    render(){

        const listItems=this.props.entries.map((item)=>
        {
            return <li key={item.key} onClick={this.probs.superDelete.bind(null, item.key) }>{item.text}</li>
        });
        return(
            <ul className="theList">
                {listItems}
            </ul>
        )
    }
} 

export default TodoItems;
```

