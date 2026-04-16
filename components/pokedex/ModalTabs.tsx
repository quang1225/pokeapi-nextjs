"use client";

import * as Tabs from "@radix-ui/react-tabs";

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
        <nav className="modal-tabs-nav">
          <Tabs.Trigger value="about">About</Tabs.Trigger>
          <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
          <Tabs.Trigger value="evolution">Evolution</Tabs.Trigger>
        </nav>
      </Tabs.List>
      <Tabs.Content
        value="about"
        className="modal-tab-panel mt-0 flex min-h-0 min-w-0 flex-1 flex-col outline-none"
      >
        <div className="data-container modal-scroll-panel">
          <AboutTab />
        </div>
      </Tabs.Content>
      <Tabs.Content
        value="stats"
        className="modal-tab-panel mt-0 flex min-h-0 min-w-0 flex-1 flex-col outline-none"
      >
        <div className="data-container modal-scroll-panel">
          <StatsTab />
        </div>
      </Tabs.Content>
      <Tabs.Content
        value="evolution"
        className="modal-tab-panel mt-0 flex min-h-0 min-w-0 flex-1 flex-col outline-none"
      >
        <div className="data-container modal-scroll-panel">
          <EvolutionTab id={pokemonId} />
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}
