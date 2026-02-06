import { useRef, useState } from "react";
import "./App.css";
import ProgressBar from "./components/ProgressBar";
import { motion, useInView } from "motion/react";
import AnswerButtons from "./components/AnswerButtons";
function App() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });
	const [progress, setProgress] = useState(0);

	const [showImage, setShowImage] = useState(false);
	const [showButtons, setShowButtons] = useState(false);

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const questionSet = [
		{
			question: "What type of cat is this called?",
			image: "./src/assets/munchkincat.jpg",
			answers: ["Xiaomimi", "Siamese", "Persian", "Tabby"],
			correctAnswer: "Xiaomimi",
		},
		{
			question: "What song is this lyric from: 'Kissy face, kissy face sent to your phone, but I'm tryna kiss your lips for real?'",
			answers: ["Seasons", "Wildflower", "Likey Likey", "APT"],
			correctAnswer: "APT",
		},
		{
			question: "Who is the love hashira in Demon Slayer?",
			answers: ["Shinobu Kocho", "Mitsuri Kanroji", "Kyojuro Rengoku", "Giyu Tomioka"],
			correctAnswer: "Mitsuri Kanroji",
		},
		{
			question: "What day is February 14th?",
			answers: ["Christmas", "Halloween", "Valentine's Day", "Easter"],
			correctAnswer: "Valentine's Day",
		},
	];

	return (
		<>
			<ProgressBar progress={progress} />
			<div ref={ref} className="text-center mt-15 text-(--text-primary) text-3xl font-extralight">
				{questionSet[currentQuestionIndex].question.split("").map((letter, index) => (
					<motion.span
						key={index}
						initial={{ opacity: 0 }}
						animate={isInView ? { opacity: 1 } : {}}
						transition={{ duration: 0.25, delay: index * 0.05 }}
						onAnimationComplete={index === questionSet[currentQuestionIndex].question.length - 1 ? () => setShowImage(true) : undefined}
					>
						{letter}
					</motion.span>
				))}
			</div>
			{questionSet[currentQuestionIndex].image && showImage && (
				<motion.img
					src={questionSet[currentQuestionIndex].image}
					className="w-3/4 mx-auto my-10 rounded-lg"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					onAnimationComplete={() => setShowButtons(true)}
				/>
			)}
			{showButtons && (
				<AnswerButtons
					onAnswer={(answer) => {
						if (answer === questionSet[currentQuestionIndex].correctAnswer) {
							setProgress(progress + 25);
							setCurrentQuestionIndex(currentQuestionIndex + 1);
							setShowImage(false);
							setShowButtons(false);

							if (!questionSet[currentQuestionIndex + 1].image) {
								console.log("No image for this question, showing buttons directly.");
								setTimeout(() => {
									setShowButtons(true);
								}, 1000);
							}
						} else {
							setProgress(progress);
						}
					}}
					buttons={questionSet[currentQuestionIndex].answers}
				/>
			)}
		</>
	);
}

export default App;
