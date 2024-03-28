import { Html, Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react'

interface ControlledInputProps {
    value: string | number;
    onChange: any;
    props: any;
}

const ControlledInput = (props: any) => {
    const { value, onChange, ...rest }: any = props
    const [cursor, setCursor] = useState(null)
    const ref = useRef(null)
    useEffect(() => {
        const input: any = ref.current
        if (input) input.setSelectionRange(cursor, cursor)
    }, [ref, cursor, value])
    const handleChange = (e: any) => {
        setCursor(e.target.selectionStart)
        onChange && onChange(e)
    }
    return <input className='glInput' ref={ref} value={value} onChange={handleChange} {...rest} />
}

interface InputProps {
    props: any
}

export function Input(props: any) {
    const [text, set]: any = useState('hello world ...')
    const { viewport } = useThree();
    return (
        <group {...props}>
            <Text position={[-3.1, -0.022, 0.1]} anchorX={0} font="/fonts/didact-gothic-v20-latin-regular.ttf" fontSize={0.335} letterSpacing={-0.0}>
                {text}
                <meshBasicMaterial color="white" toneMapped={false} />
            </Text>
            <mesh position={[0, -0.022, 0]} scale={[6.5, 0.6, 1]}>
                <planeGeometry />
                <meshBasicMaterial color={"#A2FDFD"} opacity={1} depthWrite={true} />
            </mesh>
            <Html transform >
                <ControlledInput type={text} onChange={(e: any) => { set(e.target.value), console.log(e.target.offsetWidth) }} value={text} />
            </Html>
        </group>
    )
}