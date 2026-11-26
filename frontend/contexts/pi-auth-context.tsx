"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { PI_NETWORK_CONFIG, BACKEND_URLS } from "@/lib/system-config";
import { api, setApiAuthToken } from "@/lib/api";

export type LoginDTO = {
  id: string;
  username: string;
  credits_balance?: number;
  terms_accepted?: boolean;
};

interface PiAuthResult {
  accessToken: string;
  user: {
    uid: string;
    username: string;
  };
}

declare global {
  interface Window {
    Pi: {
      init: (config: { version: string; sandbox?: boolean }) => Promise<void>;
      authenticate: (scopes: string[], onIncompletePaymentFound: (payment: unknown) => void) => Promise<PiAuthResult>;
    };
  }
}

interface PiAuthContextType {
  isAuthenticated: boolean;
  authMessage: string;
  piAccessToken: string | null;
  userData: LoginDTO | null;
  reinitialize: () => Promise<void>;
}

const PiAuthContext = createContext<PiAuthContextType | undefined>(undefined);

function authDeadline<T>(promise: Promise<T>, stage: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(stage + " timed out")), 20000);
    promise.then(value => { clearTimeout(timer); resolve(value); }, error => { clearTimeout(timer); reject(error); });
  });
}

const loadPiSDK = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    if (!PI_NETWORK_CONFIG.SDK_URL) {
      throw new Error("SDK URL is not set");
    }
    script.src = PI_NETWORK_CONFIG.SDK_URL;
    script.async = true;

    script.onload = () => {
      console.log("✅ Pi SDK script loaded successfully");
      resolve();
    };

    script.onerror = () => {
      console.error("❌ Failed to load Pi SDK script");
      reject(new Error("Failed to load Pi SDK script"));
    };

    document.head.appendChild(script);
  });
};

export function PiAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMessage, setAuthMessage] = useState("Initializing Pi Network...");
  const [piAccessToken, setPiAccessToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<LoginDTO | null>(null);

  const authenticateAndLogin = async (): Promise<void> => {
    setAuthMessage("Authenticating with Pi Network...");
    const piAuthResult = await authDeadline(window.Pi.authenticate(["username"], () => {}), "Pi authentication");

    setAuthMessage("Logging in to backend...");
    if (!piAuthResult.accessToken) throw new Error("Missing Pi access token");
    const staging = window.location.hostname === "health-si-frontend-staging.nguyenminh2290.workers.dev";
    let verifiedUser: LoginDTO;
    if (staging) {
      const response = await fetch("https://pi-health-ai-staging.nguyenminh2290.workers.dev/api/pi/verify", {
        method: "POST", headers: { Authorization: `Bearer ${piAuthResult.accessToken}` },
        signal: AbortSignal.timeout(15000), redirect: "error",
      });
      if (!response.ok) throw new Error(`Pi verification HTTP ${response.status}`);
      const data = await response.json();
      if (data.verified !== true || typeof data.user?.uid !== "string" || !data.user.uid || typeof data.user.username !== "string" || data.user.uid !== piAuthResult.user.uid) throw new Error("Invalid verified identity");
      verifiedUser = { id: data.user.uid, username: data.user.username };
    } else {
      const loginRes = await authDeadline(api.post<LoginDTO>(BACKEND_URLS.LOGIN, { pi_auth_token: piAuthResult.accessToken }), "Backend login");
      if (!loginRes.data || typeof loginRes.data.id !== "string" || typeof loginRes.data.username !== "string") throw new Error("Invalid backend login response");
      verifiedUser = loginRes.data;
    }

    if (piAuthResult?.accessToken) {
      setPiAccessToken(piAuthResult.accessToken);
      setApiAuthToken(piAuthResult.accessToken);
    }

    setUserData(verifiedUser);
  };

  const initializePiAndAuthenticate = async () => {
    setIsAuthenticated(false);
    setPiAccessToken(null);
    setUserData(null);
    setApiAuthToken("");
    try {
      setAuthMessage("Loading Pi Network SDK...");

      // Only load if not already loaded
      if (typeof window.Pi === "undefined") {
        await authDeadline(loadPiSDK(), "Pi SDK load");
      }

      if (typeof window.Pi === "undefined") {
        throw new Error("Pi object not available after script load");
      }

      setAuthMessage("Initializing Pi Network...");
      await authDeadline(Promise.resolve(window.Pi.init({
        version: "2.0",
        sandbox: PI_NETWORK_CONFIG.SANDBOX,
      })), "Pi SDK init");

      await authenticateAndLogin();

      setIsAuthenticated(true);
    } catch (err) {
      console.error("Pi authentication failed");
      setAuthMessage(
        previous => `${previous} Failed. Please retry.`
      );
    }
  };

  useEffect(() => {
    initializePiAndAuthenticate();
  }, []);

  const value: PiAuthContextType = {
    isAuthenticated,
    authMessage,
    piAccessToken,
    userData,
    reinitialize: initializePiAndAuthenticate,
  };

  return (
    <PiAuthContext.Provider value={value}>{children}</PiAuthContext.Provider>
  );
}

/**
 * Hook to access Pi Network authentication state and user data
 *
 * Must be used within a component wrapped by PiAuthProvider.
 * Provides read-only access to authentication state and user data.
 *
 * @returns {PiAuthContextType} Authentication state and methods
 * @throws {Error} If used outside of PiAuthProvider
 *
 * @example
 * const { piAccessToken, userData, isAuthenticated, reinitialize } = usePiAuth();
 */
export function usePiAuth() {
  const context = useContext(PiAuthContext);
  if (context === undefined) {
    throw new Error("usePiAuth must be used within a PiAuthProvider");
  }
  return context;
}
