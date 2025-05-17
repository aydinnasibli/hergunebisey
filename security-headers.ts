// security-headers.ts
import type { NextConfig } from 'next';


export function withSecurityHeaders(nextConfig: NextConfig = {}): NextConfig {
    return {
        ...nextConfig,
        async headers() {
            const headersConfig = [
                {
                    source: '/:path*',
                    headers: [
                        // ALREADY IMPLEMENTED
                        // {
                        //   key: 'Strict-Transport-Security',
                        //   value: 'max-age=63072000; includeSubDomains; preload',
                        // },

                        // CONTENT SECURITY POLICY
                        // Production-ready but should be tailored to your specific needs
                        {
                            key: 'Content-Security-Policy',
                            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://analytics.hergunebisey.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.hergunebisey.net; font-src 'self'; connect-src 'self' https://*.hergunebisey.net; frame-src 'self'; form-action 'self'; base-uri 'self'; object-src 'none';",
                        },

                        // PREVENT CLICKJACKING - COMMON PRODUCTION VALUE
                        {
                            key: 'X-Frame-Options',
                            value: 'SAMEORIGIN',
                        },

                        // PREVENT MIME TYPE SNIFFING - STANDARD VALUE
                        {
                            key: 'X-Content-Type-Options',
                            value: 'nosniff',
                        },

                        // CONTROL REFERRER INFORMATION - COMMON PRODUCTION VALUE
                        {
                            key: 'Referrer-Policy',
                            value: 'strict-origin-when-cross-origin',
                        },

                        // CONTROL BROWSER FEATURES - COMMONLY USED RESTRICTIONS
                        {
                            key: 'Permissions-Policy',
                            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=()',
                        },
                    ],
                },
            ];

            return [
                ...(nextConfig.headers ? await nextConfig.headers() : []),
                ...headersConfig,
            ];
        },
    };
}