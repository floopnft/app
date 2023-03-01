import { Box, Image, Text } from '@shared/ui/primitives';
import { scale } from '@shared/utils';
import React from 'react';

export interface CardInfoProps {
  avatarUrl: string;
  username: string;
  hints: string[];
  title: string;
}

const CardInfo: React.FC<CardInfoProps> = ({
  avatarUrl,
  username,
  hints,
  title,
}) => {
  return (
    <>
      <Box marginBottom={6} flexDirection="row" alignItems="center">
        <Image
          width={scale(32)}
          height={scale(32)}
          borderRadius={100}
          marginRight={1}
          source={avatarUrl}
        />
        <Text fontSize={scale(12)} fontWeight="500">
          {username}
        </Text>
      </Box>
      <Box flexDirection="row" gap={1} marginBottom={2}>
        {hints.map((hint, index) => (
          <Box
            key={index}
            borderWidth={1}
            borderRadius={14}
            borderColor="primaryText"
            paddingHorizontal={2}
            paddingVertical={1}
          >
            <Text>{hint}</Text>
          </Box>
        ))}
      </Box>
      <Text fontSize={scale(24)} fontWeight="500">
        {title}
      </Text>
    </>
  );
};

export default CardInfo;
