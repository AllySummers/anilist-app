import { Badge, type BadgeProps } from '@chakra-ui/react';
import { Star } from 'lucide-react';

export interface MediaScoreProps extends BadgeProps {
	score: number;
	steps: [oneStar: number, twoStar: number, threeStar: number];
}

const STAR_SIZE = 16;

export const MediaScore = ({
	score,
	steps: [oneStar, twoStar, threeStar],
	...props
}: MediaScoreProps) => {
	if (score >= threeStar) {
		return (
			<Badge colorPalette="orange" {...props}>
				Popular
				<Star fill="orange" size={STAR_SIZE} />
				<Star fill="orange" size={STAR_SIZE} />
				<Star fill="orange" size={STAR_SIZE} />
			</Badge>
		);
	}

	if (score >= twoStar) {
		return (
			<Badge colorPalette="yellow" {...props}>
				Popular
				<Star fill="yellow" size={STAR_SIZE} />
				<Star fill="yellow" size={STAR_SIZE} />
			</Badge>
		);
	}

	if (score >= oneStar) {
		return (
			<Badge colorPalette="green" {...props}>
				Popular
				<Star fill="green" size={STAR_SIZE} />
			</Badge>
		);
	}

	return null;
};
