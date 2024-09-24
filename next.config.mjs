/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        // domains:['wipronorthwest.com']
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",        
            },
          ],
    },
    env:{
        HOST:'http://localhost:3000'
    },
    
};

export default nextConfig;
