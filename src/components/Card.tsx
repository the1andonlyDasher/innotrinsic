import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FunctionComponent } from 'react';
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["800", "900"],
})

interface Props {
    header: string;
    text: string;
    icon: IconProp;
}

const Card: FunctionComponent<Props> = ({ header, text, icon }) => {
    return (
        <div className="card">
            <div className='card__header'>{header}</div>
            <div className='card__icon'>
                <FontAwesomeIcon icon={icon} />
            </div>
            <p className='text-small'>{text}</p>

        </div>
    );
};

export default Card;
