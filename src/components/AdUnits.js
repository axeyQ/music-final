import { useEffect, useState } from 'react';

const AdUnits = () => {
    const [adUnits, setAdUnits] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdUnits = async () => {
            try {
                const response = await fetch('/api/adsense');
                if (!response.ok) {
                    throw new Error('Failed to fetch ad units');
                }
                const data = await response.json();
                setAdUnits(data.items || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAdUnits();
    }, []);

    if (loading) return <div>Loading Ad Units...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Ad Units</h1>
            <ul>
                {adUnits.map((unit) => (
                    <li key={unit.id}>{unit.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdUnits; 