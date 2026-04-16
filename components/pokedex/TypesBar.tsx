"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { useTypes } from "@/hooks/useTypes";
import { getPublicTypeIconSrc } from "@/lib/pokemon/format";

type TypesBarProps = {
  selectedType: string;
  onTypeChange: (type: string) => void;
};

export function TypesBar({ selectedType, onTypeChange }: TypesBarProps) {
  const { data: types } = useTypes();

  return (
    <ToggleGroup.Root
      type="single"
      value={selectedType}
      onValueChange={(value) => {
        if (value) {
          onTypeChange(value);
        }
      }}
      className="types-bar"
      aria-label="Filter by Pokémon type"
    >
      {types.map(({ name }) => (
        <ToggleGroup.Item
          key={name}
          value={name}
          className={name}
          aria-label={`Show ${name} Pokémon`}
        >
          <img src={getPublicTypeIconSrc(name)} alt="" />
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
