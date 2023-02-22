import React from 'react'
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({todo, onRemove, onToggle})=> {

  const {id, text, checked} = todo;

  return (
    <div className='TodoListItem'>
      <div className={cn('checkbox', {checked})} onClick={()=> onToggle(id)}>
        {checked ? <MdCheckBox/> : <MdCheckBoxOutlineBlank />}
        <div className='text'>{text}</div>
      </div>
      <div className='remove' onClick={()=> onRemove(id)}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

//React.memo를 사용해서 컴포넌트의 props가 바뀌지 않았다며, 리렌더링하지 않도록 설정해줌
export default React.memo(TodoListItem);
