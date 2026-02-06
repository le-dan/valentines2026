import { motion } from "motion/react";

export default function AnswerButtons(props: { onAnswer: (answer: string) => void; buttons: string[] }) {
	return (
		<motion.div
			className="grid grid-cols-2 grid-rows-2 justify-center gap-2 mt-10"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			{props.buttons.map((button, index) => (
				<button key={index} className="bg-(--primary) h-10 text-white px-6 py-2 rounded-lg transition" onClick={() => props.onAnswer(button)}>
					{button}
				</button>
			))}
		</motion.div>
	);
}
