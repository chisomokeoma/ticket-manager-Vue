<template>
  <div class="min-h-screen bg-gray-50">
    <section
      class="relative pt-20 pb-32 overflow-hidden"
      style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    >
      <div
        class="absolute w-72 h-72 rounded-full -top-24 right-[10%] border-2 animate-float"
        style="
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        "
      />

      <div
        class="absolute w-48 h-48 rounded-full bottom-24 left-[5%] border-2 animate-float-delayed"
        style="
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
        "
      />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center text-white max-w-4xl mx-auto">
          <h1
            class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6"
            style="text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2)"
          >
            Xomie's Ticket Manager
          </h1>

          <p
            class="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 leading-relaxed px-4"
            style="opacity: 0.95"
          >
            Streamline your workflow with our powerful ticket management
            solution. Track, manage, and resolve issues faster than ever before.
          </p>

          <div
            class="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          >
            <NuxtLink to="/sign-up" class="w-full sm:w-auto">
              <button
                class="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-white text-purple-600 border-0 rounded-xl text-base sm:text-lg font-semibold cursor-pointer shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Get Started <ArrowRight :size="20" />
              </button>
            </NuxtLink>
            <NuxtLink to="/sign-in" class="w-full sm:w-auto">
              <button
                class="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-transparent text-white border-2 border-white rounded-xl text-base sm:text-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
              >
                Login
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>

      <svg
        class="absolute -bottom-0.5 left-0 w-full h-auto"
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          fill="#F9FAFB"
          d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
        />
      </svg>
    </section>

    <section
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative"
    >
      <div
        class="absolute w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full top-8 sm:top-12 right-[5%] z-0 animate-pulse-slow"
        style="background: linear-gradient(135deg, #fcd34d, #f59e0b)"
      />

      <div class="text-center mb-12 sm:mb-16">
        <h2
          class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        >
          Why Choose Our Platform?
        </h2>
        <p class="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto px-4">
          Everything you need to manage tickets efficiently and effectively
        </p>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10"
      >
        <div
          class="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl"
        >
          <div
            class="w-16 h-16 rounded-xl flex items-center justify-center mb-5"
            style="background: linear-gradient(135deg, #10b981, #059669)"
          >
            <Ticket :size="30" color="white" />
          </div>
          <h3 class="text-2xl font-semibold text-gray-800 mb-3">
            Easy Ticket Management
          </h3>
          <p class="text-base text-gray-500 leading-relaxed">
            Create, update, and track tickets with an intuitive interface. Never
            lose track of important issues again.
          </p>
        </div>

        <div
          class="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl"
        >
          <div
            class="w-16 h-16 rounded-xl flex items-center justify-center mb-5"
            style="background: linear-gradient(135deg, #f59e0b, #d97706)"
          >
            <Zap :size="30" color="white" />
          </div>
          <h3 class="text-2xl font-semibold text-gray-800 mb-3">
            Lightning Fast
          </h3>
          <p class="text-base text-gray-500 leading-relaxed">
            Built for speed and efficiency. Handle thousands of tickets without
            breaking a sweat.
          </p>
        </div>

        <div
          class="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl"
        >
          <div
            class="w-16 h-16 rounded-xl flex items-center justify-center mb-5"
            style="background: linear-gradient(135deg, #3b82f6, #2563eb)"
          >
            <Shield :size="30" color="white" />
          </div>
          <h3 class="text-2xl font-semibold text-gray-800 mb-3">
            Secure & Reliable
          </h3>
          <p class="text-base text-gray-500 leading-relaxed">
            Your data is protected with industry standard security. Access
            control and authentication built-in.
          </p>
        </div>

        <div
          class="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl"
        >
          <div
            class="w-16 h-16 rounded-xl flex items-center justify-center mb-5"
            style="background: linear-gradient(135deg, #8b5cf6, #7c3aed)"
          >
            <Users :size="30" color="white" />
          </div>
          <h3 class="text-2xl font-semibold text-gray-800 mb-3">
            Team Collaboration
          </h3>
          <p class="text-base text-gray-500 leading-relaxed">
            Work together seamlessly. Assign tickets, track progress, and keep
            everyone in the loop.
          </p>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-5 py-20 bg-white">
      <div class="text-center mb-10">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Clear Status Tracking
        </h2>
        <p class="text-xl text-gray-500">
          Visual indicators make it easy to see ticket status at a glance
        </p>
      </div>

      <div class="flex justify-center gap-8 flex-wrap">
        <div
          class="bg-white p-8 rounded-2xl shadow-md min-w-[200px] text-center"
        >
          <div
            class="w-20 h-20 rounded-full bg-green-500 mx-auto mb-4 flex items-center justify-center text-3xl text-white font-bold"
          >
            ✓
          </div>
          <h4 class="text-xl font-semibold text-gray-800 mb-2">Open</h4>
          <p class="text-sm text-gray-500">New tickets ready for action</p>
        </div>

        <div
          class="bg-white p-8 rounded-2xl shadow-md min-w-[200px] text-center"
        >
          <div
            class="w-20 h-20 rounded-full bg-amber-500 mx-auto mb-4 flex items-center justify-center text-3xl text-white font-bold"
          >
            ⟳
          </div>
          <h4 class="text-xl font-semibold text-gray-800 mb-2">In Progress</h4>
          <p class="text-sm text-gray-500">Currently being worked on</p>
        </div>

        <div
          class="bg-white p-8 rounded-2xl shadow-md min-w-[200px] text-center"
        >
          <div
            class="w-20 h-20 rounded-full bg-gray-500 mx-auto mb-4 flex items-center justify-center text-3xl text-white font-bold"
          >
            ✕
          </div>
          <h4 class="text-xl font-semibold text-gray-800 mb-2">Closed</h4>
          <p class="text-sm text-gray-500">Resolved and completed</p>
        </div>
      </div>
    </section>

    <footer
      class="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-20"
    >
      <div class="max-w-7xl mx-auto px-5 py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div class="md:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-10 h-10 rounded-lg flex items-center justify-center"
                style="
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                "
              >
                <Ticket :size="24" color="white" />
              </div>
              <h3 class="text-xl font-bold">Xomie's Ticket Manager</h3>
            </div>
            <p class="text-gray-400 leading-relaxed mb-4 max-w-md">
              Streamline your workflow with our powerful ticket management
              solution. Track, manage, and resolve issues faster than ever
              before.
            </p>
            <div class="flex gap-4">
              <a
                href="#"
                class="w-10 h-10 rounded-full bg-gray-700 hover:bg-purple-600 flex items-center justify-center transition-all duration-300"
              >
                <span class="text-lg">𝕏</span>
              </a>
              <a
                href="#"
                class="w-10 h-10 rounded-full bg-gray-700 hover:bg-purple-600 flex items-center justify-center transition-all duration-300"
              >
                <span class="text-lg">in</span>
              </a>
              <a
                href="#"
                class="w-10 h-10 rounded-full bg-gray-700 hover:bg-purple-600 flex items-center justify-center transition-all duration-300"
              >
                <span class="text-lg">@</span>
              </a>
            </div>
          </div>

          <div>
            <h4 class="text-lg font-semibold mb-4">Product</h4>
            <ul class="space-y-3">
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Updates
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-semibold mb-4">Company</h4>
            <ul class="space-y-3">
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p class="text-gray-400 text-sm">
            © 2025 Xomie's Ticket Manager. All rights reserved.
          </p>
          <div class="flex gap-6 text-sm">
            <a
              href="#"
              class="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              class="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a
              href="#"
              class="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Ticket, Shield, Zap, Users, ArrowRight } from "lucide-vue-next";

// Set page title
useHead({
  title: "Xomie's Ticket Manager - Streamline Your Workflow",
});
</script>
