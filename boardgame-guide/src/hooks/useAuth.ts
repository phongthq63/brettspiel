import {RLoginResponse, RObject} from "@/service/server/gateway.service";
import {useUser} from "@/store/user.context";

type SocialProvider = 'google' | 'facebook' | 'microsoft';

const useAuth = () => {
    const { reload } = useUser();

    const login = async (email: string, password: string) => {
        const formData = new URLSearchParams();
        formData.append("username", email)
        formData.append("password", password)

        return await fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            credentials: 'include',
        }).then(response => response.json())
            .then(data => {
                reload()
                return data as RLoginResponse
            })
    }

    const loginWithSocial = async (provider: SocialProvider) => {
        console.log(provider)
    }

    const register = async (email: string, password: string, confirmPassword: string) => {
        const formData = new URLSearchParams();
        formData.append("email", email)
        formData.append("password", password)
        formData.append("confirmPassword", confirmPassword)

        return await fetch('/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            credentials: 'include',
        }).then(response => response.json())
            .then(data => data as RObject)
    }

    const logout = async () => {
        return await fetch('/api/logout', {
            method: 'POST',
            credentials: 'include',
        }).then(response => response.json())
            .then(data => {
                reload()
                return data as RObject
            })
    }

    return { login, loginWithSocial, register, logout }
}

export default useAuth