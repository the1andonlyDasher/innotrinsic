// components/HomeBtn.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, MouseEvent } from 'react';

interface HomeBtnProps {
    imageUrl?: string;
}

const HomeBtn: React.FC<HomeBtnProps> = ({ imageUrl }) => {
    const router = useRouter();

    useEffect(() => {
        // Scroll to top when navigating to the root
        const handleRouteChange = (url: string) => {
            if (url === '/') {
                window.scrollTo(0, 0);
            }
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (router.pathname === '/') {
            e.preventDefault();
            window.scrollTo(0, 0);
        }
    };

    return (
        <nav>
            <Link href="/" passHref>
                <a onClick={handleClick}>
                    {imageUrl ? (
                        <img src={imageUrl} alt="Home" />
                    ) : (
                        'Home'
                    )}
                </a>
            </Link>
        </nav>
    );
};

export default HomeBtn;


