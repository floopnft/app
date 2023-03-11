import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { observer } from '@legendapp/state/react';
import EyeOutlineIcon from '@shared/ui/icons/EyeOutlineIcon';
import Chip from '@shared/ui/molecules/Chip';
import { Box, Image, Text } from '@shared/ui/primitives';
import { TouchableOpacity } from '@shared/ui/touchables';
import { scale, ucarecdn } from '@shared/utils';
import { forwardRef, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { $presets } from '../model';

interface PresetsProps {
  onPresetApply: (presetId: string) => void;
}

const Presets = forwardRef<BottomSheet, PresetsProps>(
  ({ onPresetApply }, ref) => {
    const insets = useSafeAreaInsets();
    const presets = $presets.get();
    const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
    useEffect(() => {
      setSelectedPreset(presets[0]?.id || null);
    }, [presets]);

    return (
      <BottomSheet
        ref={ref}
        enablePanDownToClose
        index={-1}
        snapPoints={['72%']}
        backgroundStyle={{ backgroundColor: '#090909' }}
        handleComponent={() => (
          <Box
            flexDirection="row"
            py={2}
            justifyContent="center"
            alignItems="center"
          >
            <EyeOutlineIcon color="white" />
            <Text fontSize={scale(14)} marginLeft={1} fontWeight="500">
              Presets
            </Text>
          </Box>
        )}
      >
        <Box>
          <ScrollView
            style={{ marginBottom: scale(12) }}
            contentInset={{ left: scale(20), right: scale(20) }}
            contentContainerStyle={{ gap: scale(4) }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {presets.map((preset) => (
              <TouchableOpacity
                key={preset.id}
                onPress={() => setSelectedPreset(preset.id)}
              >
                <Chip
                  title={preset.name}
                  selected={selectedPreset === preset.id}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Box>
        <Box flex={1} alignItems="center">
          <BottomSheetFlatList
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentInset={{ bottom: insets.bottom }}
            contentContainerStyle={{ gap: scale(8) }}
            columnWrapperStyle={{ gap: scale(8) }}
            data={presets.find((preset) => preset.id === selectedPreset)?.nfts}
            renderItem={({ item: nft }) => (
              <TouchableOpacity onPress={() => onPresetApply(nft.presetId)}>
                <Image
                  width={scale(88)}
                  height={scale(130)}
                  source={ucarecdn(nft.imgUploadCareId)}
                  borderRadius={8}
                />
              </TouchableOpacity>
            )}
          />
        </Box>
      </BottomSheet>
    );
  }
);

export default observer(Presets);
