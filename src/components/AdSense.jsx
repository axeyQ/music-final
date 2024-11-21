'use client';

import { useEffect } from 'react';

const AdSense = ({ adSlot, adFormat }) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-5230983184187192"
            data-ad-slot={adSlot}
            data-ad-format={adFormat || 'auto'}
            data-full-width-responsive="true"
        />
    );
};

export default AdSense; 