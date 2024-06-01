import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './PrivacyPopup.module.css';

const PrivacyPopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isConsentGiven, setIsConsentGiven] = useState(false);

    useEffect(() => {
        const checkConsent = async () => {
            try {
                const { data } = await axios.get('/api/check-consent');
                setIsConsentGiven(data.consent);
                if (!data.consent) {
                    setIsVisible(true);
                }
            } catch (error) {
                console.error('Error checking consent:', error);
            }
        };

        checkConsent();
    }, []);

    const handleAccept = async () => {
        try {
            await axios.post('/api/set-consent');
            setIsVisible(false);
            setIsConsentGiven(true); // Update consent state
        } catch (error) {
            console.error('Error setting consent:', error);
        }
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="w-full fixed bottom-0 text-white bg-black rounded-xl z-50">
            <div className="max-w-[800px] my-0 mx-auto text-center">
                <h2>Datenschutz</h2>
                <p>
                    Wir nutzen EmailJS, um das Versenden von E-Mails von unserer Anwendung zu erleichtern. Wenn Sie ein Formular auf unserer Website absenden, werden die folgenden Daten von EmailJS erfasst und verarbeitet:
                </p>
                <ul>
                    <li>Name</li>
                    <li>E-Mail-Adresse</li>
                    <li>Nachrichteninhalt</li>
                </ul>
                <p>
                    Diese Daten werden ausschließlich zum Zwecke des Versendens von E-Mails gemäß Ihrer Anfrage verwendet. Wir teilen diese Daten nicht mit anderen Dritten.
                </p>
                <p>
                    EmailJS erfüllt die Anforderungen der DSGVO und stellt ein Datenverarbeitungsabkommen (DPA) zur Verfügung, um sicherzustellen, dass Ihre Daten sicher und in Übereinstimmung mit den Datenschutzgesetzen verarbeitet werden. Sie können deren Datenschutzerklärung <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">hier</a> einsehen.
                </p>
                <p>
                    Durch das Absenden eines Formulars auf unserer Website stimmen Sie der Verarbeitung Ihrer Daten durch EmailJS zu den oben genannten Zwecken zu.
                </p>
                <button className='btn__alt' onClick={handleAccept}>Ich stimme zu</button>
            </div>
        </div>
    );
};

export default PrivacyPopup;
