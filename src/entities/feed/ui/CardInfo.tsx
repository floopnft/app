import { Box, Image, Text } from '@shared/ui/primitives';
import { scale } from '@shared/utils';
import React from 'react';
import { StyleSheet } from 'react-native';

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
      <Box marginBottom={3} flexDirection="row" alignItems="center">
        <Image
          width={scale(20)}
          height={scale(20)}
          borderRadius={4}
          marginRight={1}
          source={avatarUrl}
        />
        <Text fontSize={scale(12)} fontWeight="500">
          {username}
        </Text>
      </Box>
      <Text fontSize={scale(18)} fontWeight="500" marginBottom={2}>
        {title}
      </Text>
      {hints && (
        <Box flexDirection="row" gap={1}>
          {hints.map((hint, index) => (
            <Box
              key={index}
              borderRadius={4}
              paddingHorizontal={2}
              paddingVertical={1}
              style={styles.hint}
            >
              <Text fontSize={scale(12)} lineHeight={scale(16)}>
                {hint}
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  hint: {
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
});

export default CardInfo;
