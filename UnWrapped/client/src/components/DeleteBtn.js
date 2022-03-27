import React from 'react'

const DeleteBtn = (props) => {

    const {deleteCallBack} = props

    return (
        <div>
        <button onClick={deleteCallBack}>Delete Post</button>
        </div>
    )
}

export default DeleteBtn