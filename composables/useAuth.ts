// composables/useAuth.ts
export const useAuth = () => {
    const accessToken = useCookie<string | null>('access', {
        path: '/',
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 15 // 15 minutes
    });
    const refreshToken = useCookie<string | null>('refresh', {
        path: '/',
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30 // 30 days
    });
    const lastActivity = useCookie<number | null>('lastActivity', {
        path: '/',
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30 // Match refresh token duration (30 days)
    });

    const updateLastActivity = () => {
        lastActivity.value = Date.now(); // Store current timestamp in milliseconds
    };

    const isInactiveForTooLong = () => {
        if (!lastActivity.value) return false; // No activity recorded yet
        const oneHourInMs = 60 * 60 * 1000; // 1 hour in milliseconds
        return Date.now() - lastActivity.value > oneHourInMs;
    };

    const refreshAccessToken = async () => {
        try {
            if (!refreshToken.value) {
                throw new Error('No refresh token available');
            }
            const response = await $fetch<{ access: string }>('http://192.168.0.111:3000/api/token/refresh/', {
                method: 'POST',
                body: { refresh: refreshToken.value }
            });

            if (!response || !response.access) {
                throw new Error('Failed to refresh token');
            }

            accessToken.value = response.access;
            updateLastActivity(); // Update last activity on successful refresh
            return true;
        } catch (error) {
            console.error('Token refresh failed:', error);
            accessToken.value = null;
            refreshToken.value = null;
            lastActivity.value = null;
            return false;
        }
    };

    const logout = () => {
        accessToken.value = null;
        refreshToken.value = null;
        lastActivity.value = null;
        navigateTo('/k-admin/login');
    };

    // Manual interval management
    let refreshInterval: NodeJS.Timeout | null = null;

    const startRefreshing = () => {
        if (refreshInterval) {
            clearInterval(refreshInterval); // Clear any existing interval to avoid duplicates
        }
        if (refreshToken.value) {
            refreshInterval = setInterval(async () => {
                await refreshAccessToken();
            }, 60 * 10 * 1000); // 10 seconds in milliseconds
        }
    };

    const stopRefreshing = () => {
        if (refreshInterval) {
            clearInterval(refreshInterval);
            refreshInterval = null;
        }
    };

    return { 
        accessToken, 
        refreshToken, 
        refreshAccessToken, 
        logout, 
        updateLastActivity, 
        isInactiveForTooLong,
        startRefreshing,
        stopRefreshing
    };
};