import {create, StoreApi, UseBoundStore} from "zustand";

export enum MouseHoverStateOptions {
    None = 0,
    Link = 1,
    Read = 2,
    Email = 3,
    Phone = 4,
}

interface MouseHoverStateInterface {
    mouseHoverState: MouseHoverStateOptions;
    setMouseHoverState: (state: MouseHoverStateOptions) => void;
    mouseSize: number;
    setMouseSize: (size: number) => void;
    toggleFor: (type: MouseHoverStateOptions) => void;
    showMouseHover: boolean;
    toggleShowMouseHover: () => void;
}

export const useMouseHoverState: UseBoundStore<StoreApi<MouseHoverStateInterface>> = create<MouseHoverStateInterface>((set) => ({
    mouseHoverState: MouseHoverStateOptions.None,
    setMouseHoverState: (state: MouseHoverStateOptions) => set({mouseHoverState: state}),
    mouseSize: 20,
    setMouseSize: (size: number) => set({mouseSize: size}),
    toggleFor: (type: MouseHoverStateOptions) => set((state) => ({
        mouseHoverState: state.mouseHoverState == type ? MouseHoverStateOptions.None : type,
        mouseSize: state.mouseSize === 20 ? 100 : 20
    })),
    showMouseHover: true,
    toggleShowMouseHover: () => set((state) => ({
        showMouseHover: !state.showMouseHover,
    }))
}))
