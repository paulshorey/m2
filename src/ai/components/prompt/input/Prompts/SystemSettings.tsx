import React from 'react';
import Input from '@techytools/uui/components/form/Input';
import Expandable from '@techytools/uui/components/server/ExpandableHeight';
import Block from '@techytools/uui/components/client/Block';

type Props = {
  postData: {
    systemMessage: string;
    temperature: number;
    top_p: number;
    n: number;
    presence_penalty: number;
    frequency_penalty: number;
    max_tokens: number;
    stop: string[];
  };
  handleChange: (e?: any, percent?: any) => void;
  showAdvancedOptions: boolean;
};

export default function SystemSettings({
  postData,
  handleChange,
  showAdvancedOptions,
}: Props) {
  return (
    <Expandable
      aria-hidden={!showAdvancedOptions}
      data-component="prompt-input-Prompts-SystemSettings"
    >
      <Block
        sx={{
          flex: 0,
          margin: '1.05rem 0 0.875rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        <Input
          min={0.2}
          max={1}
          step={0.01}
          type="number"
          name="temperature"
          label="Temperature"
          sx={{
            '.MuiInputBase-root': {
              borderTopRightRadius: '0 !important',
              borderBottomRightRadius: '0 !important',
            },
          }}
          onChange={handleChange}
          value={postData.temperature}
          info={
            <pre>{`
Default: 0.6;
Min: 0;
Max: 2;

Anything > 1.0 will be nonsense.
            `}</pre>
          }
          showSlider
        ></Input>
        <Input
          min={0}
          max={2}
          step={0.01}
          type="number"
          name="top_p"
          label="Top p"
          sx={{
            '.MuiInputBase-root': {
              borderRadius: '0',
              borderRightWidth: '0',
            },
          }}
          onChange={handleChange}
          value={postData.top_p}
          info="Idk..."
          showSlider
        ></Input>
        <Input
          min={0}
          max={2}
          step={0.01}
          type="number"
          name="n"
          label="N"
          sx={{
            '.MuiInputBase-root': {
              borderRadius: '0',
              borderRightWidth: '0',
            },
          }}
          onChange={handleChange}
          value={postData.n}
          info="Idk..."
          showSlider
        ></Input>
        <Input
          min={-1}
          max={1}
          step={0.01}
          type="number"
          name="presence_penalty"
          label="Presence penalty"
          sx={{
            '.MuiInputBase-root': {
              borderRadius: '0',
              borderRightWidth: '0',
            },
          }}
          onChange={handleChange}
          value={postData.presence_penalty}
          info="Idk..."
          showSlider
        ></Input>
        <Input
          min={-1}
          max={1}
          step={0.01}
          type="number"
          name="frequency_penalty"
          label="Frequency penalty"
          sx={{
            '.MuiInputBase-root': {
              borderTopLeftRadius: '0 !important',
              borderBottomLeftRadius: '0 !important',
            },
          }}
          onChange={handleChange}
          value={postData.frequency_penalty}
          info="Idk..."
          showSlider
        ></Input>
      </Block>
    </Expandable>
  );
}
