"use client";

import * as Tabs from "@radix-ui/react-tabs";

import { ScrollArea } from "@/components/ui/scroll-area";

import { AboutTab } from "./tabs/AboutTab";
import { EvolutionTab } from "./tabs/EvolutionTab";
import { StatsTab } from "./tabs/StatsTab";

type ModalTabsProps = {
  pokemonId: number;
};

export function ModalTabs({ pokemonId }: ModalTabsProps) {
  return (
    <Tabs.Root
      defaultValue="about"
      key={pokemonId}
      className="flex min-h-0 min-w-0 flex-1 flex-col"
    >
      <Tabs.List asChild>
        <nav>
          <Tabs.Trigger value="about">About</Tabs.Trigger>
          <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
          <Tabs.Trigger value="evolution">Evolution</Tabs.Trigger>
        </nav>
      </Tabs.List>
      <Tabs.Content
        value="about"
        className="mt-0 flex min-h-0 flex-1 flex-col outline-none"
      >
        <ScrollArea className="data-container data-container--radix">
          <AboutTab />
        </ScrollArea>
      </Tabs.Content>
      <Tabs.Content
        value="stats"
        className="mt-0 flex min-h-0 flex-1 flex-col outline-none"
      >
        <ScrollArea className="data-container data-container--radix">
          <StatsTab />
        </ScrollArea>
      </Tabs.Content>
      <Tabs.Content
        value="evolution"
        className="mt-0 flex min-h-0 flex-1 flex-col outline-none"
      >
        <ScrollArea className="data-container data-container--radix">
          <EvolutionTab id={pokemonId} />
        </ScrollArea>
      </Tabs.Content>
    </Tabs.Root>
  );
}
