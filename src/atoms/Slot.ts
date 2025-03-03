import { useInputState } from "@/src/atoms/Input";
import { useStructureState } from "@/src/atoms/Structure";
import { defaultSlots, MAX_SLOT_SIZE } from "@/src/utils/Defaults";
import { Slot } from "@/src/utils/Interfaces";
import { FormEvent } from "react";
import { atom, SetterOrUpdater, useRecoilState } from "recoil";

const getSlots = (): Slot[] => {
    let slotsJSON = localStorage.getItem("slots");

    if (slotsJSON) {
        return JSON.parse(slotsJSON).slice(0, MAX_SLOT_SIZE);
    }

    const slotsDefault = defaultSlots();
    slotsJSON = JSON.stringify(slotsDefault);
    localStorage.setItem("slots", slotsJSON);

    return slotsDefault;
};

const slotState = atom({
    key: "slotState",
    default: getSlots()
});

interface ISlot {
    slots: Slot[];
    setSlots: SetterOrUpdater<Slot[]>;
    loadSlot: (index: number) => void;
    saveSlot: (index: number) => void;
    renameSlot: (event: FormEvent<EventTarget>, index: number) => void;
}

export const useSlotsState = (): ISlot => {
    const [slots, setSlots] = useRecoilState(slotState);
    const { structure, setStructure } = useStructureState();
    const { input, setInput } = useInputState();

    const loadSlot = (index: number): void => {
        const slotsJSON = localStorage.getItem("slots") as string;
        const slotsData = JSON.parse(slotsJSON);

        const newSlots = [...slots];
        newSlots[index] = slotsData[index];

        setSlots(newSlots);
        setInput(newSlots[index].input);
        setStructure(newSlots[index].structure);

        alert(`Slot ${index + 1} "${newSlots[index].label}" loaded.`);
    };

    const saveSlot = (index: number): void => {
        const newSlot = {
            label: slots[index].label,
            input: input,
            structure: structure
        };

        const newSlots = [...slots];
        newSlots[index] = newSlot;

        const slotsJSON = JSON.stringify(newSlots);
        localStorage.setItem("slots", slotsJSON);

        alert(`Slot ${index + 1} saved.`);
    };

    const renameSlot = (event: FormEvent<EventTarget>, index: number): void => {
        const target = event.target as HTMLInputElement;
        const label = target.value;
        const newSlots = [...slots];
        newSlots[index].label = label;
        setSlots(newSlots);
    };

    return { slots, setSlots, loadSlot, saveSlot, renameSlot };
};
