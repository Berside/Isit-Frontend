import Main from "./pages/Main/Main"
import Profile from "./pages/Profile/Profile"
import Event from "./pages/Event/Event"
import Auth from "./pages/Auth/Auth"
import {MAIN,LOG, REG, PROF, EVENT, ABOUT, Allowance, Attendance, Disc, Discs, Sch, SCORE, Teach, Teachs} from "./utils/consts"
import About from "./pages/About/about"    
import Allow from "./pages/Allowance/Allow"
import attendance from "./pages/Attendance/attendance"
import Discipline from "./pages/Discipline/Discipline"
import Disciplines from "./pages/Disciplines/Disciplines"
import Schedule from "./pages/Schedule/Schedule"
import Score from "./pages/Score/Score"
import Teacher from "./pages/Teacher/Teacher"
import Teachers from "./pages/Teachers/Teachers"
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
        {
        path: ABOUT,
        Component: About
    },
        {
        path: Allowance,
        Component: Allow
    },
        {
        path: Attendance,
        Component: attendance
    },
        {
        path: Disc,
        Component: Discipline
    },
        {
        path: Discs,
        Component: Disciplines
    },
        {
        path: Sch,
        Component: Schedule
    },
        {
        path: SCORE,
        Component: Score
    },
            {
        path: Teach,
        Component: Teacher
    },
            {
        path: Teachs,
        Component: Teachers
    },
]