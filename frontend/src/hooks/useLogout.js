import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast';

const useLogout = () => {
  const [login, setLoading] = useState(false)
  const { authUser, setAuthUser } = useAuthContext();
  const logout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();

      if (data.error) {
        console.log(data.error);
      }

      localStorage.removeItem('chat-user');
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false)
    }
  }
  return { logout, login }
}

export default useLogout
