import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../config/firebase';
import { API_BASE_URL } from '../config/api';
import { getAuthToken } from '../utils/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FiMail, FiLock, FiUser, FiAlertCircle, FiLoader, FiBriefcase, FiBook } from 'react-icons/fi';
import { IconType } from 'react-icons';

const Icon = ({ icon: IconComponent, className }: { icon: IconType; className?: string }) => {
  return <IconComponent size={className?.includes('w-5') ? 20 : 16} />;
};

export function MentorSignup() {
  // Rest of the component code remains the same
}