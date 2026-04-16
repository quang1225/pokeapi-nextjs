"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { useTypes } from "@/hooks/useTypes";
import { formatTypeLabel } from "@/lib/pokedex/typeLabel";
import { getPublicTypeIconSrc } from "@/lib/pokemon/format";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type TypeFilterProps = {
  value: string[];
  onChange: (types: string[]) => void;
};

export function TypeFilter({ value, onChange }: TypeFilterProps) {
  const { data: types } = useTypes();

  return (
    <div className="types-bar">
      <ToggleGroup.Root
        type="multiple"
        value={value}
        onValueChange={(next) => {
          onChange(next);
        }}
        className="types-bar__scroller"
        aria-label="Filter by Pokémon type; leave none selected to show all"
      >
        {types.map(({ name }) => (
          <Tooltip key={name}>
            <TooltipTrigger asChild>
              <ToggleGroup.Item
                value={name}
                className={cn(
                  name,
                  value.includes(name) && "types-bar__item--active",
                )}
                aria-label={`${formatTypeLabel(name)} type`}
              >
                <img src={getPublicTypeIconSrc(name)} alt="" />
              </ToggleGroup.Item>
            </TooltipTrigger>
            <TooltipContent side="top">{formatTypeLabel(name)}</TooltipContent>
          </Tooltip>
        ))}
      </ToggleGroup.Root>
    </div>
  );
}
