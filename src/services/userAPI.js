import axios from 'axios'

const API_URL = "https://bbmnmqqdxmnnwnkgmdhi.supabase.co/rest/v1/User"
const API_KEY = "sb_publishable_YmLVBXGPd4qGmAH2slNBdg_--Srz8sH"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

export const userAPI = {
    // Ambil semua user
    async fetchUsers() {
        try {
            console.log('🔍 Fetching users from Supabase...');
            const response = await axios.get(API_URL, { 
                headers,
                params: {
                    select: '*'
                }
            });
            console.log('✅ Users fetched:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error in fetchUsers:', error.response?.data || error.message);
            // Return empty array instead of throwing error
            return [];
        }
    },

    // Ambil satu user berdasarkan id
    async fetchUserById(id) {
        try {
            const response = await axios.get(API_URL, {
                headers,
                params: { 
                    id: `eq.${id}`,
                    select: '*'
                }
            });
            return response.data[0];
        } catch (error) {
            console.error('❌ Error in fetchUserById:', error);
            return null;
        }
    },

    // Tambah user baru
    async createUser(data) {
        try {
            console.log('📝 Creating user:', data);
            const response = await axios.post(API_URL, data, {
                headers: {
                    ...headers,
                    Prefer: "return=representation"
                }
            });
            console.log('✅ User created:', response.data);
            return response.data[0];
        } catch (error) {
            console.error('❌ Error in createUser:', error.response?.data || error.message);
            throw error;
        }
    },

    // Update user berdasarkan id
    async updateUser(id, data) {
        try {
            console.log('📝 Updating user:', id, data);
            const response = await axios.patch(API_URL, data, {
                headers: {
                    ...headers,
                    Prefer: "return=representation"
                },
                params: { id: `eq.${id}` }
            });
            console.log('✅ User updated:', response.data);
            return response.data[0];
        } catch (error) {
            console.error('❌ Error in updateUser:', error.response?.data || error.message);
            throw error;
        }
    },

    // Hapus user berdasarkan id
    async deleteUser(id) {
        try {
            console.log('🗑️ Deleting user:', id);
            const response = await axios.delete(API_URL, {
                headers,
                params: { id: `eq.${id}` }
            });
            console.log('✅ User deleted:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error in deleteUser:', error.response?.data || error.message);
            throw error;
        }
    }
};