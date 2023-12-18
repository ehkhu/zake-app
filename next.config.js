/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: () => {
        return [
            {
                source: '/backend/:path*',
                destination: 'http://dcms-backend.test/:path*',
            },
        ]
    },
}

module.exports = nextConfig
