import { useState } from "react";

export default function ProgressBar() {
	const [progress, setProgress] = useState(50);
	return (
		<div className="w-full h-2 bg-gray-200 rounded-3xl">
			<div className="progress bg-(--primary) h-full rounded-3xl" style={{ width: progress + "%" }}></div>
		</div>
	);
}
