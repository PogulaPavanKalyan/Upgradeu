import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import "../Styles/ConfirmModal.css";

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="confirm-modal-backdrop">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="confirm-modal-content"
                    >
                        <div className="confirm-modal-icon-wrapper">
                            <AlertTriangle size={32} />
                        </div>
                        <h3>{title || "Are you sure?"}</h3>
                        <p>{message}</p>
                        <div className="confirm-modal-actions">
                            <button className="confirm-modal-btn cancel" onClick={onCancel}>
                                Cancel
                            </button>
                            <button className="confirm-modal-btn confirm" onClick={onConfirm}>
                                Confirm
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmModal;
