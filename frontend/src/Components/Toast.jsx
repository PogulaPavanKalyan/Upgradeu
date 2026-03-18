import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import "../Styles/Toast.css";

const Toast = ({ message, type = "success", onClose }) => {
    const icons = {
        success: <CheckCircle2 size={24} />,
        error: <AlertCircle size={24} />,
        info: <Info size={24} />,
        warning: <AlertTriangle size={24} />,
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`toast-item toast-${type}`}
        >
            <div className="toast-icon-wrapper">
                {icons[type]}
            </div>
            <div className="toast-content">
                <p className="toast-message">{message}</p>
            </div>
            <button className="toast-close-btn" onClick={onClose}>
                <X size={18} />
            </button>
        </motion.div>
    );
};

export default Toast;
