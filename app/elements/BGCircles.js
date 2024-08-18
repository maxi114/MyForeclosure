import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAccountLayout() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
        document.body.classList.add('authentication-bg');
        }

        return () => {
        if (typeof window !== 'undefined') {
            document.body.classList.remove('authentication-bg');
        }
        };
    }, [router.pathname]);
}

const BGCircles = () => {
    useAccountLayout();

    return (
        <div
            className="position-absolute start-0 end-0 bottom-0 w-100 h-100"
            style={{ zIndex: -1 }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 800 800"
            >
                <g fillOpacity="0.22">
                    <circle
                        style={{ fill: 'rgba(var(--ct-tritary-rgb), 0.45)' }}
                        cx={400}
                        cy={400}
                        r={600}
                    />
                    <circle
                        style={{ fill: 'rgba(var(--ct-tritary-rgb), 0.6)' }}
                        cx={400}
                        cy={400}
                        r={500}
                    />
                    <circle
                        style={{ fill: 'rgba(var(--ct-tritary-rgb), 0.7)' }}
                        cx={400}
                        cy={400}
                        r={300}
                    />
                    <circle
                        style={{ fill: 'rgba(var(--ct-tritary-rgb), 0.8)' }}
                        cx={400}
                        cy={400}
                        r={200}
                    />
                    <circle
                        style={{ fill: 'rgba(var(--ct-tritary-rgb), 1.0)' }}
                        cx={400}
                        cy={400}
                        r={100}
                    />
                </g>
            </svg>
        </div>
    );
};

export default BGCircles;