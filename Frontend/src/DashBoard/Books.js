import React from 'react'
import { useState ,useEffect } from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Truncate from './Truncate';
import { current } from '@reduxjs/toolkit';


const Books = ({currentEmotion,preferences}) => {
   
  const [bookdata,setBookdata]=useState([]);
  const [emotion,setEmotion] = useState(currentEmotion)
 
  // useEffect(()=>{
  //   console.log(currentEmotion)
  //   if(currentEmotion)
  //   {
  //     axios.get('https://www.googleapis.com/books/v1/volumes?q=' +currentEmotion + preferences+ '&key=AIzaSyC3wv3am_QyPy6F1db_KI74Bio4WuNkAj4&maxResults=8').then((response)=>{
  //       console.log(response.data.items)
  //       setBookdata(response.data.items)
  //     }).catch(err=>{
  //       console.error(err)
  //     })
  //   }
  // },[currentEmotion])
  
 
  return (
   
      <div className='container'>
         <Row>
          <div className='book_boxes'>
             <div >
                  {
                    bookdata?.length? (
                      bookdata.map ((book)=>{
                          let id = book.id;
                          let title = book.volumeInfo.title;
                          let author = book.volumeInfo.authors;
                          let thumbnil = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail;
                          if(thumbnil !== undefined)
                          {
                            return(
                              <div className='book_card' key={id} onClick={() => window.location.href = 'http://books.google.co.in/books?id=' + id + '&printsec=frontcover&dq=happy&hl=&cd=1&source=gbs_api'}>


                            <img src = {thumbnil} alt=""/> 
                            <div className='bottom'>
                                <Truncate title={title} maxLength={15}/>
                                <Truncate title={author} maxLength={10}/>
                            </div>
                          
                          </div>
                            )

                          }
                       
                        
                      })
                    ):(
                      
                        <div className='loading'>
				            <Spinner animation="border" role="status" ></Spinner>
				              <p>Loading...</p>
				                </div>	
                      
                    )
                  }
             </div>
          </div>
         </Row>
   </div>    
   
  )
}

export default Books