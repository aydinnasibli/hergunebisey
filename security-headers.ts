// security-headers.ts
import type { NextConfig } from 'next';

export function withSecurityHeaders(nextConfig: NextConfig = {}): NextConfig {
    return {
        ...nextConfig,
        async headers() {
            const headersConfig = [
                {
                    // Apply to all routes except studio
                    source: '/:path*',
                    headers: [
                        {
                            key: 'Content-Security-Policy',
                            value: `
                                default-src 'self';
                                script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io https://*.sanity.io https://*.beehiiv.com https://embeds.beehiiv.com;
                                style-src 'self' 'unsafe-inline' https://*.sanity.io https://*.beehiiv.com https://embeds.beehiiv.com;
                                img-src 'self' data: https://*.sanity.io https://*.beehiiv.com https://embeds.beehiiv.com;
                                font-src 'self' data: https://*.sanity.io https://*.beehiiv.com;
                                connect-src 'self' https://plausible.io https://*.sanity.io https://*.mongodb.net mongodb://* 
                                    https://api.sendgrid.com https://api.mailgun.net https://api.sendinblue.com https://api.mailchimp.com 
                                    https://smtpjs.com https://smtp.gmail.com https://mail.google.com https://*.beehiiv.com 
                                    https://embeds.beehiiv.com https://*.px-cloud.net https://*.pxchk.net https://*.px-cdn.net 
                                    https://*.pxe-cloud.net https://*.collector-pxebumqlwe.* https://fzm.*; 
                                frame-src 'self' https://*.sanity.io https://*.beehiiv.com https://embeds.beehiiv.com;
                                form-action 'self' https://*.beehiiv.com https://embeds.beehiiv.com;
                                base-uri 'self';
                                object-src 'none';
                            `.replace(/\s+/g, ' ').trim(),
                        },
                        {
                            key: 'X-Frame-Options',
                            value: 'SAMEORIGIN',
                        },
                        {
                            key: 'X-Content-Type-Options',
                            value: 'nosniff',
                        },
                        {
                            key: 'Referrer-Policy',
                            value: 'strict-origin-when-cross-origin',
                        },
                        {
                            key: 'Permissions-Policy',
                            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=()',
                        },
                    ],
                },
                {
                    // Special relaxed rules for Sanity Studio
                    source: '/studio/:path*',
                    headers: [
                        {
                            key: 'Content-Security-Policy',
                            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.sanity.io; style-src 'self' 'unsafe-inline' https://*.sanity.io; img-src 'self' data: blob: https://*.sanity.io; font-src 'self' data: https://*.sanity.io; connect-src 'self' https://*.sanity.io wss://*.sanity.io https://api.sanity.io; frame-src 'self' https://*.sanity.io; frame-ancestors 'self'; form-action 'self'; base-uri 'self'; object-src 'none';",
                        },
                        {
                            key: 'X-Frame-Options',
                            value: 'SAMEORIGIN',
                        },
                        {
                            key: 'X-Content-Type-Options',
                            value: 'nosniff',
                        },
                        {
                            key: 'Referrer-Policy',
                            value: 'strict-origin-when-cross-origin',
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