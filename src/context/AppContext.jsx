import { createContext, useEffect, useState, useContext } from "react"; // Added useContext
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from "../assets/assets";

const AppContext = createContext();

// Changed { Children } to { children }
export const AppContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || "light");

    const fetchUser = async () => {
        setUser(dummyUserData);
    };

    const fetchUserChats = async () => {
        setChats(dummyChats);
        setSelectedChat(dummyChats[0]);
    };

    useEffect(() => {
        if (user) {
            fetchUserChats();
        } else {
            setSelectedChat(null); // Fixed: was selectedChat(null)
        }
    }, [user]);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark'); // Good practice to sync
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        localStorage.setItem("theme" , theme)
    }, [theme]);

    useEffect(() => {
        fetchUser();
    }, []);

    // Cleaned up the value object
    const value = {
        navigate, 
        user, 
        setUser, 
        fetchUser, 
        chats, 
        setChats, 
        selectedChat, 
        setSelectedChat, 
        theme, 
        setTheme
    };

    return (
        <AppContext.Provider value={value}>
            {children} 
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);