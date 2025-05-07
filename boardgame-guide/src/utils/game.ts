export function getStatusColor(status: 'active' | 'waiting' | 'starting'): { bg: string; text: string; dot: string } {
    switch (status) {
        case 'active':
            return { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' };
        case 'waiting':
            return { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' };
        case 'starting':
            return { bg: 'bg-orange-100', text: 'text-orange-800', dot: 'bg-orange-500' };
        default:
            return { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-500' };
    }
}