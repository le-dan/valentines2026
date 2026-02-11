import { motion } from "motion/react";

export default function AnswerButtons(props: { onAnswer: (answer: string) => void; buttons: string[]; shake: boolean }) {
	return (
		<motion.div
			className="grid grid-cols-2 grid-rows-2 justify-center gap-2 mt-auto"
			initial={{ opacity: 0, y: 20 }}
			animate={props.shake ? { x: [-10, 10, -10, 10, 0], opacity: 1, y: 0 } : { x: 0, opacity: 1, y: 0 }}
			transition={props.shake ? { duration: 0.4 } : { duration: 0.5 }}
		>
			{props.buttons.map((button, index) => (
				<button
					key={index}
					className="bg-(--primary) h-16 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
					onClick={() => props.onAnswer(button)}
					disabled={props.shake}
				>
					{button}
				</button>
			))}
		</motion.div>
	);
}
