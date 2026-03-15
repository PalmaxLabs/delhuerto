import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, AlertCircle, HelpCircle, CheckCircle2 } from 'lucide-react';

interface CustomModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  type?: 'alert' | 'confirm' | 'success' | 'error';
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  title,
  message,
  type = 'alert',
  onConfirm,
  onCancel,
  confirmText = 'Aceptar',
  cancelText = 'Cancelar'
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel || onConfirm}
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, rotate: 1 }}
            className="relative w-full max-w-md bg-white p-8 sketch-card z-10"
          >
            {/* Close Button */}
            <button
              onClick={onCancel || onConfirm}
              className="absolute top-4 right-4 p-1 text-stone-400 hover:text-stone-800 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center space-y-4">
              {/* Icon Based on Type */}
              <div className={`p-3 rounded-full border-2 border-stone-800 ${
                type === 'error' ? 'bg-red-50 text-red-600' :
                type === 'success' ? 'bg-green-50 text-green-600' :
                type === 'confirm' ? 'bg-blue-50 text-blue-600' :
                'bg-amber-50 text-amber-600'
              }`}>
                {type === 'error' && <AlertCircle size={32} />}
                {type === 'success' && <CheckCircle2 size={32} />}
                {type === 'confirm' && <HelpCircle size={32} />}
                {type === 'alert' && <AlertCircle size={32} />}
              </div>

              {title && (
                <h3 className="text-2xl font-serif font-bold text-stone-800">
                  {title}
                </h3>
              )}

              <p className="text-stone-600 font-medium leading-relaxed">
                {message}
              </p>

              <div className="flex flex-wrap gap-4 w-full pt-4">
                {onCancel && (
                  <button
                    onClick={onCancel}
                    className="flex-1 px-6 py-3 border-2 border-stone-800 font-bold text-stone-800 hover:bg-stone-50 transition-colors rounded-xl cursor-pointer"
                  >
                    {cancelText}
                  </button>
                )}
                <button
                  onClick={onConfirm}
                  className={`flex-1 sketch-button !py-3 !px-6 !shadow-none hover:!translate-y-[-2px] active:!translate-y-[0px] cursor-pointer ${
                    type === 'error' ? 'bg-red-600 hover:bg-red-700' :
                    type === 'success' ? 'bg-brand-leaf hover:bg-green-700' :
                    'bg-stone-900 hover:bg-stone-800'
                  }`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
