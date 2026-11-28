/**
 * RIZZY AI — Personalised AI Pet & Voice/Chat Assistant (ChatGPT + Siri + Gemini Style)
 * Features:
 *  - Expressive animated SVG AI Pet with cursor-tracking eyes & Siri/Gemini prismatic aura
 *  - Voice Recognition (Web Speech API) & Natural Voice Speech Synthesis (TTS)
 *  - ChatGPT/Gemini word-by-word streaming responses
 *  - Full knowledge of Rizal Rahman's portfolio, blogs, software stack, projects & digital marketing
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const start = () => initRizzyAIPet();
    if ('requestIdleCallback' in window) {
      requestIdleCallback(start, { timeout: 2500 });
    } else {
      setTimeout(start, 1);
    }
  });

  function initRizzyAIPet() {
    if (document.getElementById('rizzy-ai-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'rizzy-ai-widget';
    widget.className = 'ai-pet-widget';
    widget.innerHTML = `
      <!-- ChatGPT / Gemini / Siri Conversation Window -->
      <div class="ai-pet-panel" id="ai-pet-panel" role="dialog" aria-label="Rizz AI Assistant">
        <div class="ai-panel-header">
          <div class="ai-header-brand">
            <div class="ai-header-mini-pet" id="ai-pet-head-pat" title="Click to pet Rizz AI!">🤖</div>
            <div>
              <div class="ai-header-title">Rizz AI ✦ Companion</div>
              <div class="ai-header-subtitle">
                <span>●</span> ChatGPT • Siri • Gemini Mode
              </div>
            </div>
          </div>
          <div class="ai-header-actions">
            <button class="ai-icon-btn is-active" id="ai-tts-toggle" title="Toggle Voice Speech Output (On/Off)">🔊</button>
            <button class="ai-icon-btn" id="ai-clear-chat" title="Reset Conversation">↺</button>
            <button class="ai-icon-btn" id="ai-panel-close" title="Minimize">✕</button>
          </div>
        </div>

        <!-- Siri / Gemini Live Voice Waveform Banner -->
        <div class="ai-siri-orb-banner" id="ai-siri-banner">
          <div class="siri-wave-bars">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <div class="siri-orb-status-text" id="ai-siri-status">Listening to your voice...</div>
          <button class="ai-icon-btn" id="ai-stop-voice" style="width:24px;height:24px;font-size:0.7rem;">■</button>
        </div>

        <!-- Messages Stream -->
        <div class="ai-messages-container" id="ai-messages-list"></div>

        <!-- Quick Prompt Chips -->
        <div class="ai-quick-chips" id="ai-quick-chips">
          <button class="ai-chip-btn" data-prompt="Tell me about the Digital Marketing Guide blog!">📖 Digital Marketing Blog</button>
          <button class="ai-chip-btn" data-prompt="Who is Rizal Rahman?">✨ Who is Rizal?</button>
          <button class="ai-chip-btn" data-prompt="What softwares and tools does Rizal use?">🛠️ Software Stack</button>
          <button class="ai-chip-btn" data-prompt="Show me Rizal's best projects">🚀 Top Projects</button>
          <button class="ai-chip-btn" data-prompt="How can I contact or hire Rizal?">📩 Hire Rizal</button>
        </div>

        <!-- Input Bar with Siri/Gemini Mic & Send -->
        <form class="ai-input-bar" id="ai-chat-form">
          <button type="button" class="ai-mic-btn" id="ai-mic-btn" title="Talk with Voice (Siri / Gemini Live Mode)">🎙️</button>
          <input type="text" class="ai-chat-input" id="ai-chat-input" placeholder="Ask Rizz AI anything or tap 🎙️..." autocomplete="off">
          <button type="submit" class="ai-send-btn" aria-label="Send message">➤</button>
        </form>
      </div>

      <!-- Small Moving Full-Body Robot Pet (Rizz AI) -->
      <button class="ai-pet-Launcher" id="ai-pet-launcher" aria-label="Open Rizz AI Robot Assistant">
        <div class="ai-pet-aura-ring"></div>
        <span class="ai-pet-status-dot"></span>
        <svg class="ai-pet-svg" viewBox="0 0 100 108" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="petBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFFFFF"/>
              <stop offset="100%" stop-color="#E0F2FE"/>
            </linearGradient>
            <linearGradient id="petVisorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0F172A"/>
              <stop offset="100%" stop-color="#1E1B4B"/>
            </linearGradient>
            <linearGradient id="petEarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#3B82F6"/>
              <stop offset="50%" stop-color="#8B5CF6"/>
              <stop offset="100%" stop-color="#EC4899"/>
            </linearGradient>
          </defs>

          <g class="rizz-robot-body-bob">
            <!-- Walking Robot Legs -->
            <g class="rizz-leg-left">
              <rect x="36" y="76" width="9" height="18" rx="4.5" fill="#94A3B8" stroke="#18181B" stroke-width="2.5"/>
              <rect x="33" y="90" width="15" height="8" rx="4" fill="#3B82F6" stroke="#18181B" stroke-width="2.4"/>
            </g>
            <g class="rizz-leg-right">
              <rect x="55" y="76" width="9" height="18" rx="4.5" fill="#94A3B8" stroke="#18181B" stroke-width="2.5"/>
              <rect x="52" y="90" width="15" height="8" rx="4" fill="#3B82F6" stroke="#18181B" stroke-width="2.4"/>
            </g>

            <!-- Waving Robot Arms -->
            <g class="rizz-arm-left">
              <rect x="17" y="54" width="10" height="20" rx="5" fill="#CBD5E1" stroke="#18181B" stroke-width="2.4"/>
              <circle cx="22" cy="75" r="4.5" fill="#FBBF24" stroke="#18181B" stroke-width="2.2"/>
            </g>
            <g class="rizz-arm-right">
              <rect x="73" y="54" width="10" height="20" rx="5" fill="#CBD5E1" stroke="#18181B" stroke-width="2.4"/>
              <circle cx="78" cy="75" r="4.5" fill="#FBBF24" stroke="#18181B" stroke-width="2.2"/>
            </g>

            <!-- Compact Robot Torso -->
            <rect x="29" y="52" width="42" height="28" rx="10" fill="url(#petBodyGrad)" stroke="#18181B" stroke-width="2.8"/>
            <!-- Glowing Heart Core -->
            <circle cx="50" cy="66" r="6" fill="url(#petEarGrad)" stroke="#18181B" stroke-width="1.8"/>
            <circle cx="50" cy="66" r="2.2" fill="#FFFFFF"/>

            <!-- Gemini Star Antenna -->
            <line x1="50" y1="18" x2="50" y2="10" stroke="#18181B" stroke-width="3" stroke-linecap="round"/>
            <g class="ai-pet-antenna-star">
              <path d="M50 0 L52.5 5.5 L58 7.5 L52.5 9.5 L50 15 L47.5 9.5 L42 7.5 L47.5 5.5 Z" fill="#F59E0B" stroke="#18181B" stroke-width="1.4"/>
            </g>

            <!-- Side Headphones -->
            <rect x="16" y="27" width="8" height="16" rx="4" fill="url(#petEarGrad)" stroke="#18181B" stroke-width="2.4"/>
            <rect x="76" y="27" width="8" height="16" rx="4" fill="url(#petEarGrad)" stroke="#18181B" stroke-width="2.4"/>

            <!-- Cute Robot Head -->
            <rect x="23" y="17" width="54" height="36" rx="16" fill="url(#petBodyGrad)" stroke="#18181B" stroke-width="2.8"/>

            <!-- Glossy Dark Visor -->
            <rect x="29" y="23" width="42" height="24" rx="11" fill="url(#petVisorGrad)" stroke="#18181B" stroke-width="2"/>

            <!-- Glowing Cute Eyes (Track Cursor) -->
            <g class="ai-pet-eye-pupil" id="ai-pet-eyes">
              <circle cx="40" cy="33" r="4.2" fill="#38BDF8"/>
              <circle cx="41.4" cy="31.6" r="1.5" fill="#FFFFFF"/>
              <circle cx="60" cy="33" r="4.2" fill="#38BDF8"/>
              <circle cx="61.4" cy="31.6" r="1.5" fill="#FFFFFF"/>
            </g>

            <!-- Blinking Eyelids Overlay -->
            <g class="ai-pet-eyelids">
              <rect x="34" y="27" width="12" height="11" rx="3" fill="#0F172A"/>
              <rect x="54" y="27" width="12" height="11" rx="3" fill="#0F172A"/>
            </g>

            <!-- Rosy Cheeks & Happy Mouth -->
            <ellipse cx="34" cy="40" rx="2.8" ry="1.5" fill="#F43F5E" opacity="0.75"/>
            <ellipse cx="66" cy="40" rx="2.8" ry="1.5" fill="#F43F5E" opacity="0.75"/>
            <path class="ai-pet-mouth" d="M 45 41 Q 50 45 55 41" stroke="#34D399" stroke-width="2.4" stroke-linecap="round" fill="none"/>
          </g>
        </svg>
      </button>
    `;

    document.body.appendChild(widget);

    const launcher = document.getElementById('ai-pet-launcher');
    const panel = document.getElementById('ai-pet-panel');
    const closeBtn = document.getElementById('ai-panel-close');
    const messagesList = document.getElementById('ai-messages-list');
    const chatForm = document.getElementById('ai-chat-form');
    const chatInput = document.getElementById('ai-chat-input');
    const micBtn = document.getElementById('ai-mic-btn');
    const ttsToggle = document.getElementById('ai-tts-toggle');
    const clearChatBtn = document.getElementById('ai-clear-chat');
    const stopVoiceBtn = document.getElementById('ai-stop-voice');
    const siriStatus = document.getElementById('ai-siri-status');
    const headPat = document.getElementById('ai-pet-head-pat');
    const eyesGroup = document.getElementById('ai-pet-eyes');

    let voiceEnabled = true;
    let recognition = null;
    let isListening = false;

    // 1. Initial Greeting Message
    const addInitialGreeting = () => {
      messagesList.innerHTML = '';
      appendBotMessage(
        `Hi there! 👋 I'm **Rizz AI**, Rizal Rahman's personal mini robot & voice assistant (powered like ChatGPT, Siri & Gemini).\n\nI can tell you all about **Rizal's work at Monochrome FX**, his **software stack**, his **case studies**, or read his new **1,250-word Digital Marketing Guide for Small Businesses**! Tap 🎙️ to talk with your voice or ask me anything below.`,
        false
      );
    };
    addInitialGreeting();

    // 2. Cursor Eye Tracking for the AI Pet
    document.addEventListener('mousemove', (e) => {
      if (!eyesGroup || !launcher) return;
      const rect = launcher.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(Math.hypot(dx, dy) / 60, 3.2);
      const moveX = Math.cos(angle) * dist;
      const moveY = Math.sin(angle) * dist;
      eyesGroup.style.transform = `translate(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px)`;
    }, { passive: true });

    // 3. Open / Close Panel
    const togglePanel = (forceState) => {
      const willOpen = typeof forceState === 'boolean' ? forceState : !widget.classList.contains('is-open');
      widget.classList.toggle('is-open', willOpen);
      if (willOpen) {
        setTimeout(() => chatInput.focus(), 180);
      }
    };

    launcher.addEventListener('click', () => togglePanel());
    closeBtn.addEventListener('click', () => togglePanel(false));

    // Petting the AI Companion
    headPat.addEventListener('click', () => {
      appendBotMessage(`*Purrs in 60fps!* 💖✨ Thanks for petting me! Did you know Rizal crafted over **100+ commercial visual assets** with a **4.8x average ROAS**?`, true);
    });

    // Clear Chat
    clearChatBtn.addEventListener('click', () => {
      stopSpeaking();
      addInitialGreeting();
    });

    // Toggle Voice TTS
    ttsToggle.addEventListener('click', () => {
      voiceEnabled = !voiceEnabled;
      ttsToggle.classList.toggle('is-active', voiceEnabled);
      ttsToggle.textContent = voiceEnabled ? '🔊' : '🔇';
      if (!voiceEnabled) stopSpeaking();
    });

    stopVoiceBtn.addEventListener('click', () => {
      stopSpeaking();
      stopListening();
    });

    // Quick Prompt Chips
    document.querySelectorAll('#ai-quick-chips .ai-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const prompt = btn.getAttribute('data-prompt');
        if (prompt) handleUserQuery(prompt);
      });
    });

    // Form Submit
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      chatInput.value = '';
      handleUserQuery(text);
    });

    // 4. Web Speech API (Siri / Gemini Voice Input)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        isListening = true;
        stopSpeaking();
        widget.classList.add('is-listening');
        siriStatus.textContent = 'Listening... Speak now 🎙️';
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleUserQuery(transcript);
        }
      };

      recognition.onerror = () => {
        stopListening();
      };

      recognition.onend = () => {
        stopListening();
      };
    }

    function stopListening() {
      isListening = false;
      widget.classList.remove('is-listening');
      try {
        if (recognition) recognition.stop();
      } catch (e) {}
    }

    micBtn.addEventListener('click', () => {
      togglePanel(true);
      if (!SpeechRecognition) {
        appendBotMessage(`Voice microphone input isn't supported in this browser window, but you can type any question below and I'll speak the answer aloud! 🔊`, false);
        return;
      }
      if (isListening) {
        stopListening();
      } else {
        try {
          recognition.start();
        } catch (e) {
          stopListening();
        }
      }
    });

    // 5. Smooth, Cute, Soft Voice Engine (Siri / Gemini / Neural Pet Voice)
    let cachedVoices = [];
    const loadVoices = () => {
      if ('speechSynthesis' in window) {
        cachedVoices = window.speechSynthesis.getVoices() || [];
      }
    };
    loadVoices();
    if ('speechSynthesis' in window && window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    function getBestCuteSoftVoice() {
      if (!cachedVoices.length && 'speechSynthesis' in window) {
        cachedVoices = window.speechSynthesis.getVoices() || [];
      }
      if (!cachedVoices.length) return null;

      // Filter to English voices first
      const enVoices = cachedVoices.filter(v => /^en(-|_|$)/i.test(v.lang) || /English/i.test(v.name));
      const pool = enVoices.length ? enVoices : cachedVoices;

      // Exclude deep/harsh male voices
      const nonMalePool = pool.filter(v => !/\b(David|Mark|George|Daniel|Richard|Ravi|James|Guy|Christopher|Eric|Male)\b/i.test(v.name));
      const candidates = nonMalePool.length ? nonMalePool : pool;

      // Priority ranking for the cutest, softest, smoothest voices
      const priorityPatterns = [
        /Ana Online.*Natural/i,       // Microsoft Ana (ultra-cute soft neural voice)
        /Jenny Online.*Natural/i,     // Microsoft Jenny (warm, soft, friendly neural voice)
        /Aria Online.*Natural/i,      // Microsoft Aria (smooth expressive neural voice)
        /Sara Online.*Natural/i,      // Microsoft Sara (sweet soft neural voice)
        /Libby Online.*Natural/i,     // Microsoft Libby (gentle British female neural)
        /Sonia Online.*Natural/i,     // Microsoft Sonia
        /Neerja Online.*Natural/i,    // Microsoft Neerja
        /Online.*Natural/i,           // Any other Microsoft Natural neural female voice
        /Google UK English Female/i,  // Smooth Google female voice
        /Google US English/i,         // Smooth Google voice
        /\b(Samantha|Siri|Victoria|Karen|Moira|Tessa)\b/i, // Apple soft female voices
        /\b(Zira|Hazel|Heera|Susan|Catherine|Linda)\b/i,   // Windows soft female voices
        /Female/i
      ];

      for (const pattern of priorityPatterns) {
        const match = candidates.find(v => pattern.test(v.name));
        if (match) return match;
      }

      return candidates[0] || pool[0];
    }

    // Gentle melodic pastel chime for cute pet feedback
    function playCutePetChime() {
      if (!voiceEnabled) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const notes = [587.33, 783.99, 987.77]; // D5 -> G5 -> B5 soft pastel chord arpeggio
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.065);
          gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.065);
          gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + idx * 0.065 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.065 + 0.24);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.065);
          osc.stop(ctx.currentTime + idx * 0.065 + 0.25);
        });
      } catch (e) {}
    }

    function speakText(rawText) {
      if (!voiceEnabled || !('speechSynthesis' in window)) return;
      stopSpeaking();

      // Convert markdown & bullets into smooth, gentle conversational phrasing
      const cleanText = rawText
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/<[^>]+>/g, '')
        .replace(/•\s*/g, ', ')
        .replace(/\d+\.\s*/g, ', ')
        .replace(/\n+/g, '. ')
        .replace(/\. Literally,\s*/g, '. ')
        .replace(/\.\s*\./g, '.')
        .replace(/[✦★↗↓🚀🎨⚡📖🛠️📩👋💖✨🤖👤🎙️🔊🔇🟢📍📧]/g, '')
        .trim();

      if (!cleanText) return;

      playCutePetChime();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      const selectedVoice = getBestCuteSoftVoice();

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        const isNaturalNeural = /Natural|Online/i.test(selectedVoice.name);
        // Smooth, gentle pace + cute, soft, warm higher pitch
        utterance.rate = isNaturalNeural ? 0.96 : 0.94;
        utterance.pitch = isNaturalNeural ? 1.18 : 1.32;
      } else {
        utterance.rate = 0.94;
        utterance.pitch = 1.32;
      }

      // Soft, soothing volume (never harsh or loud)
      utterance.volume = 0.85;

      utterance.onstart = () => {
        widget.classList.add('is-speaking');
        siriStatus.textContent = 'Rizz AI is speaking softly... 🌸';
      };

      utterance.onend = () => {
        widget.classList.remove('is-speaking');
      };

      utterance.onerror = () => {
        widget.classList.remove('is-speaking');
      };

      window.speechSynthesis.speak(utterance);
    }

    function stopSpeaking() {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      widget.classList.remove('is-speaking');
    }

    // 6. Message Rendering with ChatGPT/Gemini Streaming Effect
    function appendUserMessage(text) {
      const row = document.createElement('div');
      row.className = 'ai-msg-row user-msg';
      row.innerHTML = `
        <div class="ai-msg-avatar">👤</div>
        <div class="ai-msg-bubble">${escapeHtml(text)}</div>
      `;
      messagesList.appendChild(row);
      messagesList.scrollTop = messagesList.scrollHeight;
    }

    function appendBotMessage(markdownText, shouldSpeak = true, actionConfig = null) {
      const row = document.createElement('div');
      row.className = 'ai-msg-row bot-msg';
      const bubbleEl = document.createElement('div');
      bubbleEl.className = 'ai-msg-bubble';
      row.innerHTML = `<div class="ai-msg-avatar">🤖</div>`;
      row.appendChild(bubbleEl);
      messagesList.appendChild(row);

      const formattedHtml = formatMarkdown(markdownText);
      // Stream effect
      const words = formattedHtml.split(' ');
      let i = 0;
      bubbleEl.innerHTML = '';

      const interval = setInterval(() => {
        if (i < words.length) {
          bubbleEl.innerHTML = words.slice(0, i + 3).join(' ');
          i += 3;
          messagesList.scrollTop = messagesList.scrollHeight;
        } else {
          clearInterval(interval);
          bubbleEl.innerHTML = formattedHtml;
          if (actionConfig) {
            const btn = document.createElement('button');
            btn.className = 'ai-msg-action-btn';
            btn.innerHTML = actionConfig.label;
            btn.addEventListener('click', actionConfig.onClick);
            bubbleEl.appendChild(document.createElement('br'));
            bubbleEl.appendChild(btn);
          }
          messagesList.scrollTop = messagesList.scrollHeight;
        }
      }, 22);

      if (shouldSpeak) {
        speakText(markdownText);
      }
    }

    // 7. Intelligent Knowledge Engine for Rizal Rahman & Digital Marketing
    function handleUserQuery(query) {
      appendUserMessage(query);
      const q = query.toLowerCase();

      setTimeout(() => {
        // Digital Marketing Blog / Guide
        if (q.includes('digital marketing') || q.includes('blog') || q.includes('small business') || q.includes('guide') || q.includes('article')) {
          appendBotMessage(
            `Rizal's featured **1,250-word guide**, *"What Is Digital Marketing? A Simple Guide for Small Businesses"*, breaks down the **6 Essential Pillars**:\n\n1. **Digital Storefront (Website)**\n2. **Local SEO & Google Business Profile**\n3. **Organic Social Media Trust**\n4. **Paid Performance Ads (Meta & Google)**\n5. **Helpful Content Marketing**\n6. **Email & WhatsApp Retention**\n\nClick below to read the full 1,250-word article right now!`,
            true,
            {
              label: '📖 Read Full Digital Marketing Guide ↗',
              onClick: () => {
                if (typeof window.openHomeBlogArticle === 'function') {
                  window.openHomeBlogArticle('post-digital-marketing-guide');
                } else if (typeof window.openArticle === 'function') {
                  window.openArticle('post-digital-marketing-guide');
                } else {
                  window.location.href = 'blog.html';
                }
              }
            }
          );
          return;
        }

        // Who is Rizal / About
        if (q.includes('who is') || q.includes('about') || q.includes('rizal') || q.includes('experience') || q.includes('monochrome')) {
          appendBotMessage(
            `**Rizal Rahman** is a multidisciplinary **Digital Marketer and Graphic Designer** based in India, currently serving as **Manager & Creative Lead at Monochrome FX**.\n\nWith **4+ years of experience**, he blends bold brand identity, generative AI workflows (**Higgsfield AI**), motion graphics, and high-converting **Meta Ads** strategies (averaging **4.8x ROAS**).`,
            true,
            {
              label: '✦ View About & Resume ↓',
              onClick: () => scrollToSection('about')
            }
          );
          return;
        }

        // Software Stack / Tools
        if (q.includes('software') || q.includes('tool') || q.includes('stack') || q.includes('higgsfield') || q.includes('meta') || q.includes('photoshop') || q.includes('snake')) {
          appendBotMessage(
            `Rizal masters **8 core industry tools** featured in the interactive Snake & Ladder stack:\n\n• **Meta Ads Manager** (Advanced Strategy)\n• **Adobe Photoshop & Illustrator** (Expert)\n• **Adobe After Effects & Figma** (Advanced)\n• **Higgsfield AI** (Expert • Gen-AI Video)\n• **Google Analytics (GA4) & Blender 3D**`,
            true,
            {
              label: '🛠️ Inspect Software Stack ↓',
              onClick: () => scrollToSection('resume')
            }
          );
          return;
        }

        // Projects / Case Studies / Portfolio
        if (q.includes('project') || q.includes('work') || q.includes('case stud') || q.includes('portfolio') || q.includes('mihdab') || q.includes('rpm') || q.includes('zviz')) {
          appendBotMessage(
            `Here are Rizal's **6 signature case studies**:\n\n1. **RPM Healthcare Rescue** (+240% Growth)\n2. **MIHDAB Luxury Perfume** (Arabic Calligraphy & 3D Packaging)\n3. **ZVIZ Kinetic Nutrition** (120K+ Pouches Sold)\n4. **AURA Synthetic Intelligence** (Higgsfield AI Visuals)\n5. **KINETIX Dynamic Broadcast** (60fps Motion)\n6. **Monochrome FX Showreel**`,
            true,
            {
              label: '🚀 Explore Selected Projects ↓',
              onClick: () => scrollToSection('projects')
            }
          );
          return;
        }

        // Contact / Hire / Email
        if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('reach') || q.includes('talk') || q.includes('price')) {
          appendBotMessage(
            `You can reach **Rizal Rahman** directly anytime!\n\n📧 **Email:** **rizalrahman8055@gmail.com**\n📍 **Role:** Manager at Monochrome FX (India)\n🟢 **Status:** Available for select consulting, performance marketing & brand design.`,
            true,
            {
              label: '📩 Go to Contact Notebook ↓',
              onClick: () => scrollToSection('contact')
            }
          );
          return;
        }

        // Greeting / Default smart response
        appendBotMessage(
          `I'm **Rizz AI** 🤖✨! I can help you explore Rizal's **1,250-word Digital Marketing Guide**, inspect his **8-tool Software Stack**, open his **Case Studies**, or connect you via **rizalrahman8055@gmail.com**. What would you like to see first?`,
          true,
          {
            label: '📖 Open Digital Marketing Blog ↗',
            onClick: () => {
              if (typeof window.openHomeBlogArticle === 'function') {
                window.openHomeBlogArticle('post-digital-marketing-guide');
              } else {
                window.location.href = 'blog.html';
              }
            }
          }
        );
      }, 260);
    }

    function scrollToSection(id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = `index.html#${id}`;
      }
    }

    function escapeHtml(str) {
      return str.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
      }[m]));
    }

    function formatMarkdown(text) {
      return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
    }
  }
})();

