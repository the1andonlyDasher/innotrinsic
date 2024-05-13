import { Vector3 } from '@react-three/fiber'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const currentLabel = atom<any>("label_bottom_lime")
export const currentDistance = atom<number>(1)
export const globalScroll = atom<number>(0)
export const loc = atom<string>("/")
export const landingSection = atom<string>("/")
export const scrollEnabled = atomWithStorage<any>("scroll", false)
export const backgroundColors = atom<string[]>(["#f6fff0", "#e5fcfc"])
export const backgroundText = atom<string>("default");
export const orbitTarget = atom<Vector3 | { x: number; y: number; z: number; }>({ x: 0, y: 1, z: 0 })
export const load = atom(false)
export const productViewer = atom<any>(null)
export const globalTarget = atom<Vector3 | { x: number; y: number; z: number; }>({ x: 0, y: 1, z: 0 })

