import {create} from "zustand";


interface HomePageStateInterface {
    isPageChanging: boolean;
    setPageChanging: (state: boolean) => void;
}

export const useHomePageState = create<HomePageStateInterface>((set) => ({
    isPageChanging: false,
    setPageChanging: (state: boolean) => set({isPageChanging: state})
}));