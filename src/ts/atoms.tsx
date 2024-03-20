import { Vector3 } from '@react-three/fiber'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const currentLabel = atom<any>("label_bottom_lime")
export const currentDistance = atom<number>(1)
export const loc = atomWithStorage("location", "/")
export const scrollEnabled = atomWithStorage<any>("scroll", false)
export const backgroundColors = atom<string[]>(["#f6fff0", "#e5fcfc"])
export const orbitTarget = atom<Vector3 | { x: number; y: number; z: number; }>({ x: 0, y: 1, z: 0 })
type navType = {
    links: string[];
    home: boolean;
};
export const currentNavigation = atom<navType>({ links: [], home: false })
export const load = atom(false)
export const productViewer = atom<any>(null)
export const servicesViewer = atom<any>({
    1: "",
    2: "",
    3: "",
    4: ""
})
export const leftCardViewer = atom<any>(null)
export const rightCardViewer = atom<any>(null)
export const cursor = atom<any>("default")
export const cursorText = atom<any>("default")
export const sections = atomWithStorage("sec", [])
