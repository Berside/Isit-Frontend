import { observer } from "mobx-react-lite";
import { useContext, useState, useEffect } from 'react';
import { Context } from "../../index";
import "./Profile.css";
import { FetchUser } from "../../http/userAPI";

const Profile = observer(() => {
    const { user } = useContext(Context);
    const [error, setError] = useState('');
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                setIsLoading(true);
                const email = localStorage.getItem('email');
                const data = await FetchUser(email);
                setUserData(data);
                setIsLoading(false);
                if( data.role?.name === "admin") {
                    user.setIsAdmin(true);
                }
            } catch (e) {
                console.error('Ошибка при получении статистики:', e);
                setError(e.response?.data?.message || e.message || 'Ошибка загрузки данных');
                setIsLoading(false);
            } 
        };
        fetchUserStats();
    }, []); 

    if (isLoading) {
        return <div className="loading">Загрузка профиля...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!userData) {
        return <div className="error-message">Данные пользователя не найдены</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Профиль пользователя</h1>
                <p className="user-id">ID: {userData.id}</p>
            </div>
            
            <div className="profile-card">
                <div className="avatar-section">
                    <div className="avatar">
                        {userData.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <h2>{userData.username}</h2>
                    <p className="user-email">{userData.first_name} {userData.last_name} {userData.middle_name}</p>
                </div>
                
                <div className="user-details">
                    <div className="detail-row">
                        <span className="detail-label">Роль:</span>
                        <span className="detail-value capitalize">{userData.role?.name}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Дата регистрации:</span>
                        <span className="detail-value">
                            {new Date(userData.created_at).toLocaleDateString('ru-RU')}
                        </span>
                    </div>
                </div>
            </div>
            
            {userData.role?.permissions?.length > 0 && (
                <div className="additional-info">
                    <h3>Доступные разрешения</h3>
                    <div className="permissions-grid">
                        {userData.role.permissions.map((permission, index) => (
                            <div key={index} className="permission-item">
                                <div className="permission-name">{permission.permission}</div>
                                <div className="permission-database">{permission.database}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
});

export default Profile;