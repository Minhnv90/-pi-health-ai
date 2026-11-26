// LOCKED FILE

          // *** System Configuration - NON-EDITABLE VALUES ***
          // This file contains configuration values that should not be modified during normal app customization.
          // These values are set during app creation.

          // Pi Network Configuration
          export const PI_NETWORK_CONFIG = {
            SDK_URL: "https://sdk.minepi.com/pi-sdk.js",
            SANDBOX: process.env.NEXT_PUBLIC_PI_SANDBOX === "true" || (typeof window !== "undefined" && window.location.hostname === "health-si-frontend-staging.nguyenminh2290.workers.dev"),
          } as const;

          // Backend Configuration
          export const BACKEND_CONFIG = {
            BASE_URL: "https://backend.appstudio-u7cm9zhmha0ruwv8.piappengine.com",
          } as const;

          // Backend URLs
          export const BACKEND_URLS = {
            LOGIN: `${BACKEND_CONFIG.BASE_URL}/v1/login`,

          } as const;
