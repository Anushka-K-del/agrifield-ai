import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEMO_USER_STORAGE_KEY = 'agrishield_auth_user';
const SCAN_HISTORY_STORAGE_KEY = 'agrishield_scan_history';

// Default mock user for quick hackathon evaluation
export const DEMO_PRESET_USER = {
  uid: 'demo-farmer-01',
  name: 'Ramesh Patil',
  email: 'ramesh.patil@agrishield.ai',
  avatar: '🌾',
  role: 'Smallholder Farmer',
  district: 'Nashik, Maharashtra'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup'
  const [isScanHistoryOpen, setIsScanHistoryOpen] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(DEMO_USER_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const storedHistory = localStorage.getItem(SCAN_HISTORY_STORAGE_KEY);
      if (storedHistory) {
        setScanHistory(JSON.parse(storedHistory));
      } else {
        // Seed with 1 initial sample scan for demonstration
        const seedHistory = [
          {
            id: 'scan-seed-1',
            timestamp: new Date(Date.now() - 24 * 3600 * 1000 * 2).toISOString(),
            crop: 'Tomato',
            disease: 'Early Blight (Alternaria solani)',
            confidence: 94.6,
            severity: 'Moderate (35% Foliar Infection)',
            remedyOrganic: 'Apply cold-pressed Neem Oil spray (5ml/L) and remove infected lower foliage.',
            remedyChemical: 'Targeted Mancozeb 75% WP @ 2.5g per litre of water at 7-day intervals.',
            voiceText: 'Tomato Early Blight detected with 94.6 percent confidence. Moderate severity. Apply neem oil spray and remove lower infected leaves.',
            imageName: 'tomato_early_blight_sample.jpg'
          }
        ];
        setScanHistory(seedHistory);
        localStorage.setItem(SCAN_HISTORY_STORAGE_KEY, JSON.stringify(seedHistory));
      }
    } catch (err) {
      console.error('Error loading stored auth state:', err);
    }
  }, []);

  // Sync scan history to localStorage
  const saveScan = (scanData) => {
    const newScan = {
      id: `scan-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...scanData
    };
    const updated = [newScan, ...scanHistory];
    setScanHistory(updated);
    try {
      localStorage.setItem(SCAN_HISTORY_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to persist scan history:', err);
    }
    return newScan;
  };

  const deleteScan = (scanId) => {
    const updated = scanHistory.filter(s => s.id !== scanId);
    setScanHistory(updated);
    try {
      localStorage.setItem(SCAN_HISTORY_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to update scan history:', err);
    }
  };

  const clearScanHistory = () => {
    setScanHistory([]);
    localStorage.removeItem(SCAN_HISTORY_STORAGE_KEY);
  };

  // Sign In
  const logIn = (email, password) => {
    const registeredUsers = JSON.parse(localStorage.getItem('agrishield_registered_users') || '[]');
    const matched = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (matched) {
      if (matched.password !== password) {
        throw new Error('Incorrect password. Please try again or use Quick Demo Login.');
      }
      const activeUser = {
        uid: matched.uid,
        name: matched.name,
        email: matched.email,
        avatar: matched.avatar || '🌱',
        role: matched.role || 'Farmer'
      };
      setUser(activeUser);
      localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(activeUser));
      setIsAuthModalOpen(false);
      return activeUser;
    }

    if (email.toLowerCase() === DEMO_PRESET_USER.email.toLowerCase()) {
      setUser(DEMO_PRESET_USER);
      localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(DEMO_PRESET_USER));
      setIsAuthModalOpen(false);
      return DEMO_PRESET_USER;
    }

    // Fallback: create session for entered credentials in demo mode
    const newUser = {
      uid: `user-${Date.now()}`,
      name: email.split('@')[0],
      email,
      avatar: '🌱',
      role: 'Smallholder Farmer'
    };
    setUser(newUser);
    localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(newUser));
    setIsAuthModalOpen(false);
    return newUser;
  };

  // Sign Up
  const signUp = (name, email, password) => {
    const registeredUsers = JSON.parse(localStorage.getItem('agrishield_registered_users') || '[]');
    const exists = registeredUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      throw new Error('An account with this email already exists. Please log in.');
    }

    const newUserRecord = {
      uid: `user-${Date.now()}`,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      avatar: '🌾',
      role: 'Smallholder Farmer',
      createdAt: new Date().toISOString()
    };

    registeredUsers.push(newUserRecord);
    localStorage.setItem('agrishield_registered_users', JSON.stringify(registeredUsers));

    const activeUser = {
      uid: newUserRecord.uid,
      name: newUserRecord.name,
      email: newUserRecord.email,
      avatar: newUserRecord.avatar,
      role: newUserRecord.role
    };

    setUser(activeUser);
    localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(activeUser));
    setIsAuthModalOpen(false);
    return activeUser;
  };

  // 1-Click Quick Demo Login (ideal for Hackathon Evaluators)
  const demoLogin = () => {
    setUser(DEMO_PRESET_USER);
    localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(DEMO_PRESET_USER));
    setIsAuthModalOpen(false);
    return DEMO_PRESET_USER;
  };

  // Sign Out
  const logOut = () => {
    setUser(null);
    localStorage.removeItem(DEMO_USER_STORAGE_KEY);
  };

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openScanHistory = () => {
    if (!user) {
      openAuthModal('login');
      return;
    }
    setIsScanHistoryOpen(true);
  };

  const closeScanHistory = () => {
    setIsScanHistoryOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        scanHistory,
        saveScan,
        deleteScan,
        clearScanHistory,
        logIn,
        signUp,
        demoLogin,
        logOut,
        isAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        closeAuthModal,
        isScanHistoryOpen,
        openScanHistory,
        closeScanHistory
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
