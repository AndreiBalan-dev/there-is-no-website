import React from "react";
import { useState, useEffect } from "react";

export default function Component() {
	const [progress, setProgress] = useState(0);
	const [isComplete, setIsComplete] = useState(false);
	const correctKeys = "I AM REALLY SORRY".split("");
	const handleKeyPress = (event: KeyboardEvent) => {
		const key = event.key.toUpperCase();
		if (key === correctKeys[progress]) {
			setProgress(progress + 1);
			if (progress === correctKeys.length - 1) {
				setIsComplete(true);
			}
		} else {
			setProgress(0);
		}
	};
	useEffect(() => {
		window.addEventListener("keydown", handleKeyPress);
		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, [handleKeyPress]);
	return (
		<div className="flex h-screen w-full items-center justify-center bg-background text-primary-foreground">
			<div className="space-y-4 text-center">
				<h1 className="text-6xl font-bold tracking-widest">
					{[...Array(correctKeys.length)].map((_, i) => (
						<span
							key={i}
							className={`inline-block ${
								progress > i
									? "text-primary"
									: "text-muted-foreground opacity-50"
							}`}
						>
							{correctKeys[i] !== " " ? correctKeys[i] : <span className="px-4">{correctKeys[i]}</span>}
						</span>
					))}
				</h1>
				{isComplete && (
					<div className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
						Don't Go Breaking Things Again!
					</div>
				)}
			</div>
		</div>
	);
}
