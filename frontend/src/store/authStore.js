import {create} from "zustand"
import axios from "axios"

axios.defaults.withCredentials=true
const API_URL ="http://localhost:5000/api/auth"
export const useAuthStore=create((set)=>({
    user :null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isChekingAuth:true,
    message: null,

    singup: async (name,email,password)=>{
        set({isLoading:true,error:null})
        try {
            const response = await axios.post(`${API_URL}/singup`,{name,email,password})
            set({user:response.data.user,isAuthenticated:true,isLoading:false})
     
        } catch (error) {
            set({error:error.response.data.message || "Error sing in", isLoading:false})
            throw error
            
        }
    },
    login: async (email,password)=>{
        set({isLoading:true,error:null})
        try {
            const response = await axios.post(`${API_URL}/login`,{email,password})
            set({user:response.data.user,isAuthenticated:true,isLoading:false})
     
        } catch (error) {
            set({error:error.response?.data?.message || "Error log in", isLoading:false})
            throw error
            
        }
    },

    verifyEmail : async(code)=>{
        set({isLoading:true,error:null})
       try {
        
           const response = await axios.post(`${API_URL}/verify-email`,{code})
           set({user:response.data.user,isAuthenticated:true,isLoading:false})
          
       } catch (error) {
        console.log(error.response.data.message )
        set({error:error.response.data.message || "Error in verify email", isLoading:false})
        
        
            throw error
       }

    },

    checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/check-auth`);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},

    logout : async ()=>{
        set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
    },

    forgorPassword:async(email)=>{
        set({isLoading:true,error:null})
        try {
            const response = await axios.post(`${API_URL}/forgot-password`,{email})
            set({message:response.data.message,isLoading:false})
        } catch (error) {
            set({
                error:error.response.data.message || "Error sending  link of reset password email",
                isLoading:false
            })
            throw error;
        }

    },
    resetPassword :async (token,password)=>{
        set({isLoading:true,error:null})
        try {
            const response = await axios.post(`${API_URL}//reset-password/${token}`,{password})
            set({message:response.data.message,isLoading:false})
        } catch (error) {
            set({
                error:error.response.data.message || "Error sending reset password email",
                isLoading:false
            })
            throw error;
        }

    }






}))