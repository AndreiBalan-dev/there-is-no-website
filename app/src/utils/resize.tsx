export const resize = (width: number, height: number, ratio: number = 16/9): { width: number, height: number } => {
    const currentRatio = width / height;

    if (currentRatio > ratio) {
        return { 
            width: Math.round(height * ratio),
            height
        }
    } else if (currentRatio < ratio) {
        return {
            width,
            height: Math.round(width / ratio)
        }
    }

    return { width, height }
}

export const calculateSizeReductionScale = (width: number): number => {
	if (width <= 600) {
		return 1.2;
	} else if (width <= 800) {
		return 1.5;
	}

	return 2;
};