import { useRef, useState } from "react";
import "./App.css";
import ProgressBar from "./components/ProgressBar";
import { motion, useInView } from "motion/react";

function App() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });
	const question = "What type of cat is this called?";

	const [showImage, setShowImage] = useState(false);
	const [showButtons, setShowButtons] = useState(false);

	const [progress, setProgress] = useState(0);
	return (
		<>
			<ProgressBar progress={progress} />
			<div ref={ref} className="text-center mt-15 text-(--text-primary) text-3xl font-extralight">
				{question.split("").map((letter, index) => (
					<motion.span
						key={index}
						initial={{ opacity: 0 }}
						animate={isInView ? { opacity: 1 } : {}}
						transition={{ duration: 0.25, delay: index * 0.05 }}
						onAnimationComplete={index === question.length - 1 ? () => setShowImage(true) : undefined}
					>
						{letter}
					</motion.span>
				))}
			</div>
			{showImage && (
				<motion.img
					src="./src/assets/munchkincat.jpg"
					alt="A cute cat"
					className="w-3/4 mx-auto my-10 rounded-lg"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					onAnimationComplete={() => setShowButtons(true)}
				/>
			)}
			{showButtons && (
				<motion.div
					className="grid grid-cols-2 grid-rows-2 justify-center gap-4 mt-10 h-1/2"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<button className="bg-(--primary) h-10 text-white px-6 py-2 rounded-md hover:bg-(--primary) transition">Munchkin</button>
					<button className="bg-(--primary) h-10 text-white px-6 py-2 rounded-md hover:bg-(--primary) transition">Siamese</button>
					<button className="bg-(--primary) h-10 text-white px-6 py-2 rounded-md hover:bg-(--primary) transition">Persian</button>
					<button className="bg-(--primary) h-10 text-white px-6 py-2 rounded-md hover:bg-(--primary) transition">Tabby</button>
				</motion.div>
			)}
		</>
	);
}

export default App;
