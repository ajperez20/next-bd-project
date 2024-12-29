import {NextResponse} from 'next/server';
import {getAllUsers} from '@/services/userService';

/**
 * GET /api/users
 */
export async function GET() {
    try {
        const users = await getAllUsers();
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}