import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { PanResponder, View } from "react-native";
import Svg, { Circle, Image, Line } from "react-native-svg";

const deg2rad = (deg) => (Math.PI * deg) / 180;

const polarToCartesian = (cx, cy, r, angleInDeg) => {
	const a = deg2rad(angleInDeg);
	return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
};

const arcPath = (cx, cy, r, startAngle, endAngle) => {
	const start = polarToCartesian(cx, cy, r, startAngle);
	const end = polarToCartesian(cx, cy, r, endAngle);
	const sweep = endAngle - startAngle;
	const largeArcFlag = Math.abs(sweep) > 180 ? 1 : 0;
	return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
};

const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

export default function CircularSlider({
	targetValue,
	setTargetValue,
	finalValue,
	setFinalValue,
	min,
	max,
	size,
	strokeWidth,
	trackColor,
	progressColor,
	thumbColor,
	thumbSize,
	startAngle,
	endAngle,
	thumbOffset,
	tickCount,
	tickLength,
	majorTickInterval,
	majorTickLength,
	gradientColors,
	padding,
	thumbImage,
	turnedOn,
	setTurnedOn,
	handleTurnOff,
	handleTurnOn,
}) {
	const cx = size / 2 + padding;
	const cy = size / 2 + padding;
	const r = (size - strokeWidth) / 2;
	const thumbRadius = r - thumbOffset;

	const totalSweep = endAngle - startAngle;

	const valueToAngle = useCallback(
		(val) => startAngle + ((val - min) / (max - min)) * totalSweep,
		[min, max, startAngle, totalSweep]
	);

	const [internalValue, setInternalValue] = useState(
		clamp(targetValue ?? min, min, max)
	);
	const [isDragging, setIsDragging] = useState(false);

	// Animation state for ticks
	const [animatedTickCount, setAnimatedTickCount] = useState(0);
	const animationRef = useRef(null);

	useEffect(() => {
		if (typeof targetValue === "number" && !isDragging) {
			setInternalValue(clamp(targetValue, min, max));
		}
		if (finalValue !== null && Math.abs(targetValue - min) < 0.01) {
			handleTurnOff();
		}
	}, [targetValue, min, max, isDragging, finalValue, handleTurnOff]);

	useEffect(() => {
		if (turnedOn) {
			setAnimatedTickCount(0);
			const duration = 400;
			const startTime = Date.now();

			const animate = () => {
				const elapsed = Date.now() - startTime;
				const progress = Math.min(elapsed / duration, 1);
				const currentTickCount = Math.floor(progress * tickCount);

				setAnimatedTickCount(currentTickCount);

				if (progress < 1) {
					animationRef.current = requestAnimationFrame(animate);
				}
			};

			animationRef.current = requestAnimationFrame(animate);
		} else {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
				animationRef.current = null;
			}
			setAnimatedTickCount(0);
		}

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [turnedOn, tickCount]);

	const currentAngle = useMemo(
		() => valueToAngle(internalValue),
		[internalValue, valueToAngle]
	);
	const thumb = polarToCartesian(cx, cy, thumbRadius, currentAngle);

	const ticks = useMemo(() => {
		const tickMarks = [];
		const angleStep = totalSweep / (tickCount - 1);

		for (let i = 0; i < tickCount; i++) {
			const tickAngle = startAngle + i * angleStep;
			const isMajorTick = i % majorTickInterval === 0;
			const currentTickLength = isMajorTick ? majorTickLength : tickLength;

			const outerPoint = polarToCartesian(
				cx,
				cy,
				r + strokeWidth / 2,
				tickAngle
			);
			const innerPoint = polarToCartesian(
				cx,
				cy,
				r + strokeWidth / 2 - currentTickLength,
				tickAngle
			);

			const isInProgress = internalValue > min && tickAngle <= currentAngle;

			let tickColor = trackColor;

			if (isInProgress) {
				if (gradientColors && gradientColors.length > 0) {
					const progressPosition = i / (tickCount - 1);
					const segmentSize = 1 / gradientColors.length;
					const segmentIndex = Math.min(
						Math.floor(progressPosition / segmentSize),
						gradientColors.length - 1
					);

					tickColor = gradientColors[segmentIndex];
				} else {
					tickColor = progressColor;
				}
			}

			const shouldShow = !turnedOn || i < animatedTickCount;

			tickMarks.push({
				key: i,
				x1: outerPoint.x,
				y1: outerPoint.y,
				x2: innerPoint.x,
				y2: innerPoint.y,
				isMajor: isMajorTick,
				isInProgress: isInProgress,
				color: tickColor,
				shouldShow: shouldShow,
			});
		}

		return tickMarks;
	}, [
		totalSweep,
		tickCount,
		startAngle,
		majorTickInterval,
		majorTickLength,
		tickLength,
		cx,
		cy,
		r,
		strokeWidth,
		internalValue,
		min,
		currentAngle,
		trackColor,
		gradientColors,
		progressColor,
		turnedOn,
		animatedTickCount,
	]);

	const containerRef = useRef(null);

	const commit = useCallback(
		(nextVal) => {
			const clampedVal = clamp(nextVal, min, max);
			setInternalValue(clampedVal);
			setTargetValue?.(clampedVal);
		},
		[setTargetValue, min, max]
	);

	const handlePan = useCallback(
		(evt) => {
			const { pageX, pageY } = evt.nativeEvent;
			if (!containerRef.current) return;

			containerRef.current.measure((fx, fy, w, h, px, py) => {
				const lx = pageX - px;
				const ly = pageY - py;
				const dx = lx - cx;
				const dy = ly - cy;

				let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
				if (angle < 0) angle += 360;

				let targetAngle = angle;

				if (endAngle > 360) {
					const option1 = angle;
					const option2 = angle + 360;

					const dist1 = Math.abs(currentAngle - option1);
					const dist2 = Math.abs(currentAngle - option2);

					targetAngle = dist1 < dist2 ? option1 : option2;
				}

				targetAngle = clamp(targetAngle, startAngle, endAngle);

				const progress = (targetAngle - startAngle) / totalSweep;
				const val = min + progress * (max - min);

				commit(val);
			});
		},
		[cx, cy, startAngle, endAngle, totalSweep, min, max, commit, currentAngle]
	);

	const panResponder = useMemo(
		() =>
			PanResponder.create({
				onStartShouldSetPanResponder: () => turnedOn,
				onMoveShouldSetPanResponder: () => turnedOn,
				onPanResponderGrant: (evt) => {
					setIsDragging(true);
					handlePan(evt);
				},
				onPanResponderMove: handlePan,
				onPanResponderRelease: () => {
					setIsDragging(false);

					if (internalValue === min) {
						setTargetValue?.(min);
						setFinalValue?.(min);
					} else {
						const convertedValue =
							38 + ((internalValue - min) / (max - min)) * (55 - 38);
						const roundedValue = Math.round(convertedValue);
						setFinalValue?.(roundedValue);
					}
				},
				onPanResponderTerminate: () => {
					setIsDragging(false);
					const convertedValue =
						38 + ((internalValue - min) / (max - min)) * (55 - 38);
					const roundedValue = Math.round(convertedValue);
					setFinalValue?.(roundedValue);
				},
			}),
		[turnedOn, handlePan, internalValue, setFinalValue, min, max]
	);

	return (
		<View
			pointerEvents={turnedOn ? "auto" : "none"}
			ref={containerRef}
			{...panResponder.panHandlers}
			style={{
				width: size + padding * 2,
				height: size + padding * 2,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Svg width={size + padding * 2} height={size + padding * 2}>
				{ticks.map(
					(tick) =>
						tick.shouldShow && (
							<Line
								key={tick.key}
								x1={tick.x1}
								y1={tick.y1}
								x2={tick.x2}
								y2={tick.y2}
								stroke={tick.color}
								strokeWidth={tick.isMajor ? 2 : 2}
								strokeLinecap="round"
								style={{ opacity: "90%" }}
							/>
						)
				)}
				{thumbImage ? (
					<Image
						x={thumb.x - thumbSize}
						y={thumb.y - thumbSize}
						width={thumbSize * 2}
						height={thumbSize * 2}
						href={thumbImage}
					/>
				) : (
					<Circle
						cx={thumb.x}
						cy={thumb.y}
						r={thumbSize}
						fill={!turnedOn ? "transparent" : thumbColor}
						// stroke="#FFF"
						// strokeWidth={0}
					/>
				)}
			</Svg>
		</View>
	);
}
