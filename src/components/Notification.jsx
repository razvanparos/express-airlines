import { useContext } from 'react';
import { MdClose } from "react-icons/md";
import { AppContext } from './../context/AppContext';
import notificationActions from '../context/actions/notification-actions';

export default function Notification() {
  const { state } = useContext(AppContext);
  const { notification } = state;

  const notificationColorClasses = {
    info: 'bg-blue-300 text-black',
    error: 'bg-red-700 text-white',
    success: 'bg-green-700 text-white',
  };

  return notification ? (
    <div
      className={`
          fixed
          top-4
          left-4
          right-4
          flex
          justify-between
          items-center
          py-2
          px-4
          z-50
          rounded-lg
          shadow-lg
          ${notificationColorClasses[notification.type] || ''}
        `}
    >
      <span>{notification.message || ''}</span>

      <button
        className={`
        text-2xl
        self-start
        ${notificationColorClasses[notification.type]}`}
        onClick={notificationActions.hideNotification}
      >
        <MdClose />
      </button>
    </div>
  ) : null;
}
