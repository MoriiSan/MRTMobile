import React, { createContext, useContext, useEffect, useState } from 'react';
import UserInactivity from 'react-native-user-detector-active-inactive';
import SessionModal from './sessionTimeoutModal';

interface UserInactivityContextType {
    resetTimer: () => void;
}

const UserInactivityContext = createContext<UserInactivityContextType>({ resetTimer: () => { } });

interface UserInactivityWrapperProps {
    children: React.ReactNode;
}

const UserInactivityWrapper: React.FC<UserInactivityWrapperProps> = ({ children }) => {
    const [timerKey, setTimerKey] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const resetTimer = () => {
        setTimerKey(prevKey => prevKey + 1);
    };

    // Reset the timer on component mount
    useEffect(() => {
        resetTimer();
    }, []);

    return (
        <>
            <UserInactivityContext.Provider value={{ resetTimer }}>
                <UserInactivity
                    key={timerKey}
                    timeForInactivity={600} // Set time for timeout
                    onHandleActiveInactive={() => {
                        resetTimer();
                        setIsModalVisible(true);
                    }}
                >
                    {children}
                </UserInactivity>
            </UserInactivityContext.Provider>
            <SessionModal // Render the modal
                isVisible={isModalVisible}
                onClose={() => { }}
                title="SESSION TIME OUT"
                message="Launch the app again to use."
            />
        </>
    );
};

export default UserInactivityWrapper;

export const useUserInactivity = () => useContext(UserInactivityContext);