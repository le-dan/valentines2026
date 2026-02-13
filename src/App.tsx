import { useRef, useState, useEffect } from "react";
import "./App.css";
import ProgressBar from "./components/ProgressBar";
import { AnimatePresence, motion } from "motion/react";
import type { Easing } from "motion/react";
import AnswerButtons from "./components/AnswerButtons";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import munchkincatImg from "./assets/munchkincat.jpg";
import headphonesImg from "./assets/headphones.png";
import hashiraImg from "./assets/hashira2.jpg";
import calendarImg from "./assets/calendar.png";
import catWoofImg from "./assets/cat-woof.gif";
import trattohttp from "./assets/trattoria.jpg";
import jumpingGatitoImg from "./assets/jumping-gatito.gif";

function App() {
	const ref = useRef(null);
	const { width, height } = useWindowSize();
	const [progress, setProgress] = useState(0);

	const [showValentineQuestion, setShowValentineQuestion] = useState(false);

	const [questionsCompleted, setQuestionsCompleted] = useState(false);
	const [showImage, setShowImage] = useState(false);
	const [showButtons, setShowButtons] = useState(false);
	const [showCorrectAnimation, setShowCorrectAnimation] = useState(false);
	const [shakeButton, setShakeButton] = useState(false);

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [fadeOut, setFadeOut] = useState(false);
	const [excitementPhraseIndex, setExcitementPhraseIndex] = useState(0);

	const excitementPhrases = ["yipppieee!!!", "woohoo!!!", "OMG YES!!!", "YESSS!!!", "so excited!!!", "🌹", "trattoria here we come!!!"];
	const questionSet = [
		{
			question: "What type of cat is this called?",
			image: munchkincatImg,
			answers: ["Xiaomimi", "Siamese", "Persian", "Tabby"],
			correctAnswer: "Xiaomimi",
		},
		{
			question: "What song is this lyric from: 'Kissy face, kissy face sent to your phone, but I'm tryna kiss your lips for real?'",
			image: headphonesImg,
			answers: ["Seasons", "Wildflower", "Likey Likey", "APT"],
			correctAnswer: "APT",
		},
		{
			question: "Who is the love hashira in Demon Slayer?",
			image: hashiraImg,
			answers: ["Shinobu Kocho", "Mitsuri Kanroji", "Kyojuro Rengoku", "Giyu Tomioka"],
			correctAnswer: "Mitsuri Kanroji",
		},
		{
			question: "What day is February 14th?",
			image: calendarImg,
			answers: ["Christmas", "Halloween", "Valentines", "Easter"],
			correctAnswer: "Valentines",
		},
	];

	const handleCorrectAnswer = (answer: string) => {
		if (answer === questionSet[currentQuestionIndex].correctAnswer) {
			setFadeOut(true);
			setShowImage(false);
			setShowButtons(false);

			setTimeout(() => {
				setShowCorrectAnimation(true);
				setProgress(progress + 25);
			}, 300);

			if (progress + 25 >= 100) {
				setTimeout(() => {
					// navigate to will you be my valentine screen
					// navigate("/valentine");
					setShowValentineQuestion(true);
					setQuestionsCompleted(true);
					setFadeOut(false);
				}, 2000);
				return;
			}

			setTimeout(() => {
				setCurrentQuestionIndex(currentQuestionIndex + 1);
				setShowCorrectAnimation(false);
				setFadeOut(false);
			}, 1800);

			console.log("Correct answer:", answer);
			setShowImage(true);
			setShowButtons(true);
		} else {
			console.log("Incorrect answer:", answer);
			setShakeButton(true);
			setTimeout(() => setShakeButton(false), 500);
		}
	};

	const bounceTransition = {
		y: {
			duration: 0.3,
			repeat: Infinity,
			repeatType: "reverse" as const,
			ease: "easeOut" as Easing,
		},
	};

	// Cycle through excitement phrases
	useEffect(() => {
		if (!showValentineQuestion && questionsCompleted) {
			const interval = setInterval(() => {
				setExcitementPhraseIndex((prev) => (prev + 1) % excitementPhrases.length);
			}, 1500);
			return () => clearInterval(interval);
		}
	}, [showValentineQuestion, questionsCompleted, excitementPhrases.length]);

	return (
		<>
			{questionsCompleted ? (
				<AnimatePresence mode="wait">
					{showValentineQuestion ? (
						<motion.div
							key={"valentine-question"}
							initial={{ filter: "blur(20px)", opacity: 0 }}
							animate={{ filter: "blur(0px)", opacity: 1 }}
							exit={{ filter: "blur(20px)", opacity: 0 }}
							transition={{ duration: 0.5 }}
							className="h-full flex flex-col"
						>
							<div className="h-full text-center mt-5 text-(--text-primary) flex flex-col items-center gap-12">
								<div className="text-5xl font-extralight flex flex-col gap-4">
									will you be my <span className="font-bold">Valentine 💖?</span>
								</div>
								<img src={catWoofImg} className="rounded-lg w-full" />
								<div className="mt-auto flex gap-2 items-center">
									<button
										className="bg-(--primary) text-6xl py-3 text-white px-12 rounded-xl transition disabled:opacity-50 border border-pink-700"
										onClick={() => setShowValentineQuestion(false)}
									>
										YES
									</button>
								</div>
							</div>
						</motion.div>
					) : (
						<motion.div className="flex flex-col h-full gap-10 relative">
							<Confetti width={width} height={height} numberOfPieces={50} />
							<img
								src={trattohttp}
								className="absolute left-1/2 top-0 -translate-x-1/2 w-screen max-h-[40vh] object-cover rounded-md pointer-events-none"
							/>
							<div className="h-full flex-col flex justify-end">
								<motion.div
									key={"celebration"}
									transition={bounceTransition}
									animate={{ y: [100, -25] }}
									className="flex flex-col items-center text-pink-400 text-3xl font-bold text-center"
								>
									{excitementPhrases[excitementPhraseIndex]}
									<img src={jumpingGatitoImg} className="w-full mx-auto rounded-lg" />
								</motion.div>
								<div className="text-(--text-primary) text-4xl text-center">
									see you on<br></br>
									<span className="text-[40px] font-bold">valentines day 💕💕💕</span>
									<br></br>
									<span className="text-lg text-(--text-primary)/75">from xiaomimi 😽 (me)</span>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			) : (
				<div className="h-full flex flex-col gap-3 min-h-0">
					<ProgressBar progress={progress} />
					<motion.div
						key={currentQuestionIndex}
						ref={ref}
						className="text-center mt-5 text-(--text-primary) text-3xl font-extralight"
						initial={{ opacity: 1 }}
						animate={{ opacity: fadeOut ? 0 : 1 }}
						transition={{ duration: 0.3 }}
					>
						{questionSet[currentQuestionIndex].question.split("").map((letter, index) => (
							<motion.span
								key={`${currentQuestionIndex}-${index}`}
								initial={{ opacity: 0 }}
								animate={!fadeOut ? { opacity: 1 } : { opacity: 0 }}
								transition={{ duration: 0.25, delay: index * 0.05 }}
								onAnimationComplete={
									index === questionSet[currentQuestionIndex].question.length - 1 ? () => setShowImage(true) : undefined
								}
							>
								{letter}
							</motion.span>
						))}
					</motion.div>
					{questionSet[currentQuestionIndex].image && showImage && !fadeOut && (
						<motion.img
							src={questionSet[currentQuestionIndex].image}
							className="w-3/4 mx-auto my-6 rounded-lg"
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							onAnimationComplete={() => setShowButtons(true)}
						/>
					)}
					{showButtons && !fadeOut && (
						<AnswerButtons
							shake={shakeButton}
							onAnswer={(answer) => {
								if (answer === questionSet[currentQuestionIndex].correctAnswer) {
									handleCorrectAnswer(answer);
								} else {
									handleCorrectAnswer(answer);
								}
							}}
							buttons={questionSet[currentQuestionIndex].answers}
						/>
					)}
					{showCorrectAnimation && (
						<motion.div
							className="fixed inset-0 flex items-center justify-center pointer-events-none"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<motion.div
								className="text-3xl font-bold text-(--text-primary)"
								initial={{ scale: 0, rotate: -180 }}
								animate={{ scale: 1, rotate: 0 }}
								transition={{ duration: 0.6, type: "spring" }}
							>
								✨ Correct! ✨
							</motion.div>
						</motion.div>
					)}
				</div>
			)}
		</>
	);
}

export default App;
