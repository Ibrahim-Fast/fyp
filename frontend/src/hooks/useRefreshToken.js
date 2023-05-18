import { useContext } from "react";
import axios from "../api/axios";
import { UserState } from "../context/UserState";



const useRefreshToken = () => {
    const { set_user_state, rt, set_rt, set_at, refresh_count, set_refresh_count } = useContext(UserState)
    const refresh = async () => {
        try {
            if (refresh_count >= 19) {
                const response = await axios.post('/', {
                    'action': 'rrt',
                    'refresh_token': rt
                })
                set_refresh_count(0)
                set_rt(response.data.refresh_token)

            } else {

                const response = await axios.post('/', {
                    'action': 'rt',
                    'refresh_token': rt
                })
                set_refresh_count(prev => prev + 1)
                set_at(response.data.token)
            }
        }
        catch (err) {
            set_user_state("general")
            set_at("")
            set_rt("")
            set_refresh_count(0)
        }
    }
    return refresh
}

export default useRefreshToken