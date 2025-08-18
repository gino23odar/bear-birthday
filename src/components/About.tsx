'use client';

import { motion } from 'framer-motion';
import { getApiConfig } from '@/lib/api';

const About = () => {
  const apiConfig = getApiConfig();

  return (
    <div className="section-padding bg-gradient-to-br from-white/60 via-[var(--primary)]/6 to-[var(--accent)]/6">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h1 className="heading-xl text-gradient mb-4">About Birthday Bear</h1>
          <p className="text-body max-w-3xl mx-auto">
            A small celebration website created with love for the philologist who finds poetry in nature.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-8"
          >
            <div className="card p-8">
              <h2 className="heading-lg text-deep mb-4 flex items-center">
                <span className="text-3xl mr-4">🎂</span>
                What is Birthday Bear?
              </h2>
              <p className="text-body mb-4">
                Birthday Bear is a lovingly crafted site that celebrates the intersection of language, nature, and joy.
                It&apos;s made for someone who appreciates the beauty of words, the serenity of rivers, the song of birds,
                and the charm of tiny svinkas.
              </p>
              <p className="text-body">
                The site combines modern web tech with thoughtful design to create an experience both playful and sophisticated.
              </p>
            </div>

            <div className="card p-8">
              <h2 className="heading-lg text-deep mb-4 flex items-center">
                <span className="text-3xl mr-4">🌟</span>
                Features
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-[var(--primary)]/6 to-transparent rounded-xl">
                  <span className="text-2xl text-[var(--primary)]">✨</span>
                  <div>
                    <p className="font-semibold text-deep">LLM Playground</p>
                    <p className="text-caption">Connect to local AI models for creative text & image generation.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-[var(--accent)]/6 to-transparent rounded-xl">
                  <span className="text-2xl text-[var(--accent)]">🔮</span>
                  <div>
                    <p className="font-semibold text-deep">Fortune Cards</p>
                    <p className="text-caption">Interactive cards with poetic messages and gentle animations.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-[var(--primary)]/6 to-transparent rounded-xl">
                  <span className="text-2xl text-[var(--primary)]">🖼️</span>
                  <div>
                    <p className="font-semibold text-deep">Gallery</p>
                    <p className="text-caption">Curated birds & svinkas with a lightbox for close viewing.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-[var(--accent)]/6 to-transparent rounded-xl">
                  <span className="text-2xl text-[var(--accent)]">🎨</span>
                  <div>
                    <p className="font-semibold text-deep">Responsive Design</p>
                    <p className="text-caption">Beautiful on all devices with smooth micro-interactions.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <h2 className="heading-lg text-deep mb-4 flex items-center">
                <span className="text-3xl mr-4">🛠️</span>
                Technical Details
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[color:var(--deep)]/5 rounded-xl">
                    <p className="text-sm font-semibold text-[var(--deep)]/60 mb-1">Built with</p>
                    <p className="text-deep font-medium">Next.js, TypeScript, TailwindCSS, Framer Motion</p>
                  </div>
                  <div className="p-4 bg-[color:var(--deep)]/5 rounded-xl">
                    <p className="text-sm font-semibold text-[var(--deep)]/60 mb-1">Current Mode</p>
                    <p className="text-deep font-medium">{apiConfig.isMock ? 'Mock (Demo)' : 'Connected to Backend'}</p>
                  </div>
                  <div className="p-4 bg-[color:var(--deep)]/5 rounded-xl">
                    <p className="text-sm font-semibold text-[var(--deep)]/60 mb-1">Backend URL</p>
                    <p className="text-deep font-medium font-mono text-sm">{apiConfig.baseUrl}</p>
                  </div>
                  <div className="p-4 bg-[color:var(--deep)]/5 rounded-xl">
                    <p className="text-sm font-semibold text-[var(--deep)]/60 mb-1">Status</p>
                    <p className="text-deep font-medium">{apiConfig.hasBackend ? '✅ Backend Connected' : '🎭 Running with Mock Data'}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* API / Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="card p-8">
              <h2 className="heading-lg text-deep mb-4 flex items-center">
                <span className="text-3xl mr-4">🔌</span>
                Backend API Contract
              </h2>
              <p className="text-body mb-4">To connect this frontend to your local ComfyUI + WAN 2.2 setup, implement:</p>

              <div className="bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 rounded-xl p-5 mb-4 border border-[color:var(--primary)]/20">
                <h3 className="font-semibold text-deep mb-2">Environment Variable</h3>
                <code className="text-sm bg-white/80 p-3 rounded-md block font-mono border border-[color:var(--primary)]/20">
                  NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
                </code>
              </div>

              <div className="space-y-5">
                <div className="bg-[color:var(--deep)]/5 p-4 rounded-xl border border-[color:var(--deep)]/20">
                  <h4 className="font-semibold text-deep mb-2 flex items-center"><span className="text-[var(--primary)] mr-2">📤</span> POST /api/v1/generate</h4>
                  <p className="text-caption mb-2">Generate text or images using local models</p>
                  <pre className="text-xs text-deep/80 bg-white/80 p-3 rounded-md overflow-x-auto">
{`Request Body:
{
  "model": "wan-2.2",
  "type": "text" | "image",
  "prompt": "string",
  "options": { "max_tokens":512, "temperature":0.7, "seed":null, "image_width":512, "image_height":512 }
}`}
                  </pre>
                </div>

                <div className="bg-[color:var(--deep)]/5 p-4 rounded-xl border border-[color:var(--deep)]/20">
                  <h4 className="font-semibold text-deep mb-2 flex items-center"><span className="text-[var(--accent)] mr-2">📥</span> GET /api/v1/status/:id</h4>
                  <p className="text-caption mb-2">Check job status and retrieve results</p>
                  <pre className="text-xs text-deep/80 bg-white/80 p-3 rounded-md overflow-x-auto">
{`Response:
{
  "id":"uuid",
  "status":"completed"|"processing"|"failed",
  "result": { "type":"text"|"image", "text":"...", "imageBase64":"...", "mime":"image/png" }
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <h2 className="heading-lg text-deep mb-4 flex items-center"><span className="text-3xl mr-4">🚀</span> Getting Started with Backend</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-[var(--primary)]/6 to-transparent rounded-xl">
                  <p className="font-semibold text-deep mb-2">1. Set Environment Variable:</p>
                                     <code className="bg-white/80 p-2 rounded-md block text-xs font-mono border border-[color:var(--primary)]/20">
                     echo &quot;NEXT_PUBLIC_API_BASE_URL=http://localhost:8000&quot; &gt; .env.local
                   </code>
                </div>

                <div className="p-4 bg-gradient-to-r from-[var(--accent)]/6 to-transparent rounded-xl">
                  <p className="font-semibold text-deep mb-2">2. Start Your Backend:</p>
                  <p className="text-caption">Run your ComfyUI + WAN 2.2 on the specified port</p>
                </div>

                <div className="p-4 bg-gradient-to-r from-[var(--primary)]/6 to-transparent rounded-xl">
                  <p className="font-semibold text-deep mb-2">3. CORS:</p>
                  <p className="text-caption">Allow the dev origin or use a secure tunnel (ngrok) for remote access.</p>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <h2 className="heading-lg text-deep mb-4 flex items-center"><span className="text-3xl mr-4">⚠️</span> Security Notes</h2>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                  <p className="font-semibold text-red-800 mb-1">Local Development Only</p>
                  <p className="text-red-700 text-sm">This is meant for local use. Exposing a local LLM publicly is insecure.</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <p className="font-semibold text-yellow-800 mb-1">For Remote Access</p>
                  <p className="text-yellow-700 text-sm">Use authenticated tunnels or VPN with caution.</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="font-semibold text-blue-800 mb-1">Authentication</p>
                  <p className="text-blue-700 text-sm">Consider API key protection for any exposed endpoints.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Next steps */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="card p-8 max-w-4xl mx-auto">
            <h3 className="heading-md text-deep mb-4">Next Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-gradient-to-r from-[var(--primary)]/6 to-transparent rounded-xl border border-[color:var(--primary)]/20">
                <div className="text-2xl mb-2">1️⃣</div>
                <p className="font-semibold text-deep mb-1">Implement Backend</p>
                <p className="text-caption">Create the API endpoints for ComfyUI</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-[var(--accent)]/6 to-transparent rounded-xl border border-[color:var(--accent)]/20">
                <div className="text-2xl mb-2">2️⃣</div>
                <p className="font-semibold text-deep mb-1">Set Environment</p>
                <p className="text-caption">Configure NEXT_PUBLIC_API_BASE_URL</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-[var(--primary)]/6 to-transparent rounded-xl border border-[color:var(--primary)]/20">
                <div className="text-2xl mb-2">3️⃣</div>
                <p className="font-semibold text-deep mb-1">Test Integration</p>
                <p className="text-caption">Verify the LLM Playground communicates with your backend</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-[var(--accent)]/6 to-transparent rounded-xl border border-[color:var(--accent)]/20">
                <div className="text-2xl mb-2">4️⃣</div>
                <p className="font-semibold text-deep mb-1">Customize Content</p>
                <p className="text-caption">Replace placeholder images and add personal content</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-[var(--primary)]/6 to-transparent rounded-xl border border-[color:var(--primary)]/20">
                <div className="text-2xl mb-2">5️⃣</div>
                <p className="font-semibold text-deep mb-1">Deploy</p>
                <p className="text-caption">Deploy the frontend when you secure the backend</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-[var(--accent)]/6 to-transparent rounded-xl border border-[color:var(--accent)]/20">
                <div className="text-2xl mb-2">🚀</div>
                <p className="font-semibold text-deep mb-1">Enhance</p>
                <p className="text-caption">Add more features like model selection and saved prompts</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
