import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  FormGroup,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faKey,
  faBox,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";
import { FormLabel } from "react-bootstrap";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import Preference from "./Preference";
import { Box } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { _id, name } = location.state || {};

  const [email, setEmail] = useState("");
  const [username, setName] = useState(name);
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [relation1, setRelation1] = useState("");
  const [alertRecipient1, setAlertRecipient1] = useState("");
  const [relation2, setRelation2] = useState("");
  const [alertRecipient2, setAlertRecipient2] = useState("");

  const [video, setVideo] = useState(false);
  const [music, setMusic] = useState(false);
  const [books, setBooks] = useState(false);

  const [videoCategories, setVideoCategories] = useState([]);
  const [musicCategories, setMusicCategories] = useState([]);
  const [booksCategories, setBooksCategories] = useState([]);

  // useEffect(()=>{
  //   axios.post('http://localhost:3500/user/login',
  // },[_id])

  const [checked_video, setChecked_video] = useState({
    cats: false,
    dogs: false,
  });

  const [checked_music, setChecked_music] = useState({
    rahman: false,
    arijit: false,
  });

  const [checked_books, setChecked_books] = useState({
    thriller: false,
    romance: false,
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    let recipient1 = { relation1, alertRecipient1 };
    let recipient2 = { relation2, alertRecipient2 };

    const tempVidArr = [];
    const tempMusicArr = [];
    const tempBooksArr = [];
    for (const video in checked_video) {
      const status = checked_video[video];
      if (status === true) {
        tempVidArr.push(video);
      }
    }

    for (const music in checked_music) {
      const status = checked_music[music];
      if (status === true) {
        tempMusicArr.push(music);
      }
    }

    for (const books in checked_books) {
      const status = checked_books[books];
      if (status === true) {
        tempBooksArr.push(books);
      }
    }
    setVideoCategories((videoCategories) => [
      ...videoCategories,
      ...tempVidArr,
    ]);
    setMusicCategories(tempMusicArr);
    setBooksCategories(tempBooksArr);
    console.log(
      "After Submit: ",
      videoCategories,
      musicCategories,
      booksCategories
    );
    console.log("After Edit : ", name, email, recipient1, recipient2);

    axios
      .patch("http://localhost:3500/user", {
        _id: _id,
        user_name: username,
        recipient1: recipient1,
        recipient2: recipient2,
        password: password,
        e_mail: email,
        video: videoCategories,
        music: musicCategories,
        books: booksCategories,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.message);
          navigate("/dashboard", { state: { _id: _id, name: username } });
        }
        console.log("User Updated");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // setFormsubmitted(true)

  const handleChangeSubVideo = (event) => {
    const { name, checked } = event.target;
    setChecked_video((checked_video) => ({
      ...checked_video,
      [name]: checked,
    }));
    console.log(name);
    let tempVidArr = [];
    tempVidArr.push(name);
    setVideoCategories(tempVidArr);
  };

  const handleChangeSubMusic = (event) => {
    const { name, checked } = event.target;
    setChecked_music((checked_music) => ({
      ...checked_music,
      [name]: checked,
    }));
    let tempMusicArr = [];
    tempMusicArr.push(name);
    setMusicCategories(tempMusicArr);
  };

  const handleChangeSubBooks = (event) => {
    const { name, checked } = event.target;
    setChecked_books((checked_books) => ({
      ...checked_books,
      [name]: checked,
    }));
    let tempBooksArr = [];
    tempBooksArr.push(name);
    setBooksCategories(tempBooksArr);
  };

  const handleVideoChange = (event) => {
    const { name, checked } = event.target;
    setVideo(!video);
    setMusic(false);
    setBooks(false);
  };

  const handleMusicChange = (event) => {
    const { name, checked } = event.target;
    setVideo(false);
    setMusic(!music);
    setBooks(false);
  };

  const handleBooksChange = (event) => {
    const { name, checked } = event.target;
    setVideo(false);
    setMusic(false);
    setBooks(!books);
  };

  const children_video = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
      <FormLabel className="form_sub">What type of videos you like</FormLabel>
      <FormControlLabel
        label="Cats"
        control={
          <Checkbox
            checked={checked_video.cats}
            name="cats"
            onChange={handleChangeSubVideo}
          />
        }
      />
      <FormControlLabel
        label="Dogs"
        control={
          <Checkbox
            checked={checked_video.dogs}
            name="dogs"
            onChange={handleChangeSubVideo}
          />
        }
      />
    </Box>
  );

  const children_music = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
      <FormLabel className="form_sub">What type of music you like</FormLabel>
      <FormControlLabel
        label="Rahman"
        control={
          <Checkbox
            checked={checked_music.rahman}
            name="rahman"
            onChange={handleChangeSubMusic}
          />
        }
      />
      <FormControlLabel
        label="Arijit"
        control={
          <Checkbox
            checked={checked_music.arijit}
            name="arijit"
            onChange={handleChangeSubMusic}
          />
        }
      />
    </Box>
  );

  const children_books = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
      <FormLabel className="form_sub">What type of book you like</FormLabel>
      <FormControlLabel
        label="Thriller"
        control={
          <Checkbox
            checked={checked_books.thriller}
            name="thriller"
            onChange={handleChangeSubBooks}
          />
        }
      />
      <FormControlLabel
        label="Romance"
        control={
          <Checkbox
            checked={checked_books.romance}
            name="romance"
            onChange={handleChangeSubBooks}
          />
        }
      />
    </Box>
  );

  return (
    <section className="form_section_edit">
      <Container className="h-10">
        <Row className="d-flex justify-content-center align-items-center h-50">
          <Col lg={12} xl={12}>
            <Card text="black" style={{ borderRadius: "30px" }}>
              <Row className="justify-content-center">
                <Col md={12} lg={6} xl={5} order={{ md: 2, lg: 1 }}>
                  <p>
                    <h1 className="edit_head ">Edit Your Profile</h1>
                  </p>
                  <Form className="mx-1 mx-md-4">
                    <Form.Group className="d-flex flex-row align-items-center mb-3">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="fa-lg me-3 fa-fw"
                      />
                      <div className="form-outline flex-fill align-items-end  mb-0">
                        <Form.Label htmlFor="email" className="form_label">
                          <b>Email</b>
                        </Form.Label>
                        <Form.Control
                          autoFocus
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                    <Form.Group className="d-flex flex-row align-items-center mb-3">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="fa-lg me-3 fa-fw"
                      />
                      <div className="form-outline flex-fill mb-0">
                        <Form.Label
                          htmlFor="form3Example1c"
                          className="form_label"
                        >
                          <b>Name</b>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={username}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                    <Form.Group className="d-flex flex-row align-items-center mb-3">
                      <FontAwesomeIcon
                        icon={faPerson}
                        className="fa-xl me-3 fa-fw"
                      />
                      <div className="form-outline flex-fill mb-0">
                        <div className="relation_field">
                          <div className="form_label_relation">
                            <Form.Label htmlFor="form3Example1c">
                              <b>Relation</b>
                            </Form.Label>
                            <Form.Select
                              type="text"
                              value={relation1}
                              onChange={(e) => setRelation1(e.target.value)}
                            >
                              <option value="Father">Father</option>
                              <option value="Mother">Mother</option>
                              <option value="Husband">Husband</option>
                              <option value="Wife">Wife</option>
                              <option value="Relative">Relative</option>
                              <option value="Friend">Friend</option>
                            </Form.Select>
                          </div>
                          <div className="form_label_email">
                            <Form.Label htmlFor="form3Example1c">
                              <b>Email</b>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={alertRecipient1}
                              onChange={(e) =>
                                setAlertRecipient1(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group className="d-flex flex-row align-items-center mb-3">
                      <FontAwesomeIcon
                        icon={faPerson}
                        className="fa-xl me-3 fa-fw"
                      />
                      <div className="form-outline flex-fill mb-0">
                        <div className="relation_field">
                          <div className="form_label_relation">
                            <Form.Label htmlFor="form3Example1c">
                              <b>Relation</b>
                            </Form.Label>
                            <Form.Select
                              type="text"
                              value={relation2}
                              onChange={(e) => setRelation2(e.target.value)}
                            >
                              <option value="Father">Father</option>
                              <option value="Mother">Mother</option>
                              <option value="Husband">Husband</option>
                              <option value="Wife">Wife</option>
                              <option value="Relative">Relative</option>
                              <option value="Friend">Friend</option>
                            </Form.Select>
                          </div>
                          <div className="form_label_email">
                            <Form.Label htmlFor="form3Example1c">
                              <b>Email</b>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={alertRecipient2}
                              onChange={(e) =>
                                setAlertRecipient2(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group className="d-flex flex-row align-items-center mb-3">
                      <FontAwesomeIcon
                        icon={faKey}
                        className="fa-lg me-3 fa-fw"
                      />
                      <div className="form-outline flex-fill mb-0">
                        <Form.Label
                          htmlFor="form3Example1c"
                          className="form_label"
                        >
                          <b>Password</b>
                        </Form.Label>
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={10} lg={6} xl={5} order={{ md: 2, lg: 1 }}>
                  <div className="text-center  mb-5 mx-1 mx-md-4 mt-4">
                    <Form>
                      <Form.Label className="preference_form_label">
                        <b>Preferences</b>
                      </Form.Label>

                      <div className="preference_field">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={video}
                              onChange={handleVideoChange}
                              name="videos"
                            />
                          }
                          label="Videos"
                        />
                        {video == true ? (
                          <div>{children_video}</div>
                        ) : (
                          <div></div>
                        )}
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={music}
                              onChange={handleMusicChange}
                              name="songs"
                            />
                          }
                          label="Music"
                        />
                        {music == true ? (
                          <div>{children_music}</div>
                        ) : (
                          <div></div>
                        )}
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={books}
                              onChange={handleBooksChange}
                              name="books"
                            />
                          }
                          label="Books"
                        />
                        {books == true ? (
                          <div>{children_books}</div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </Form>
                  </div>
                  <div className="edit_buttons">
                    <div className="edit">
                      <Button variant="primary" onClick={handleUpdate}>
                        Edit Profile
                      </Button>
                    </div>
                    <div className="cancel">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          navigate("/dashboard", {
                            state: { _id: _id, name: name },
                          })
                        }
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EditProfile;
