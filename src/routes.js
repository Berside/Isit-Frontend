import Main from "./pages/Main/Main"
import Profile from "./pages/Profile/Profile"
import Event from "./pages/Event/Event"
import Auth from "./pages/Auth/Auth"
import {MAIN,LOG, REG, PROF, EVENT} from "./utils/consts"

export const authRoutes = [
    {
        path: PROF,
        Component: Profile
    },

]
export const publicRoutes = [
    {
        path: REG,
        Component: Auth

    },
    {
        path: LOG,
        Component: Auth

    },
    {
        path: MAIN,
        Component: Main
    },
    {
        path: EVENT,
        Component: Event
    },
]