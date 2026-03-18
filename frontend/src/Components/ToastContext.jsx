import React, { createContext, useContext, useState, useCallback } from "react";
import Toast from "./Toast";
import ConfirmModal from "./ConfirmModal";

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const [confirmState, setConfirmState] = useState({
        isOpen: false,
        title: "",
        message: "",
        resolve: null
    });

    const showToast = useCallback((message, type = "success") => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
            removeToast(id);
        }, 4000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showConfirm = useCallback((message, title = "Are you sure?") => {
        return new Promise((resolve) => {
            setConfirmState({
                isOpen: true,
                title,
                message,
                resolve
            });
        });
    }, []);

    const handleConfirmResponse = (value) => {
        if (confirmState.resolve) {
            confirmState.resolve(value);
        }
        setConfirmState({ isOpen: false, title: "", message: "", resolve: null });
    };

    return (
        <ToastContext.Provider value={{ showToast, showConfirm }}>
            {children}
            <div className="toast-container">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
            <ConfirmModal
                isOpen={confirmState.isOpen}
                title={confirmState.title}
                message={confirmState.message}
                onConfirm={() => handleConfirmResponse(true)}
                onCancel={() => handleConfirmResponse(false)}
            />
        </ToastContext.Provider>
    );
};
