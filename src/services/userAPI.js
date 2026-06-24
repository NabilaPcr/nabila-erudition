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
            throw error;
        }
    },

    // Ambil user berdasarkan id
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
            throw error;
        }
    },

    // Cek email sudah terdaftar atau belum
    async checkEmailExists(email) {
        try {
            const response = await axios.get(API_URL, {
                headers,
                params: { 
                    email: `eq.${email}`,
                    select: 'email'
                }
            });
            return response.data.length > 0;
        } catch (error) {
            console.error('❌ Error in checkEmailExists:', error);
            throw error;
        }
    },

    // Login user
    async loginUser(email, password) {
        try {
            const response = await axios.get(API_URL, {
                headers,
                params: { 
                    email: `eq.${email}`,
                    password_hash: `eq.${password}`,  // ← perbaiki: password_hash
                    select: '*'
                }
            });
            return response.data[0] || null;
        } catch (error) {
            console.error('❌ Error in loginUser:', error);
            throw error;
        }
    },

    async createUser(data) {
        try {
            console.log('📝 Creating user:', data);
            const userData = {
                name: data.fullname,           
                email: data.email,
                password_hash: data.password,  
                role: data.role || 'user',     
              
            };
            
            console.log('📝 Mapped user data:', userData);
            
            const response = await axios.post(API_URL, userData, {
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

    async updateUser(id, data) {
        try {
            console.log('📝 Updating user:', id, data);
            
            const userData = {};
            if (data.fullname) userData.name = data.fullname;
            if (data.email) userData.email = data.email;
            if (data.password) userData.password_hash = data.password;
            if (data.role) userData.role = data.role;
            
            const response = await axios.patch(API_URL, userData, {
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