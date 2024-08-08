import React, { useRef, useEffect, useState, FC } from 'react';
import { Text } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';

interface AutoSizedTextProps {
    children: any;
    maxWidth: number;
    minFontSize?: number;
}

const AutoSizedText: FC<AutoSizedTextProps> = ({
    children,
    maxWidth,
    minFontSize = 0.2,
    ...props
}) => {
    const ref = useRef<Mesh>(null);
    const [fontSize, setFontSize] = useState<number>(1);
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        if (ref.current) {
            ref.current.geometry.computeBoundingBox();
            const size = new Vector3();
            ref.current.geometry.boundingBox?.getSize(size);
            const textWidth = size.x;

            if (textWidth > maxWidth) {
                // Calculate the necessary scale to fit within maxWidth
                const newFontSize = (maxWidth / textWidth) * fontSize;
                // Apply the new font size, respecting the minFontSize
                setFontSize(Math.max(newFontSize, minFontSize));
            }
            setReady(true);
        }
    }, [children, maxWidth, fontSize, minFontSize]);

    return (
        <Text
            ref={ref}
            fontSize={fontSize}
            onSync={() => {
                if (ref.current) {
                    ref.current.geometry.computeBoundingBox();
                }
            }}
            {...props}
        >
            {children}
        </Text>
    );
};

export default AutoSizedText;
