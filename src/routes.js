import Main from "./pages/Main/Main"
import Profile from "./pages/Profile/Profile"
import Event from "./pages/Event/Event"
import Auth from "./pages/Auth/Auth"
import {MAIN,LOG, PROF, EVENT, ABOUT, Allowance, Attendance, Disc, Discs, Sch, SCORE, Teach, Teachs, ProfScorE, Dopusk, RaspPROF, BOT, AtProf} from "./utils/consts"
import About from "./pages/About/about"    
import Allow from "./pages/Allowance/Allow"
import attendance from "./pages/Attendance/attendance"
import Discipline from "./pages/Discipline/Discipline"
import Disciplines from "./pages/Disciplines/Disciplines"
import Schedule from "./pages/Schedule/Schedule"
import Score from "./pages/Score/Score"
import Teacher from "./pages/Teacher/Teacher"
import Teachers from "./pages/Teachers/Teachers"
import ProfScore from "./pages/ProfScore/ProfScore"
import DopuskProf from "./pages/dopuskProf/DopuskProf"
import RaspProf from "./pages/RaspProf/RaspProf"
import Assistant from "./pages/Bot/Bot"
import AttendProf from "./pages/AttendanceProf/AttendProf"
export const authRoutes = [
    {
        path: PROF,
        Component: Profile
    },
        {
        path: AtProf,
        Component: AttendProf
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
        path: Sch,
        Component: Schedule
    },
        {
        path: SCORE,
        Component: Score
    },
         {
        path: ProfScorE,
        Component: ProfScore
    },
         {
        path: Dopusk,
        Component: DopuskProf
    },
             {
        path: RaspPROF,
        Component: RaspProf
    },
     {
        path: BOT,
        Component: Assistant
    },


]
export const publicRoutes = [
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
        path: Disc + '/:id' ,
        Component: Discipline
    },
        {
        path: Discs,
        Component: Disciplines
    },
            {
        path: Teach  + '/:id',
        Component: Teacher
    },
            {
        path: Teachs,
        Component: Teachers
    },
]