// components/HomeBtn.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, MouseEvent, MutableRefObject } from 'react';

interface HomeBtnProps {
    imageUrl?: string;
    contentContainer: MutableRefObject<HTMLDivElement>
}

const HomeBtn: React.FC<HomeBtnProps> = ({ imageUrl, contentContainer }) => {
    const router = useRouter();

    useEffect(() => {
        // Scroll to top when navigating to the root
        const handleRouteChange = (url: string) => {
            if (url === '/') {
                contentContainer.current.scrollTo(0, 0);
            }
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        if (router.pathname === '/') {
            e.preventDefault();
            contentContainer.current.scrollTo(0, 0);
        }
    };

    return (

        <Link className='nav-link' href="/" passHref>
            <div className="wrapper-link" onClick={handleClick}>
                {imageUrl ? (
                    <img src={imageUrl} alt="Home" />
                ) : (
                    'Home'
                )}
            </div>
        </Link>

    );
};

export default HomeBtn;


