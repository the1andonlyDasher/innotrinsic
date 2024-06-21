import { Vector3 } from '@react-three/fiber'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const currentLabel = atom<any>("label_bottom_lime")
export const currentDistance = atom<number>(1)
export const globalScroll = atom<number>(0)
export const loc = atom<string>("/")
export const glReady = atom<boolean>(false)
export const landingSection = atom<string>("/")
export const scrollEnabled = atomWithStorage<any>("scroll", false)
export const backgroundColors = atom<string[]>(["#f6fff0", "#e5fcfc"])
export const landingHeaders = atom<string>("Mieten")
export const backgroundText = atom<string>("default");
export const orbitTarget = atom<Vector3 | { x: number; y: number; z: number; }>({ x: 0, y: 1, z: 0 })
export const load = atom(false)
export const productViewer = atom<any>(null)
export const mountainViewer = atom<any>(null)
export const modulesViewer = atom<any>(null)
export const globalTarget = atom<Vector3 | { x: number; y: number; z: number; }>({ x: 0, y: 1, z: 0 })
export const globalModuleIndex = atom(0)

// types.ts
export interface Module {
    size: [number, number, number];
    svgSrc: string;
    position: [number, number, number];
    color: string;
    UID: number;
}

export interface ModuleGroup {
    [key: string]: Module;
}

export interface ModuleSet {
    first: ModuleGroup;
    second: ModuleGroup;
    third: ModuleGroup;
    fourth: ModuleGroup;
}

export const moduleSet = atom<ModuleSet>({
    first: {
        neuroloyalZumNeu: { size: [1, 1, 1], position: [1.125, -2.5, 0], svgSrc: "/images/NeuroloyalNeu.png", color: "#f4e5ca", UID: 10 },
        focusMe: { size: [1, 1, 1], position: [-1.125, -2.5, 0], svgSrc: "/images/FocusMe.png", color: "#9EBCDA", UID: 11 },
        neuroloyalPlanen: { size: [1, 1, 1], position: [1.125, -0.25, 0], svgSrc: "/images/Planen.png", color: "#C0C4C8", UID: 12 },
        focusOutside: { size: [1, 1, 1], position: [-1.125, -0.25, 0], svgSrc: "/images/FocusOutside.png", color: "#bec6ae", UID: 13 },
    },
    second: {
        neuroloyalZumNeu: { size: [0, 0, 0], position: [-2, 0, 0], svgSrc: "/images/NeuroloyalNeu.png", color: "#f4e5ca", UID: 20 },
        neuroloyalPlanen: { size: [2, 2, 1], position: [0, -1.5, 0], svgSrc: "/images/Planen.png", color: "#9EBCDA", UID: 21 },
        focusMe: { size: [0, 0, 0], position: [2, -2.5, 0], svgSrc: "/images/FocusMe.png", color: "#C0C4C8", UID: 22 },
        focusOutside: { size: [0, 0, 0], position: [-2, -5, 0], svgSrc: "/images/FocusOutside.png", color: "#bec6ae", UID: 23 },
    },
    third: {
        BrainPlus: { size: [1, 1, 1], position: [1.125, -2.5, 0], svgSrc: "/images/BrainPlus.png", color: "#66a3e0", UID: 30 },
        neuroloyalZumNeu: { size: [1, 1, 1], position: [-1.125, -2.5, 0], svgSrc: "/images/NeuroloyalNeu.png", color: "#f4e5ca", UID: 31 },
        neuroloyalPlanen: { size: [1, 1, 1], position: [1.125, -0.25, 0], svgSrc: "/images/Planen.png", color: "#9EBCDA", UID: 32 },
        focusOutside: { size: [1, 1, 1], position: [-1.125, -0.25, 0], svgSrc: "/images/FocusOutside.png", color: "#bec6ae", UID: 33 },
    },
    fourth: {
        focusMe: { size: [2, 0.666, 1], position: [0, 0, 0], svgSrc: "/images/FocusMe.png", color: "#9EBCDA", UID: 40 },
        focusOutside: { size: [2, 0.666, 1], position: [0, -1.5, 0], svgSrc: "/images/FocusOutside.png", color: "#bec6ae", UID: 41 },
        neuroloyalZumNeu: { size: [2, 0.666, 1], position: [0, -3, 0], svgSrc: "/images/NeuroloyalNeu.png", color: "#f4e5ca", UID: 42 },
    }
});
