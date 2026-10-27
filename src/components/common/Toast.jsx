import React from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

export const Toast = ({ toast }) => {
  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'info':
        return <Info size={18} className="text-slate-500" />;
      case 'error':
        return <AlertCircle size={18} className="text-rose-500" />;
      default:
        return <Sparkles size={18} className="text-rose-600" />;
    }
  };

  return (
    <div className="toast-notification">
      <div className="toast-icon">{getIcon()}</div>
      <div className="toast-content">
        <span className="toast-message">{toast.message}</span>
      </div>
    </div>
  );
};
