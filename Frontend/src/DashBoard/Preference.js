import * as React from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import { useNavigate, useLocation, Form } from "react-router-dom";
import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	Container,
} from "@mui/material";
import { useState } from "react";
import { FormLabel } from "react-bootstrap";
import { Box } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  	return <Slide direction="up" ref={ref} {...props} />;
});

export default function Preference({ _id, setPreferStatus, preferStatus }) {
	const [video, setVideo] = useState(false);
	const [music, setMusic] = useState(false);
	const [books, setBooks] = useState(false);

	const [videoCategories, setVideoCategories] = useState([]);
	const [musicCategories, setMusicCategories] = useState([]);
	const [booksCategories, setBooksCategories] = useState([]);

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

	const [formsubmitted, setFormsubmitted] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	// const _id = '64daedd69307b4906e887eb4'

	const handleSubmit = async (e) => {
		e.preventDefault();
		setPreferStatus(200);
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
		axios
		.post("http://localhost:3500/user/setPreferences", {
			_id: _id,
			video: videoCategories,
			music: musicCategories,
			books: booksCategories,
		})
		.then((response) => {
			const res = response.data;
			console.log(res.message);
		});

		// setFormsubmitted(true)
	};

	const handleReset = () => {
		console.log(
		"Before reset:",
		videoCategories,
		musicCategories,
		booksCategories
		);
		let tempVidArr = videoCategories;
		tempVidArr.pop();
		setVideoCategories(tempVidArr);
		setVideo(false);

		let tempMusicArr = musicCategories;
		tempMusicArr.pop();
		setMusicCategories(tempMusicArr);
		setMusic(false);

		let tempBooksArr = booksCategories;
		tempBooksArr.pop();
		setBooksCategories(tempBooksArr);
		setBooks(false);
		console.log(
		"After reset:",
		videoCategories,
		musicCategories,
		booksCategories
		);
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

	const handleCancel = () => {
		console.log(
			"Before Cancel",
			videoCategories,
			musicCategories,
			booksCategories
		);
		let tempVidArr = videoCategories;
		tempVidArr.pop();
		setVideoCategories(tempVidArr);
		setVideo(false);

		let tempMusicArr = musicCategories;
		tempMusicArr.pop();
		setMusicCategories(tempMusicArr);
		setMusic(false);

		let tempBooksArr = booksCategories;
		tempBooksArr.pop();
		setBooksCategories(tempBooksArr);
		setBooks(false);

		setPreferStatus(202);
		console.log(
			"Afetr Cancel",
			videoCategories,
			musicCategories,
			booksCategories
		);
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
		<div>
			<div className="preference_form">
				<form onSubmit={handleSubmit}>
				<Container
					sx={{
					display: "flex",
					flexDirection: "column",
					}}
				>
					<FormGroup>
					<FormLabel>
						<div className="preference_box">
						<h4>What is your most liked thing ?</h4>
						{/* <Button className="cancel" onClick={handleCancel}>
							Cancel
						</Button>{" "} */}
						</div>
					</FormLabel>
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
					{video == true ? <div>{children_video}</div> : <div></div>}
					<FormControlLabel
						control={
						<Checkbox
							checked={music}
							onChange={handleMusicChange}
							name="songs"
						/>
						}
						label="Songs"
					/>
					{music == true ? <div>{children_music}</div> : <div></div>}
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
					{books == true ? <div>{children_books}</div> : <div></div>}
			
					</FormGroup>
					<div className="button_group">
					<Button type="submit" color="inherit" className="btn-btn-success">
						Apply
					</Button>

					<Button onClick={handleReset} color="inherit">
						Reset
					</Button>
					</div>
				</Container>
				</form>
			</div>
		</div>
	);
}
