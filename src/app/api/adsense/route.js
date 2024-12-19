import { getAdUnits } from '../../../utils/adsense';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../utils/authOptions';

export async function GET(request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.id) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const adUnits = await getAdUnits(session.user.id);
        return new Response(JSON.stringify(adUnits), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch ad units' }), { status: 500 });
    }
}
