'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGenerateContent } from '@/hooks/useApi';
import { GenerateRequest } from '@/types';
import { mockData } from '@/mocks/data';
import { isMockMode } from '@/lib/api';

const LLMPlayground = () => {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('wan-2.2');
  const [type, setType] = useState<'text' | 'image'>('text');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(512);
  
  const { generate, isLoading, error, result, reset } = useGenerateContent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const request: GenerateRequest = {
      model,
      type,
      prompt: prompt.trim(),
      options: {
        max_tokens: maxTokens,
        temperature,
        seed: null,
        image_width: 512,
        image_height: 512,
      },
    };

    try {
      await generate(request);
    } catch {
      // Error is handled by the hook
    }
  };

  const handleSamplePrompt = (samplePrompt: string) => {
    setPrompt(samplePrompt);
  };

  const handleReset = () => {
    reset();
    setPrompt('');
  };

  return (
    <div className="section-padding bg-gradient-to-br from-white/50 to-primary/5">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="heading-xl text-gradient mb-6">
            LLM Playground
          </h1>
          <p className="text-body max-w-3xl mx-auto">
            Connect to your local ComfyUI + WAN 2.2 setup or explore with mock responses.
            {isMockMode() && (
              <span className="block text-sm text-accent font-medium mt-3 px-4 py-2 bg-accent/10 rounded-full inline-block">
                🎭 Currently running in mock mode
              </span>
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="xl:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Model and Type Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-deep">
                      Model
                    </label>
                    <select
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                    >
                      <option value="wan-2.2">WAN 2.2</option>
                      <option value="wan-2.1">WAN 2.1</option>
                      <option value="custom">Custom Model</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-deep">
                      Output Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as 'text' | 'image')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                    >
                      <option value="text">Text</option>
                      <option value="image">Image</option>
                    </select>
                  </div>
                </div>

                {/* Parameters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-deep">
                      Temperature: {temperature}
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        value={temperature}
                        onChange={(e) => setTemperature(parseFloat(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-deep/60 mt-2">
                        <span>Creative</span>
                        <span>Balanced</span>
                        <span>Focused</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-deep">
                      Max Tokens: {maxTokens}
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="64"
                        max="2048"
                        step="64"
                        value={maxTokens}
                        onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-deep/60 mt-2">
                        <span>Short</span>
                        <span>Medium</span>
                        <span>Long</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prompt Input */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-deep">
                    Prompt
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt here... Let your imagination flow like a river through the countryside..."
                    rows={6}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder:text-deep/40"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <motion.button
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Generating...
                      </div>
                    ) : (
                      'Generate'
                    )}
                  </motion.button>
                  {result && (
                    <motion.button
                      type="button"
                      onClick={handleReset}
                      className="btn-secondary text-lg py-4 px-6"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Reset
                    </motion.button>
                  )}
                </div>
              </form>
            </motion.div>

            {/* Sample Prompts */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card p-8"
            >
              <h3 className="heading-md text-deep mb-6">Sample Prompts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockData.samplePrompts.slice(0, 4).map((samplePrompt, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSamplePrompt(samplePrompt)}
                    className="text-left p-4 text-sm text-deep/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300 border border-gray-200 hover:border-primary/30 hover:shadow-md text-start"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {samplePrompt.substring(0, 80)}...
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Results Panel */}
          <div className="xl:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card p-6 h-fit sticky top-24"
            >
              <h3 className="heading-md text-deep mb-6">Results</h3>
              
              <AnimatePresence mode="wait">
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <div className="relative">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-6"></div>
                      <div className="absolute inset-0 rounded-full border-2 border-primary/20"></div>
                    </div>
                    <p className="text-deep/60 font-medium">Generating your content...</p>
                    <p className="text-caption text-deep/40 mt-2">This may take a few moments</p>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-50 border border-red-200 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">⚠️</div>
                      <div>
                        <p className="text-red-800 font-medium">Generation failed</p>
                        <p className="text-red-700 text-sm mt-1">{error}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">✅</div>
                        <p className="text-green-800 font-medium">
                          Generation completed successfully!
                        </p>
                      </div>
                    </div>

                    {result.result.type === 'text' && result.result.text && (
                      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/20">
                        <h4 className="font-semibold text-deep mb-3 flex items-center">
                          <span className="text-primary mr-2">📝</span>
                          Generated Text
                        </h4>
                        <div className="whitespace-pre-wrap text-sm text-deep/80 leading-relaxed bg-white/60 rounded-lg p-4">
                          {result.result.text}
                        </div>
                      </div>
                    )}

                    {result.result.type === 'image' && result.result.imageBase64 && (
                      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/20">
                        <h4 className="font-semibold text-deep mb-3 flex items-center">
                          <span className="text-primary mr-2">🖼️</span>
                          Generated Image
                        </h4>
                        <img
                          src={`data:${result.result.mime};base64,${result.result.imageBase64}`}
                          alt="Generated content"
                          className="w-full rounded-xl border border-primary/20 shadow-lg"
                        />
                      </div>
                    )}

                    <div className="bg-deep/5 rounded-xl p-4 text-xs text-deep/60">
                      <div className="grid grid-cols-2 gap-2">
                        <p><strong>Job ID:</strong> {result.id}</p>
                        <p><strong>Status:</strong> {result.status}</p>
                        <p><strong>Type:</strong> {result.result.type}</p>
                        <p><strong>Model:</strong> {model}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {!isLoading && !error && !result && (
                  <div className="text-center py-12 text-deep/40">
                    <div className="text-4xl mb-4">✨</div>
                    <p className="font-medium">Your generated content will appear here</p>
                    <p className="text-sm mt-2">Start by entering a prompt above</p>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLMPlayground;
