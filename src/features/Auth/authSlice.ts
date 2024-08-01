import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppState } from "../../app/store"

export type AuthType = {
    id: number | null,
    name: string | null,
    email: string | null,
    isAuth: boolean,
    error: string | null,
}

const usersEmails = ["Sincere@april.biz", "Shanna@melissa.tv", "Nathan@yesenia.net", "Julianne.OConner@kory.org",
    "Lucio_Hettinger@annie.ca", "Karley_Dach@jasper.info", "Telly.Hoeger@billy.biz", "Sherwood@rosamond.me",
    "Chaim_McDermott@dana.io", "Rey.Padberg@karina.biz"
]
const usersNames = ["Leanne Graham", "Antonette", "Clementine Bauch", "Patricia Lebsack", "Chelsey Dietrich",
    "Mrs. Dennis Schulist", "Kurtis Weissnat", "Nicholas Runolfsdottir V", "Glenna Reichert", "Clementina DuBuque"
]

const initialState: AuthType = {
    id: null,
    name: null,
    email: null,
    isAuth: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            
            const index = usersEmails.indexOf(action.payload);
            if (index !== -1) {
                state.id = index + 1;
                state.email = usersEmails[index];
                state.name = usersNames[index];
                state.isAuth = true;
                state.error = null;
            }
            else {
                state.error = 'Invalid email';
            }
        },
        logout: (state) => {
            state.id = null;
            state.email = null;
            state.name = null;
            state.isAuth = false;
        }
    }
})

export const { login, logout } = authSlice.actions;
export const selectAuthData = (state: AppState) => state.auth;
export default authSlice.reducer;