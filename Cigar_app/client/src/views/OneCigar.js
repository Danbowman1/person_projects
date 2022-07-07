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
        const cigarGetter = async () =>{
            try {
                const res = await axios.get(`http://localhost:8000/api/cigars/${id}`)
                    console.log(res)
                    console.log(res.data)
                    setCigar(res.data)
                    setMessageList(res.data.messages)
                } catch (err){
                    console.log(err)
                }
        }
        cigarGetter()
    }, [id])
        

    const addAMessage = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:8000/api/messages/" + id,
                {
                    content, 
                    associatedCigar: id
                })
                    console.log(res.data);
                    setMessageList([...messageList, res.data  ])
                    setContent('')
        }catch(err) {
            console.log(err);
        }
                
            }
    

    useEffect(() => {
        socket.on("Update_chat_likes", (data) => {
            console.log("our socket updated list", data)
            setMessageList(data)
        })
    }, [])

    const likeMessage = (messageFromBelow, e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/messages/${messageFromBelow._id}`,
            {
                likes: messageFromBelow.likes + 1
            }
        )
            .then((res) => {
                console.log(res.data);

                let updatedMessageList = messageList.map((message, index) => {
                    if (message === messageFromBelow) {
                        let messageHolder = { ...res.data };
                        return messageHolder;
                    }
                    return message;
                });
                
                socket.emit("Update_chat", updatedMessageList)
            })
    }

    return (
        <div>
        <Header />
            <div className="mainContainer">
                <div className="displayOneCigar ">
                    <img src={cigar.image} alt="Cigar" className='cigarImg' />
                    <h2 className='cigarHeader'>{cigar.cigarName}</h2>
                    <p>{cigar.brand}</p>
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
                <button onClick={addAMessage} className='commentBtn'>Comment</button>
                {
                    messageList?
                    messageList.map((message, index)=>(
                        <div key={index} className="singleComment">
                            <p>{message.content}</p>
                            <button onClick={(e) => likeMessage(message, e)} className="likeBtn">Like {message.likes}</button>
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