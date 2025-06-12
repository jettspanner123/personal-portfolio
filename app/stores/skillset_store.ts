import {create} from "zustand";


interface SkillSetStoreInterface {
    currentSelectedImage: number;
    setCurrentSelectedImage: (index: number) => void;
}

const useSkillSetStore = create<SkillSetStoreInterface>((set) => ({
    currentSelectedImage: -1,
    setCurrentSelectedImage: (index: number) => set((state) => ({
        currentSelectedImage: index
    }))
}))

export default useSkillSetStore;