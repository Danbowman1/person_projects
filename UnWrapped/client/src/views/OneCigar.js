import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Header from '../components/NavBar'

const OneCigar = (props) => {

    const {socket} = props
    const {id} = useParams()
    const [cigar, setCigar] = useState({})
    const [messageList, setMessageList] = useState([])
    const [content, setContent] = useState('')

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/cigars/${id}`)
            .then((res)=>{
                console.log(res)
                console.log(res.data)
                setCigar(res.data)
                setMessageList(res.data.messages)
            })
            .catch((err)=>console.log(err))
    }, [])

    const addMessage = (e) => {
        axios.post("http://localhost:8000/api/messages/" + id,
        {
            content,
            associatedCigar: id
        })
        .then((res)=>{
            console.log(res.data)
            setMessageList([ ...messageList, res.data])
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        socket.on("Update_chat_likes", (data) => {
            console.log("our socket updated list", data)
            setMessageList(data)
        })
    }, [])

    const likeMessage = (messageFromBelow) => {
        axios.put(`http://localhost:8000/api/messages/${messageFromBelow._id}`,
            {
                likes: messageFromBelow.likes + 1
            }
        )
        .then((res)=>{
            console.log(res)

            let updatedMessageList = messageList.map((message, index)=>{
                if(message === messageFromBelow) {
                    let messageHolder = { ...res.data }
                    return messageHolder
                }
                return message
            })
            socket.emit("Update_chat", updatedMessageList)
        })
    }

    return (
        <div>
        <Header />
        <div className="mainContainer">
            <div className="singleCigar">
                <h2 className='cigarHeader'>{cigar.cigarName}</h2>
                <p>{cigar.brand}</p>
                <img src={cigar.image} alt="Cigar" className='cigarImg' />
                <div className="cigarReview">
                <p>{cigar.description}</p>
                <p>Rating: {cigar.rating}/5</p>
            </div>
        </div>
        <hr />
        <div className="commentsHeader">
            <h3>Comments</h3>
            <h4>{messageList.length}</h4>
        </div>
        <form className='commentContainer'>
            <textarea name="comments" value={content} className='commentTextarea' onChange={(e)=> setContent(e.target.value)}></textarea>
            <button onClick={addMessage}>Comment</button>
            {
                messageList?
                messageList.map((message, index)=>(
                    <div key={index}>
                        <p>{message.content}</p>
                        <button onClick={() => likeMessage(message)}>Like {message.likes}</button>
                    </div>
                ))
                :null
            }
        </form>
        
        </div>
        
            
        </div>
    )
}

export default OneCigar