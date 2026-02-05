export default function ProgressBar(props: { progress: number }) {
	return (
		<div className="w-full h-2 bg-gray-200 rounded-3xl">
			<div className="progress bg-(--primary) h-full rounded-3xl" style={{ width: props.progress + "%", boxShadow: "0 0 15px 2px pink" }}></div>
		</div>
	);
}
