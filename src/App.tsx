import { useRef, useState } from "react";
import "./App.css";
import ProgressBar from "./components/ProgressBar";
import { motion, useInView } from "motion/react";
import AnswerButtons from "./components/AnswerButtons";
function App() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });
	const [progress, setProgress] = useState(0);

	const [showValentineQuestion, setShowValentineQuestion] = useState(false);

	const [showImage, setShowImage] = useState(false);
	const [showButtons, setShowButtons] = useState(false);
	const [showCorrectAnimation, setShowCorrectAnimation] = useState(false);
	const [shakeButton, setShakeButton] = useState(false);

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [fadeOut, setFadeOut] = useState(false);
	const questionSet = [
		{
			question: "What type of cat is this called?",
			image: "./src/assets/munchkincat.jpg",
			answers: ["Xiaomimi", "Siamese", "Persian", "Tabby"],
			correctAnswer: "Xiaomimi",
		},
		{
			question: "What song is this lyric from: 'Kissy face, kissy face sent to your phone, but I'm tryna kiss your lips for real?'",
			image: "./src/assets/headphones.png",
			answers: ["Seasons", "Wildflower", "Likey Likey", "APT"],
			correctAnswer: "APT",
		},
		{
			question: "Who is the love hashira in Demon Slayer?",
			image: "./src/assets/hashira2.jpg",
			answers: ["Shinobu Kocho", "Mitsuri Kanroji", "Kyojuro Rengoku", "Giyu Tomioka"],
			correctAnswer: "Mitsuri Kanroji",
		},
		{
			question: "What day is February 14th?",
			image: "./src/assets/calendar.png",
			answers: ["Christmas", "Halloween", "Valentine's Day", "Easter"],
			correctAnswer: "Valentine's Day",
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

	return (
		<>
			{showValentineQuestion ? (
				<div className="text-center mt-20 text-(--text-primary) text-4xl font-bold">Will you be my Valentine? 💖</div>
			) : (
				<div className="h-full flex flex-col">
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
							className="w-3/4 mx-auto my-10 rounded-lg"
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
