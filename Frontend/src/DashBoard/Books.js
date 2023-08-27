import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Truncate from "./Truncate";

const Books = ({ currentEmotion, preferences }) => {
  const [bookdata, setBookdata] = useState([]);
  const [err, setErr] = useState()

  // const booksId = [
  //   {
  //     accessInfo: [Object],
  //     etag: 'Ch6vg2oYHas',
  //     id: 'Qnko2cG8YNIC',
  //     kind: 'books#volume',
  //     saleInfo: [Object],
  //     searchInfo: [Object],
  //     selfLink: 'https://books.googleapis.com/books/v1/volumes/Qnko2cG8YNIC',
  //     volumeInfo: [Object]
  //   },
  //   {
  //     accessInfo: [Object],
  //     etag: 'QzbKyaIlxjo',
  //     id: 'xps7AQAAMAAJ',
  //     kind: 'books#volume',
  //     saleInfo: [Object],
  //     searchInfo: [Object],
  //     selfLink: 'https://books.googleapis.com/books/v1/volumes/xps7AQAAMAAJ',
  //     volumeInfo: [Object]
  //   },
  //   {
  //     accessInfo: [Object],
  //     etag: 'AKXKFcc4ifQ',
  //     id: '-zgmAQAAIAAJ',
  //     kind: 'books#volume',
  //     saleInfo: [Object],
  //     searchInfo: [Object],
  //     selfLink: 'https://books.googleapis.com/books/v1/volumes/-zgmAQAAIAAJ',
  //     volumeInfo: [Object]
  //   },
  //   {
  //     accessInfo: [Object],
  //     etag: 'URTI9Od3uWE',
  //     id: 'CxuQAAAAMAAJ',
  //     kind: 'books#volume',
  //     saleInfo: [Object],
  //     searchInfo: [Object],
  //     selfLink: 'https://books.googleapis.com/books/v1/volumes/CxuQAAAAMAAJ',
  //     volumeInfo: [Object]
  //   },
  //   {
  //     accessInfo: [Object],
  //     etag: 'XEuKwIs+eSM',
  //     id: 'yHXfAAAAMAAJ',
  //     kind: 'books#volume',
  //     saleInfo: [Object],
  //     searchInfo: [Object],
  //     selfLink: 'https://books.googleapis.com/books/v1/volumes/yHXfAAAAMAAJ',
  //     volumeInfo: [Object]
  //   },
  //   {
  //     accessInfo: [Object],
  //     etag: 'uqpTM+XVeRM',
  //     id: '4f3fEbgQW8AC',
  //     kind: 'books#volume',
  //     saleInfo: [Object],
  //     searchInfo: [Object],
  //     selfLink: 'https://books.googleapis.com/books/v1/volumes/4f3fEbgQW8AC',
  //     volumeInfo: [Object]
  //   }
  // ]
  // useEffect(() => {
  //   console.log(currentEmotion);
  //   axios
  //     .get(
  //       "https://www.googleapis.com/books/v1/volumes?q=currentEmotion&key=AIzaSyC3wv3am_QyPy6F1db_KI74Bio4WuNkAj4&maxResults=8"
  //     )
  //     .then((response) => {
  //       console.log(response.data.items);
  //       setBookdata(response.data.items);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  const bookFetch = () => {
    axios.post('http://localhost:3500/content/books', {currentEmotion:currentEmotion, preferences:preferences})
    .then(response=>{
      setBookdata(response.data.books)
    }).catch(error=>{
      console.error("Error fetching books: " + error)
      setErr(error)
    }
    )
  }
  useEffect(()=>{
    bookFetch()
  },[err])

  return (
    <div className="books">
      <div className="container">
        <Row>
          <div className="book_boxes">
            <div>
              {bookdata?.length > 0 ? (
                bookdata.map((book) => {
                  let title = book.volumeInfo.title;
                  let author = book.volumeInfo.authors;
                  let bookId = book.id
                  {console.log(title, author, bookId)}
                  let thumbnail =
                    book.volumeInfo.imageLinks &&
                    book.volumeInfo.imageLinks.smallThumbnail;
                  if (thumbnail !== undefined && title !== undefined && author !== undefined && bookId !== undefined) {
                    return (
                      <div
                        className="book_card"
                        onClick={() =>
                          (window.location.href =
                            `http://books.google.co.in/books?id=${bookId}&printsec=frontcover&hl=&cd=1&source=gbs_api`)
                        }
                      >
                        <img src={thumbnail} alt="" />
                        <div className="bottom">
                          <Truncate title={title} maxLength={15} />
                          <Truncate title={author} maxLength={10} />
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <div className="loading">
                  <Spinner animation="border" role="status"></Spinner>
                  <p>Loading...</p>
                </div>
              )}
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default Books;
