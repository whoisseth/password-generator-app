/** @format */

import React from "react";
import * as Slider from "@radix-ui/react-slider";

type SliderCompnentType = {
  defaultValue?: number[] | undefined;
  value: number[] | undefined;
  max?: number | undefined;
  step?: number | undefined;
  //   onChange: React.FormEventHandler<HTMLDivElement> | undefined;
  onValueChange: (value: number[]) => void;
};

export default function SliderCompnent({
  defaultValue = [50],
  max = 100,
  step = 1,
  value,
  onValueChange
}: SliderCompnentType) {
  return (
    <form>
      <Slider.Root
        value={value}
        onValueChange={onValueChange}
        className="relative flex items-center select-none touch-none w-full h-5"
        defaultValue={defaultValue}
        max={max}
        step={step}
      >
        <Slider.Track className="bg-stone-900 relative grow rounded-full h-2">
          <Slider.Range className="absolute bg-Green rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA5"
          aria-label="Volume"
        />
      </Slider.Root>
    </form>
  );
}
