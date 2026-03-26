/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, ReactNode, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Swords, 
  ArrowRight, 
  Library, 
  GraduationCap, 
  BookOpen,
  Trophy,
  Globe,
  Zap,
  Flame,
  Scroll,
  History,
  LayoutDashboard,
  Gamepad2,
  ShoppingBag,
  User,
  ChevronRight,
  Clock,
  Banknote,
  Settings,
  LogOut,
  Award,
  ShieldCheck,
  Activity,
  Mail,
  Calendar,
  Feather,
  FlaskRound,
  Leaf,
  Sword
} from "lucide-react";

type View = "onboarding" | "dashboard" | "quiz" | "store" | "profile" | "materials";

export default function App() {
  const [view, setView] = useState<View>("onboarding");

  return (
    <div className="min-h-screen bg-ink-900 font-sans antialiased selection:bg-crimson-500/30 flex flex-col overflow-x-hidden">
      {view !== "onboarding" && <TopBar />}
      
      <main className="flex-1 relative flex flex-col">
        <AnimatePresence mode="wait">
          {view === "onboarding" && (
            <OnboardingView key="onboarding" onStart={() => setView("dashboard")} />
          )}
          {view === "dashboard" && (
            <DashboardView 
              key="dashboard" 
              onStartQuiz={() => setView("quiz")} 
              onGoStore={() => setView("store")}
              onGoMaterials={() => setView("materials")}
            />
          )}
          {view === "quiz" && (
            <QuizView 
              key="quiz" 
              onBack={() => setView("dashboard")} 
              onGoStore={() => setView("store")}
            />
          )}
          {view === "store" && (
            <StoreView 
              key="store" 
              onGoHome={() => setView("dashboard")} 
              onGoQuizzes={() => setView("quiz")} 
            />
          )}
          {view === "profile" && (
            <ProfileView 
              key="profile" 
              onLogout={() => setView("onboarding")}
            />
          )}
          {view === "materials" && (
            <MaterialsView 
              key="materials" 
              onBack={() => setView("dashboard")} 
            />
          )}
        </AnimatePresence>
      </main>

      {view !== "onboarding" && (
        <nav className="fixed bottom-0 left-0 right-0 bg-ink-900/90 backdrop-blur-2xl border-t border-white/5 px-8 py-5 z-50">
          <div className="max-w-md mx-auto flex justify-between items-center">
            <NavItem 
              icon={<LayoutDashboard className="w-5 h-5" />} 
              label="Dashboard" 
              active={view === "dashboard"} 
              onClick={() => setView("dashboard")} 
            />
            <NavItem 
              icon={<Gamepad2 className="w-5 h-5" />} 
              label="Quizzes" 
              active={view === "quiz"} 
              onClick={() => setView("quiz")} 
            />
            <NavItem 
              icon={<BookOpen className="w-5 h-5" />} 
              label="Materials" 
              active={view === "materials"} 
              onClick={() => setView("materials")} 
            />
            <NavItem 
              icon={<ShoppingBag className="w-5 h-5" />} 
              label="Store" 
              active={view === "store"} 
              onClick={() => setView("store")} 
            />
            <NavItem 
              icon={<User className="w-5 h-5" />} 
              label="Profile" 
              active={view === "profile"}
              onClick={() => setView("profile")}
            />
          </div>
        </nav>
      )}
    </div>
  );
}

function BaryaIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M1.5 12C1.0875 12 0.734375 11.8531 0.440625 11.5594C0.146875 11.2656 0 10.9125 0 10.5V2.25H1.5V10.5H14.25V12H1.5ZM4.5 9C4.0875 9 3.73438 8.85312 3.44062 8.55937C3.14687 8.26562 3 7.9125 3 7.5V1.5C3 1.0875 3.14687 0.734375 3.44062 0.440625C3.73438 0.146875 4.0875 0 4.5 0H15C15.4125 0 15.7656 0.146875 16.0594 0.440625C16.3531 0.734375 16.5 1.0875 16.5 1.5V7.5C16.5 7.9125 16.3531 8.26562 16.0594 8.55937C15.7656 8.85312 15.4125 9 15 9H4.5ZM6 7.5C6 7.0875 5.85312 6.73438 5.55937 6.44063C5.26562 6.14688 4.9125 6 4.5 6V7.5H6ZM13.5 7.5H15V6C14.5875 6 14.2344 6.14688 13.9406 6.44063C13.6469 6.73438 13.5 7.0875 13.5 7.5ZM9.75 6.75C10.375 6.75 10.9062 6.53125 11.3438 6.09375C11.7812 5.65625 12 5.125 12 4.5C12 3.875 11.7812 3.34375 11.3438 2.90625C10.9062 2.46875 10.375 2.25 9.75 2.25C9.125 2.25 8.59375 2.46875 8.15625 2.90625C7.71875 3.34375 7.5 3.875 7.5 4.5C7.5 5.125 7.71875 5.65625 8.15625 6.09375C8.59375 6.53125 9.125 6.75 9.75 6.75ZM4.5 3C4.9125 3 5.26562 2.85313 5.55937 2.55938C5.85312 2.26562 6 1.9125 6 1.5H4.5V3ZM15 3V1.5H13.5C13.5 1.9125 13.6469 2.26562 13.9406 2.55938C14.2344 2.85313 14.5875 3 15 3Z" fill="currentColor"/>
    </svg>
  );
}

function ProfileView({ onLogout }: { onLogout: () => void, key?: string }) {
  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      className="pb-32"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Profile Header */}
      <section className="p-6 pt-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-crimson-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
        
        <div className="flex flex-col items-center text-center space-y-4 relative z-10">
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <div className="w-28 h-28 rounded-full border-2 border-crimson-500/30 p-1 bg-ink-800">
              <img 
                src="https://media.discordapp.net/attachments/1002242021664235602/1486717219336491018/image.png?ex=69c684ce&is=69c5334e&hm=6a5744505b587aace6f60e2ba054df386bfa4f5705b1af5dedd58698f559c0da&=&format=webp&quality=lossless&width=350&height=350" 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center border-2 border-ink-900 shadow-lg">
              <Trophy className="w-4 h-4 text-ink-900" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Clarence P.</h2>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em] bg-amber-500/10 px-2 py-0.5 rounded">Scholar Grade II</span>
              <span className="text-[10px] font-bold text-crimson-100 uppercase tracking-[0.2em] bg-crimson-500/10 px-2 py-0.5 rounded">Lvl 45</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="px-6 grid grid-cols-3 gap-3">
        <StatBox icon={<Zap className="w-4 h-4" />} value="12,450" label="Total XP" variants={itemVariants} />
        <StatBox icon={<Flame className="w-4 h-4" />} value="14 Days" label="Streak" variants={itemVariants} />
        <StatBox icon={<Globe className="w-4 h-4" />} value="#1,240" label="Global" variants={itemVariants} />
      </section>

      {/* Archetype Card */}
      <section className="p-6">
        <motion.div 
          className="bg-ink-800 rounded-lg p-6 relative overflow-hidden border border-white/5"
          variants={itemVariants}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck className="w-24 h-24 text-crimson-100" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="space-y-1">
              <h4 className="text-[10px] font-bold text-crimson-500 uppercase tracking-[0.2em]">Academic Archetype</h4>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">The Calculus Wraith-Slayer</h3>
            </div>
            <p className="text-xs text-crimson-200/60 leading-relaxed max-w-[80%]">
              Specialized in high-velocity problem solving and derivative-based combat. Your critical hit rate on STEM challenges is increased by 15%.
            </p>
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-crimson-100 uppercase tracking-widest">Analytic</div>
              <div className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-crimson-100 uppercase tracking-widest">Resilient</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Achievements Section */}
      <section className="px-6 space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="text-xl font-bold text-white tracking-tight">Scholastic Honors</h3>
          <button className="text-[10px] font-bold text-crimson-100 uppercase tracking-widest hover:text-white transition-colors cursor-pointer">
            View All
          </button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <AchievementBadge icon={<Award className="w-5 h-5" />} label="Night Owl" variants={itemVariants} />
          <AchievementBadge icon={<BookOpen className="w-5 h-5" />} label="Polymath" variants={itemVariants} />
          <AchievementBadge icon={<Activity className="w-5 h-5" />} label="Relentless" variants={itemVariants} />
          <AchievementBadge icon={<Library className="w-5 h-5" />} label="Archivist" variants={itemVariants} />
        </div>
      </section>

      {/* Settings & Actions */}
      <section className="p-6 space-y-3">
        <h3 className="text-[10px] font-bold text-crimson-200/40 uppercase tracking-[0.2em] px-2">Account Settings</h3>
        <div className="bg-ink-800 rounded-lg divide-y divide-white/5 overflow-hidden">
          <ProfileActionItem icon={<User className="w-4 h-4" />} label="Personal Information" />
          <ProfileActionItem icon={<Mail className="w-4 h-4" />} label="Email Notifications" />
          <ProfileActionItem icon={<Calendar className="w-4 h-4" />} label="Study Schedule" />
          <ProfileActionItem icon={<Settings className="w-4 h-4" />} label="Preferences" />
          <button 
            onClick={onLogout}
            className="w-full p-4 flex items-center justify-between hover:bg-crimson-500/5 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-crimson-500/10 flex items-center justify-center text-crimson-500">
                <LogOut className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-crimson-500 uppercase tracking-wider">Logout of Academy</span>
            </div>
            <ChevronRight className="w-4 h-4 text-crimson-500/40 group-hover:text-crimson-500 transition-colors" />
          </button>
        </div>
      </section>

      <div className="text-center pb-12">
        <p className="text-[10px] font-mono text-crimson-200/20 uppercase tracking-widest">Version 2.4.0-Alpha • UPGrade Scholastic System</p>
      </div>
    </motion.div>
  );
}

function StatBox({ icon, value, label, variants }: { icon: ReactNode, value: string, label: string, variants: any }) {
  return (
    <motion.div 
      className="bg-ink-800 p-4 rounded-lg space-y-2 border border-white/5 text-center"
      variants={variants}
    >
      <div className="w-8 h-8 rounded-lg bg-crimson-500/10 flex items-center justify-center text-crimson-100 mx-auto">
        {icon}
      </div>
      <div className="space-y-0.5">
        <div className="text-lg font-black text-white tracking-tight">{value}</div>
        <div className="text-[9px] font-bold text-crimson-200/40 uppercase tracking-widest">{label}</div>
      </div>
    </motion.div>
  );
}

function AchievementBadge({ icon, label, variants }: { icon: ReactNode, label: string, variants: any }) {
  return (
    <motion.div 
      className="flex flex-col items-center gap-2"
      variants={variants}
    >
      <div className="w-14 h-14 rounded-2xl bg-ink-800 border border-white/5 flex items-center justify-center text-amber-500 shadow-xl">
        {icon}
      </div>
      <span className="text-[9px] font-bold text-crimson-200/60 uppercase tracking-wider text-center">{label}</span>
    </motion.div>
  );
}

function ProfileActionItem({ icon, label }: { icon: ReactNode, label: string }) {
  return (
    <button className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors group cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-crimson-100 group-hover:bg-crimson-500/10 group-hover:text-crimson-100 transition-colors">
          {icon}
        </div>
        <span className="text-sm font-bold text-white uppercase tracking-wider">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-crimson-200/20 group-hover:text-crimson-200/60 transition-colors" />
    </button>
  );
}

function TopBar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-ink-900/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg border-2 border-crimson-500 p-0.5 flex items-center justify-center">
          <img 
            src="https://media.discordapp.net/attachments/1002242021664235602/1486717219336491018/image.png?ex=69c684ce&is=69c5334e&hm=6a5744505b587aace6f60e2ba054df386bfa4f5705b1af5dedd58698f559c0da&=&format=webp&quality=lossless&width=350&height=350" 
            alt="Profile" 
            className="w-full h-full object-cover rounded-[4px]"
            referrerPolicy="no-referrer"
          />
        </div>
        <span className="text-2xl font-black text-crimson-500 tracking-tighter">UPGrade</span>
      </div>
      <div className="flex items-center gap-3 bg-[#2F2828] px-4 py-2 rounded-lg">
        <BaryaIcon className="w-5 h-4 text-amber-500" />
        <span className="text-sm font-bold text-crimson-500">150 Barya</span>
      </div>
    </div>
  );
}

function OnboardingView({ onStart }: { onStart: () => void, key?: string }) {
  const [step, setStep] = useState<'welcome' | 'avatar' | 'syncing'>('welcome');
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const avatars = [
    { id: 1, icon: FlaskRound, name: 'Alchemist', color: '#22c55e' },
    { id: 2, icon: Feather, name: 'Scribe', color: '#3b82f6' },
    { id: 3, icon: Leaf, name: 'Sage', color: '#eab308' },
    { id: 4, icon: Sword, name: 'Paladin', color: '#94a3b8' },
  ];

  const handleLMSConnect = () => {
    setStep('syncing');
    setTimeout(() => {
      setStep('avatar');
    }, 2000);
  };

  const handleFinish = () => {
    if (selectedAvatar) {
      onStart();
    }
  };

  return (
    <motion.div 
      className="flex-1 relative overflow-hidden flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex-1 flex flex-col p-6 relative">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-ink-950">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square opacity-20 mix-blend-overlay z-10"
            style={{ background: 'radial-gradient(circle, #d32f2f 0%, transparent 70%)' }}
          />
          <div className="absolute inset-0 z-0 flex flex-col justify-center gap-4 opacity-[0.03] select-none transform -rotate-12 scale-150">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="flex whitespace-nowrap gap-8 text-[6vw] font-black uppercase tracking-tighter text-white"
                animate={{ x: i % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{ duration: 30 + i * 2, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(4)].map((_, j) => (
                  <span key={j}>UPGRADE • SCHOLAR • GRADES • BAYANIHAN • MASTERY • EXCELLENCE • </span>
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {step === 'welcome' && (
              <motion.div 
                key="welcome"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="relative z-10 w-full max-w-md flex flex-col gap-12 text-center"
              >
                {/* Hero Section */}
                <div className="flex flex-col gap-6 items-center">
                  <motion.div 
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-crimson-900/20 rounded-full"
                    variants={itemVariants}
                  >
                    <BookOpen className="w-3 h-3 text-crimson-100" />
                    <span className="text-[11px] font-semibold text-crimson-100 uppercase tracking-wider">
                      Welcome to UPGrade
                    </span>
                  </motion.div>

                  <motion.h2 
                    className="text-[56px] font-extrabold leading-[1.1] tracking-tighter text-white uppercase"
                    variants={itemVariants}
                  >
                    It's time to <br />
                    <span className="text-crimson-500 text-[72px]">UP</span> your <br />
                    <span className="text-crimson-500 text-[72px]">GRADE</span>
                  </motion.h2>

                  <motion.p 
                    className="text-lg text-crimson-200/80 leading-relaxed mx-auto"
                    variants={itemVariants}
                  >
                    Inscribe your legend in the Crimson Codex. Master the ancient arts of academic combat and elevate your ranking through valorous study.
                  </motion.p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4">
                  <motion.button
                    onClick={handleLMSConnect}
                    className="group relative w-full h-16 bg-crimson-gradient rounded-lg flex items-center px-6 gap-4 shadow-2xl shadow-red-950/20 active:scale-[0.98] transition-transform overflow-hidden cursor-pointer"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-10 h-10 bg-black/10 rounded-lg flex items-center justify-center">
                      <Swords className="w-5 h-5 text-crimson-50" />
                    </div>
                    <span className="text-xl font-bold text-crimson-50 flex-1">Begin Quest</span>
                    <ArrowRight className="w-5 h-5 text-crimson-50 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <motion.div className="flex items-center gap-4 py-4" variants={itemVariants}>
                    <div className="h-[1px] flex-1 bg-crimson-200/10" />
                    <span className="text-[10px] font-bold text-crimson-200/30 uppercase tracking-[0.2em]">
                      Sync with LMS
                    </span>
                    <div className="h-[1px] flex-1 bg-crimson-200/10" />
                  </motion.div>

                  <div className="grid grid-cols-1 gap-3">
                    <motion.button
                      onClick={handleLMSConnect}
                      className="w-full h-16 bg-ink-800 hover:bg-ink-700 rounded-lg flex items-center px-6 gap-4 transition-colors cursor-pointer"
                      variants={itemVariants}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="w-8 h-8 bg-ink-700 rounded-lg flex items-center justify-center">
                        <Library className="w-4 h-4 text-crimson-200" />
                      </div>
                      <span className="text-base font-semibold text-white flex-1">Continue with Canvas</span>
                    </motion.button>

                    <motion.button
                      onClick={handleLMSConnect}
                      className="w-full h-16 bg-ink-800 hover:bg-ink-700 rounded-lg flex items-center px-6 gap-4 transition-colors cursor-pointer"
                      variants={itemVariants}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="w-8 h-8 bg-ink-700 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-crimson-200" />
                      </div>
                      <span className="text-base font-semibold text-white flex-1">Google Classroom</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'syncing' && (
              <motion.div 
                key="syncing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex flex-col items-center gap-8"
              >
                <div className="relative">
                  <motion.div 
                    className="w-32 h-32 border-4 border-crimson-500/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute inset-0 border-t-4 border-crimson-500 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <History className="w-12 h-12 text-crimson-500 animate-pulse" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Syncing Scholastic Data</h3>
                  <p className="text-crimson-200/60">Fetching your current academic ranking and course load...</p>
                </div>
              </motion.div>
            )}

            {step === 'avatar' && (
              <motion.div 
                key="avatar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full max-w-md flex flex-col gap-10"
              >
                <div className="text-center space-y-2">
                  <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Choose Your Archetype</h3>
                  <p className="text-crimson-200/60">Select the avatar that will represent your academic journey.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => setSelectedAvatar(avatar.id)}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-4 ${selectedAvatar === avatar.id ? 'border-crimson-500 bg-crimson-500/10' : 'border-white/5 bg-ink-800 hover:border-white/20'}`}
                    >
                      <div className="w-24 h-24 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center bg-ink-700/50">
                        <avatar.icon 
                          size={64} 
                          color={avatar.color}
                          className="drop-shadow-lg"
                        />
                      </div>
                      <span className={`text-sm font-bold uppercase tracking-widest ${selectedAvatar === avatar.id ? 'text-crimson-500' : 'text-crimson-200/40'}`}>
                        {avatar.name}
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleFinish}
                  disabled={!selectedAvatar}
                  className="w-full py-5 bg-crimson-gradient rounded-lg text-sm font-black text-crimson-50 uppercase tracking-[0.2em] shadow-xl shadow-red-950/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] cursor-pointer"
                >
                  Enter the Codex
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <motion.footer className="py-12 flex flex-col items-center justify-center relative z-10" variants={itemVariants}>
        <div className="space-y-2 text-center">
          <p className="text-[11px] font-medium text-crimson-200/40 uppercase tracking-widest">
            UPGrade v1.0.4 • Elevate Your Academic Journey
          </p>
          <p className="text-[10px] font-medium text-crimson-200/30 uppercase tracking-widest">
            By entering, you accept the <span className="text-crimson-500 hover:text-crimson-400 cursor-pointer transition-colors">Terms of Service</span>
          </p>
        </div>
      </motion.footer>
    </motion.div>
  );
}

function DashboardView({ onStartQuiz, onGoStore, onGoMaterials }: { onStartQuiz: () => void, onGoStore: () => void, onGoMaterials: () => void, key?: string }) {
  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      className="pb-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Header / Profile Summary */}
      <section className="p-6 pt-12 relative overflow-hidden">
        {/* Large Background Number */}
        <div className="absolute top-10 left-10 text-[180px] font-black text-crimson-100/5 select-none pointer-events-none leading-none">
          42
        </div>
        
        <motion.div className="flex flex-col gap-8 relative z-10" variants={itemVariants}>
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-crimson-100 uppercase tracking-[0.2em] mb-2">Veteran Scholar</span>
              <h2 className="text-[64px] font-extrabold text-white tracking-tighter leading-none">Lv. 42</h2>
            </div>
            <div className="w-14 h-14 rounded-lg bg-crimson-gradient p-0.5 shadow-xl shadow-red-950/40">
              <div className="w-full h-full bg-ink-900 rounded-lg flex items-center justify-center">
                <span className="text-xl font-black text-white">42</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
              <span className="text-crimson-200/60">XP Progress</span>
              <span className="text-crimson-100 font-mono">8,420 / 10,000</span>
            </div>
            <div className="h-3 bg-ink-800 rounded-full overflow-hidden p-0.5">
              <motion.div 
                className="h-full bg-crimson-gradient rounded-full shadow-[0_0_15px_rgba(211,47,47,0.6)]"
                initial={{ width: 0 }}
                animate={{ width: "84.2%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      <div className="px-6 space-y-8">
        {/* Stats Grid */}
        <motion.div className="grid grid-cols-2 gap-4" variants={itemVariants}>
          <div className="bg-ink-800/50 backdrop-blur-sm p-6 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-amber-500/80 uppercase tracking-widest">Quests Done</span>
              <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Zap className="w-3 h-3 text-amber-500" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-extrabold text-white tracking-tight">128</div>
              <div className="text-[10px] font-medium text-crimson-200/40">+12 this week</div>
            </div>
          </div>
          <div className="bg-ink-800/50 backdrop-blur-sm p-6 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-crimson-100 uppercase tracking-widest">Global Rank</span>
              <div className="w-6 h-6 rounded-full bg-crimson-100/10 flex items-center justify-center">
                <Globe className="w-3 h-3 text-crimson-100" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-extrabold text-white tracking-tight">#402</div>
              <div className="text-[10px] font-medium text-crimson-200/40">Top 2% Globally</div>
            </div>
          </div>
        </motion.div>

        {/* Bayanihan Encounter Card */}
        <motion.div 
          className="bg-ink-800 rounded-lg overflow-hidden relative group"
          variants={itemVariants}
        >
          <div className="absolute top-0 right-0 w-48 h-full bg-crimson-900/5 -skew-x-12 translate-x-12 group-hover:translate-x-8 transition-transform" />
          <div className="p-6 space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="px-2.5 py-1 bg-crimson-900 text-[9px] font-black text-crimson-50 rounded-full uppercase tracking-widest">
                Bayanihan Encounter
              </div>
              <span className="text-[11px] font-bold text-crimson-200/40 uppercase tracking-widest">Midterm Season</span>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-[64px] font-extrabold text-white tracking-tighter leading-[0.9]">Midterm Boss</h3>
              <p className="text-sm text-crimson-200/60 leading-relaxed max-w-[90%]">
                Contribute damage to the class-wide boss. Your individual effort helps the entire section!
              </p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2.5">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2 text-crimson-100">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Class Progress</span>
                  </div>
                  <span className="text-white font-mono">1,240 / 5,000 HP</span>
                </div>
                <div className="h-4 bg-ink-700 rounded-lg p-1">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-crimson-100 to-crimson-900 rounded-lg shadow-[0_0_10px_rgba(211,47,47,0.3)]"
                    initial={{ width: 0 }}
                    animate={{ width: "24.8%" }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "backOut" }}
                  />
                </div>
                <p className="text-[9px] text-crimson-200/40 italic">Cumulative damage from all scholars</p>
              </div>

              <button 
                onClick={onStartQuiz}
                className="w-full py-4 bg-crimson-500 hover:bg-crimson-600 text-white font-black text-xs uppercase tracking-[0.25em] rounded-lg shadow-xl shadow-red-950/30 transition-all active:scale-[0.98] cursor-pointer"
              >
                Contribute Damage
              </button>
            </div>
          </div>
        </motion.div>

        {/* Pending Scrolls */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white tracking-tight">Pending Scrolls</h3>
              <p className="text-xs text-crimson-200/40">Active academic challenges requiring your attention.</p>
            </div>
            <button 
              onClick={onGoMaterials}
              className="text-[10px] font-bold text-crimson-100 uppercase tracking-widest hover:text-white transition-colors cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
            <QuestCard 
              title="Advanced Calculus" 
              desc="Solve the 5-point challenge on integral surfaces to gain +200 XP."
              rarity="EPIC"
              due="2h"
              color="amber"
              onClick={onGoMaterials}
            />
            <QuestCard 
              title="Organic Synth" 
              desc="Complete the lab simulation for Polymerization reactions."
              rarity="RARE"
              due="1d"
              color="crimson"
              onClick={onGoMaterials}
            />
            <QuestCard 
              title="Design Theory" 
              desc="Draft the layout for the Living Tome design system artifacts."
              rarity="LEGENDARY"
              due="In Progress"
              color="purple"
              onClick={onGoMaterials}
            />
          </div>
        </section>

        {/* Recent Chronicles */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-white tracking-tight">Recent Chronicles</h3>
          <div className="bg-ink-800/50 rounded-lg divide-y divide-white/5">
            <ChronicleItem 
              title="Earned Achievement: 'Night Owl'"
              desc="Completed 5 quizzes after midnight"
              time="3h ago"
              icon={<History className="w-4 h-4" />}
            />
            <ChronicleItem 
              title="Tier Up: Scholar Grade II"
              desc="Your reputation has increased significantly"
              time="Yesterday"
              icon={<Trophy className="w-4 h-4" />}
              isHighlight
            />
          </div>
        </section>
      </div>
    </motion.div>
  );
}

function QuestCard({ title, desc, rarity, due, color, onClick }: { title: string, desc: string, rarity: string, due: string, color: string, onClick?: () => void }) {
  const rarityColors: Record<string, string> = {
    amber: "text-amber-500 bg-amber-500/10",
    crimson: "text-crimson-100 bg-crimson-100/10",
    purple: "text-purple-400 bg-purple-400/10"
  };

  return (
    <button 
      onClick={onClick}
      className="min-w-[280px] bg-ink-800 p-6 rounded-lg space-y-6 flex flex-col text-left hover:bg-ink-700 transition-colors cursor-pointer group"
    >
      <div className="space-y-3 flex-1">
        <div className="flex items-center gap-2 text-crimson-100">
          <Scroll className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <h4 className="text-lg font-bold text-white">{title}</h4>
        </div>
        <p className="text-xs text-crimson-200/60 leading-relaxed">
          {desc}
        </p>
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-white/5">
        <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest ${rarityColors[color]}`}>
          {rarity}
        </span>
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-white">
          <Clock className="w-3 h-3 text-crimson-200/40" />
          <span>{due}</span>
        </div>
      </div>
    </button>
  );
}

function ChronicleItem({ title, desc, time, icon, isHighlight }: { title: string, desc: string, time: string, icon: ReactNode, isHighlight?: boolean }) {
  return (
    <div className="p-5 flex items-start gap-4 group hover:bg-white/5 transition-colors">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isHighlight ? 'bg-amber-500/10 text-amber-500' : 'bg-crimson-500/10 text-crimson-100'}`}>
        {icon}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex justify-between items-start">
          <h5 className="text-sm font-bold text-white leading-tight">{title}</h5>
          <span className="text-[10px] font-mono text-crimson-200/40 uppercase">{time}</span>
        </div>
        <p className="text-xs text-crimson-200/60">{desc}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-crimson-200/20 group-hover:text-crimson-200/60 transition-colors self-center" />
    </div>
  );
}

const QUESTIONS = [
  {
    id: 1,
    question: "Determine the derivative of f(x) = 3x² + 5x - 7 at x = 2.",
    options: ["17", "12", "22", "15"],
    correct: "17",
    damage: 850
  },
  {
    id: 2,
    question: "What is the integral of 2x dx from 0 to 3?",
    options: ["6", "9", "12", "3"],
    correct: "9",
    damage: 900
  },
  {
    id: 3,
    question: "Find the limit of (sin x)/x as x approaches 0.",
    options: ["0", "Infinity", "1", "Undefined"],
    correct: "1",
    damage: 950
  },
  {
    id: 4,
    question: "What is the second derivative of f(x) = e^(2x)?",
    options: ["2e^(2x)", "4e^(2x)", "e^(2x)", "4e^x"],
    correct: "4e^(2x)",
    damage: 1000
  },
  {
    id: 5,
    question: "Solve for x: log₂(x) = 5.",
    options: ["10", "25", "32", "16"],
    correct: "32",
    damage: 1100
  }
];

function QuizView({ onBack, onGoStore }: { onBack: () => void, onGoStore: () => void, key?: string }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAttacking, setIsAttacking] = useState(false);
  const [isDodging, setIsDodging] = useState(false);
  const [bossHit, setBossHit] = useState(false);
  const [bossHealth, setBossHealth] = useState(5000);
  const [playerHealth, setPlayerHealth] = useState(1000);
  const [gameState, setGameState] = useState<'playing' | 'victory' | 'defeat'>('playing');
  const [hasUsedUltimate, setHasUsedUltimate] = useState(false);
  const [combatLog, setCombatLog] = useState([
    { time: "14:21", text: "The Wraith uses 'Confusing Syntax'. Your shield absorbed 120 DMG.", color: "text-crimson-100" },
    { time: "14:20", text: "Quick Answer bonus activated: +15% Crit Chance.", color: "text-crimson-100" },
  ]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentQuestion = QUESTIONS[currentQuestionIndex];

  useEffect(() => {
    if (gameState !== 'playing') return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, currentQuestionIndex]);

  const handleTimeout = () => {
    const damage = 200;
    setPlayerHealth(prev => Math.max(0, prev - damage));
    
    const timeoutLog = {
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      text: `TIME EXPIRED! The Wraith strikes while you hesitate. -${damage} HP.`,
      color: "text-crimson-500"
    };
    setCombatLog(prevLog => [timeoutLog, ...prevLog]);

    if (playerHealth - damage <= 0) {
      setGameState('defeat');
    } else {
      nextQuestion();
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setTimeLeft(30);
    } else {
      setGameState(bossHealth <= 0 ? 'victory' : 'defeat');
    }
  };

  const handleOptionClick = (value: string) => {
    if (selectedOption || gameState !== 'playing') return;
    
    setSelectedOption(value);
    const correct = value === currentQuestion.correct;
    setIsCorrect(correct);

    if (correct) {
      setIsAttacking(true);
      const damage = currentQuestion.damage;
      setBossHealth(prev => Math.max(0, prev - damage));
      
      setTimeout(() => {
        setBossHit(true);
        setTimeout(() => setBossHit(false), 300);
        setIsAttacking(false);
        
        if (bossHealth - damage <= 0) {
          setGameState('victory');
        } else {
          setTimeout(nextQuestion, 1000);
        }
      }, 500);
    } else {
      setIsDodging(true);
      const damage = 150;
      setPlayerHealth(prev => Math.max(0, prev - damage));
      
      setTimeout(() => {
        setIsDodging(false);
        if (playerHealth - damage <= 0) {
          setGameState('defeat');
        } else {
          setTimeout(nextQuestion, 1000);
        }
      }, 1000);
    }

    const newLog = {
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      text: correct 
        ? `CRITICAL HIT! You cast 'Chain Rule' for ${currentQuestion.damage} DMG.` 
        : `MISS! Your spell fizzled. The Wraith counters for 150 DMG!`,
      color: correct ? "text-amber-500" : "text-crimson-500"
    };
    setCombatLog(prev => [newLog, ...prev]);
  };

  const handleUltimate = () => {
    if (gameState !== 'playing' || bossHealth <= 0 || hasUsedUltimate) return;
    
    setHasUsedUltimate(true);
    setIsAttacking(true);
    const damage = 1500;
    setBossHealth(prev => Math.max(0, prev - damage));
    
    const ultimateLog = {
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      text: `ULTIMATE ACTIVATED! 'The Fundamental Theorem' deals ${damage} DMG!`,
      color: "text-amber-400 font-black"
    };
    setCombatLog(prev => [ultimateLog, ...prev]);

    setTimeout(() => {
      setBossHit(true);
      setTimeout(() => setBossHit(false), 300);
      setIsAttacking(false);
      
      if (bossHealth - damage <= 0) {
        setGameState('victory');
      }
    }, 500);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      className="p-6 pb-32 space-y-6 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Combat Header / Boss Section */}
      <motion.section className="bg-ink-800 rounded-lg overflow-hidden relative min-h-[320px] flex flex-col justify-end" variants={itemVariants}>
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/calculus/800/400')] opacity-10 grayscale mix-blend-luminosity" />
        
        {/* Boss Sprite Area */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ 
              y: bossHit ? [-15, -45, -15] : [0, -15, 0],
              rotate: bossHit ? [0, 10, -10, 0] : [0, 2, -2, 0],
              filter: bossHit ? "brightness(1.5) sepia(1) hue-rotate(-50deg) saturate(5)" : "brightness(0.75) contrast(1.5)"
            }}
            transition={{ 
              duration: bossHit ? 0.3 : 4, 
              repeat: bossHit ? 0 : Infinity, 
              ease: "easeInOut" 
            }}
            className="relative"
          >
            <div className="w-48 h-48 bg-gradient-to-t from-crimson-900/40 to-transparent rounded-full blur-3xl absolute -bottom-8 left-1/2 -translate-x-1/2" />
            <img 
              src="https://media.discordapp.net/attachments/1002242021664235602/1486725853051355166/vecteezy_silhouette-of-scary-monster_63174783.png?ex=69c68cd9&is=69c53b59&hm=4ea4cb0aae7109afa8a26d8ad3b58b0ab42568176a81a7e9aaa22b637ba38e2f&=&format=webp&quality=lossless&width=1233&height=1233" 
              alt="Boss" 
              className={`w-40 h-40 object-cover rounded-full border-4 border-crimson-500/20 shadow-[0_0_50px_rgba(211,47,47,0.3)] transition-colors duration-300 ${bossHit ? 'border-amber-500' : ''}`}
              referrerPolicy="no-referrer"
            />
            <motion.div 
              className="absolute -inset-4 border border-crimson-500/20 rounded-full"
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>

        <div className="p-6 space-y-6 relative z-10 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em]">Current Encounter</span>
              <h3 className="text-sm font-bold text-crimson-200/60 uppercase">Lvl 45 Midterm Exam</h3>
            </div>
            <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
              <ArrowRight className="w-5 h-5 text-crimson-200/40 rotate-180" />
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-[56px] font-extrabold text-white tracking-tighter leading-[0.9] uppercase">The Calculus Wraith</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2 text-crimson-100">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Class Bayanihan HP</span>
                </div>
                <span className="text-white font-mono">{bossHealth.toLocaleString()} / 5,000</span>
              </div>
              <div className="h-4 bg-ink-700 rounded-lg p-1">
                <motion.div 
                  className="h-full bg-gradient-to-r from-crimson-100 to-crimson-900 rounded-lg shadow-[0_0_15px_rgba(211,47,47,0.4)]"
                  initial={{ width: "100%" }}
                  animate={{ width: `${(bossHealth / 5000) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <p className="text-[9px] text-crimson-200/40 italic">Cumulative damage from all scholars</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2 text-amber-500">
                  <Swords className="w-3.5 h-3.5" />
                  <span>Scholar Stamina</span>
                </div>
                <span className="text-white font-mono">{playerHealth.toLocaleString()} / 1,000</span>
              </div>
              <div className="h-4 bg-ink-700 rounded-lg p-1">
                <motion.div 
                  className="h-full bg-gradient-to-r from-amber-200 to-amber-600 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  initial={{ width: "100%" }}
                  animate={{ width: `${(playerHealth / 1000) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Combat Modifiers & Timer */}
      <motion.section className="bg-ink-800/50 backdrop-blur-sm p-6 rounded-lg space-y-4" variants={itemVariants}>
        <h4 className="text-[10px] font-bold text-crimson-200/40 uppercase tracking-[0.2em]">Combat Modifiers</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-ink-700/50 p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">Streak</span>
            </div>
            <span className="text-sm font-black text-amber-500">x2.5</span>
          </div>
          <div className="bg-ink-700/50 p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Swords className="w-3.5 h-3.5 text-crimson-100" />
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">Shield</span>
            </div>
            <span className="text-[11px] font-black text-crimson-100 uppercase">Active</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-[10px] font-bold text-crimson-200/40 uppercase tracking-widest">
              <Clock className="w-3 h-3" />
              <span>Round Timer</span>
            </div>
            <span className={`text-xs font-mono font-bold ${timeLeft <= 5 ? 'text-crimson-500 animate-pulse' : 'text-white'}`}>
              00:{timeLeft.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="h-1.5 bg-ink-900 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${timeLeft <= 5 ? 'bg-crimson-500' : 'bg-amber-500'}`}
              initial={{ width: "100%" }}
              animate={{ width: `${(timeLeft / 30) * 100}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </div>
        </div>
      </motion.section>

      {/* Question Section */}
      <motion.section className="bg-ink-800 rounded-lg overflow-hidden shadow-2xl relative" variants={itemVariants}>
        <AnimatePresence mode="wait">
          {gameState === 'playing' ? (
            <motion.div 
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 space-y-8"
            >
              <div className="text-center space-y-2">
                <span className="text-[11px] font-bold text-crimson-100 uppercase tracking-[0.3em]">Question {currentQuestionIndex + 1} of {QUESTIONS.length}</span>
                <h3 className="text-2xl font-bold text-white leading-tight">
                  {currentQuestion.question}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 relative">
                {currentQuestion.options.map((option, idx) => (
                  <OptionButton 
                    key={idx}
                    label={String.fromCharCode(65 + idx)} 
                    value={option} 
                    onClick={() => handleOptionClick(option)}
                    isSelected={selectedOption === option}
                    isCorrect={selectedOption === option ? isCorrect : null}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 text-center space-y-8"
            >
              <div className="space-y-4">
                <h3 className={`text-5xl font-black uppercase tracking-tighter ${gameState === 'victory' ? 'text-amber-500' : 'text-crimson-500'}`}>
                  {gameState === 'victory' ? 'Victory!' : 'Defeat!'}
                </h3>
                <p className="text-crimson-200/60">
                  {gameState === 'victory' 
                    ? 'You have banished the Calculus Wraith and secured your academic standing.' 
                    : 'Your stamina has failed. Return to the repository to gather more artifacts.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-ink-700 p-4 rounded-lg">
                  <div className="text-[10px] font-bold text-crimson-200/40 uppercase mb-1">Final Score</div>
                  <div className="text-2xl font-black text-white">{bossHealth <= 0 ? 5000 : 5000 - bossHealth}</div>
                </div>
                <div className="bg-ink-700 p-4 rounded-lg">
                  <div className="text-[10px] font-bold text-crimson-200/40 uppercase mb-1">XP Gained</div>
                  <div className="text-2xl font-black text-amber-500">+{gameState === 'victory' ? '1,200' : '450'}</div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={onBack}
                  className="w-full py-4 bg-crimson-gradient rounded-lg text-sm font-black text-crimson-50 uppercase tracking-[0.2em] shadow-xl shadow-red-950/40 cursor-pointer"
                >
                  Return to Dashboard
                </button>
                {gameState === 'defeat' && (
                  <button 
                    onClick={onGoStore}
                    className="w-full py-4 bg-ink-700 hover:bg-ink-600 rounded-lg text-sm font-black text-white uppercase tracking-[0.2em] transition-colors cursor-pointer"
                  >
                    Visit Repository
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Combat Log */}
      <motion.section className="bg-ink-800 rounded-lg p-6 space-y-6 border border-white/5" variants={itemVariants}>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-crimson-500/10 flex items-center justify-center">
            <Scroll className="w-3.5 h-3.5 text-crimson-100" />
          </div>
          <h4 className="text-sm font-black text-crimson-50 uppercase tracking-[0.2em]">Combat Log</h4>
        </div>
        
        <div className="relative">
          <div className="space-y-4 max-h-40 overflow-y-auto pr-6">
            {combatLog.map((log, idx) => (
              <LogEntry key={idx} time={log.time} text={log.text} color={log.color} />
            ))}
          </div>
          {/* Custom Scrollbar Visual */}
          <div className="absolute top-0 right-0 w-1 h-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="w-full bg-crimson-500 rounded-full"
              initial={{ height: "40%" }}
              animate={{ height: "60%", y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.section>

      {/* Arsenal / Ultimate */}
      <motion.section className="bg-ink-800 p-6 rounded-lg space-y-6" variants={itemVariants}>
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white">Academic Arsenal</h4>
            <p className="text-xs text-crimson-200/40">Ultimate damage is based on the class's average score from the LMS.</p>
          </div>
          <div className="bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Class Avg: 85%</span>
          </div>
        </div>
        <button 
          onClick={handleUltimate}
          disabled={gameState !== 'playing' || hasUsedUltimate}
          className={`w-full py-4 rounded-lg flex flex-col items-center justify-center gap-1 shadow-xl shadow-red-950/40 active:scale-[0.98] transition-all cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed ${hasUsedUltimate ? 'bg-ink-700 border border-white/5' : 'bg-crimson-gradient'}`}
        >
          <div className="flex items-center gap-3">
            <Flame className={`w-5 h-5 ${hasUsedUltimate ? 'text-crimson-200/20' : 'text-crimson-50 group-hover:animate-pulse'}`} />
            <span className={`text-sm font-black uppercase tracking-[0.2em] ${hasUsedUltimate ? 'text-crimson-200/20' : 'text-crimson-50'}`}>
              {hasUsedUltimate ? 'Ultimate Expended' : 'Class Ultimate Strike'}
            </span>
          </div>
          {hasUsedUltimate && (
            <span className="text-[9px] font-bold text-crimson-200/20 uppercase tracking-widest">One-time cast used</span>
          )}
        </button>
      </motion.section>

      {/* Flying Orb Attack (Root Level) */}
      <AnimatePresence>
        {isAttacking && (
          <motion.div
            initial={{ scale: 0, top: "60%", left: "50%", x: "-50%", opacity: 0 }}
            animate={{ 
              scale: [0, 1.5, 1], 
              top: ["60%", "50%", "40%", "30%", "20%"], 
              left: ["50%", "68%", "75%", "68%", "50%"],
              opacity: [0, 1, 1, 1, 0] 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "linear" }}
            className="fixed z-[9999] pointer-events-none"
          >
            <div className="w-12 h-12 bg-amber-500 rounded-full blur-md shadow-[0_0_30px_#f59e0b]" />
            <div className="w-6 h-6 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#fff]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface OptionButtonProps {
  label: string;
  value: string;
  onClick: () => void;
  isSelected: boolean;
  isCorrect: boolean | null;
}

const OptionButton: React.FC<OptionButtonProps> = ({ label, value, onClick, isSelected, isCorrect }) => {
  let borderColor = "border-transparent";
  let bgColor = "bg-ink-700";
  let labelBg = "bg-ink-800";

  if (isSelected) {
    if (isCorrect === true) {
      borderColor = "border-amber-500/50";
      bgColor = "bg-amber-500/10";
      labelBg = "bg-amber-500/20";
    } else if (isCorrect === false) {
      borderColor = "border-crimson-500/50";
      bgColor = "bg-crimson-500/10";
      labelBg = "bg-crimson-500/20";
    }
  }

  return (
    <button 
      onClick={onClick}
      className={`relative w-full p-4 ${bgColor} hover:bg-ink-600 border ${borderColor} rounded-lg flex items-center gap-4 transition-all group cursor-pointer active:scale-[0.99] overflow-hidden`}
    >
      <div className={`w-10 h-10 ${labelBg} rounded-lg flex items-center justify-center group-hover:border-crimson-500/30 transition-colors shrink-0`}>
        <span className={`text-sm font-black ${isSelected && isCorrect === true ? 'text-amber-500' : 'text-crimson-100'}`}>{label}</span>
      </div>
      <span className="text-lg font-bold text-white">{value}</span>
      
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`ml-auto z-50 pointer-events-none font-black text-lg uppercase tracking-tighter italic ${isCorrect ? 'text-amber-500' : 'text-crimson-500'}`}
          >
            {isCorrect ? 'CRITICAL HIT!' : 'DODGED!'}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

function LogEntry({ time, text, color }: { time: string, text: string, color: string, key?: any }) {
  // Function to highlight specific patterns in the text
  const formatText = (content: string) => {
    const parts = content.split(/(\d+\sDMG|\+\d+%\sCrit\sChance)/g);
    return parts.map((part, i) => {
      if (part.match(/\d+\sDMG/)) {
        return <span key={i} className="text-crimson-100 font-bold">{part}</span>;
      }
      if (part.match(/\+\d+%\sCrit\sChance/)) {
        return <span key={i} className="text-crimson-100/80 font-bold">{part}</span>;
      }
      return part;
    });
  };

  return (
    <div className="flex gap-4 items-start group">
      <span className="text-[11px] font-mono text-crimson-200/30 shrink-0 mt-0.5">[{time}]</span>
      <p className="text-[13px] font-medium text-white/90 leading-snug tracking-tight">
        {formatText(text)}
      </p>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${active ? 'text-crimson-500' : 'text-crimson-200/40 hover:text-crimson-200/60'}`}
    >
      <div className={`p-2 rounded-lg transition-colors ${active ? 'bg-crimson-500/10' : ''}`}>
        {icon}
      </div>
      <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}

function MaterialsView({ onBack }: { onBack: () => void, key?: string }) {
  const [selectedMaterial, setSelectedMaterial] = useState<any | null>(null);

  const materials = [
    {
      id: 1,
      title: "Calculus I - Limits & Continuity",
      type: "Scroll",
      desc: "Fundamental concepts of limits, epsilon-delta definition, and continuity theorems.",
      content: "Limits describe the behavior of a function as its argument approaches a particular value. Continuity ensures that small changes in the input result in small changes in the output. A function f(x) is continuous at x=c if the limit of f(x) as x approaches c is equal to f(c).",
      rarity: "COMMON",
      color: "crimson",
      complexity: "BEGINNER",
      xp: 200
    },
    {
      id: 2,
      title: "Derivatives Cheat Sheet",
      type: "Artifact",
      desc: "Quick reference for power rule, product rule, quotient rule, and chain rule.",
      content: "Power Rule: d/dx[x^n] = nx^(n-1). Product Rule: d/dx[uv] = u'v + uv'. Chain Rule: d/dx[f(g(x))] = f'(g(x))g'(x). Quotient Rule: d/dx[u/v] = (u'v - uv')/v^2.",
      rarity: "RARE",
      color: "amber",
      complexity: "INTERMEDIATE",
      xp: 350
    },
    {
      id: 3,
      title: "Integral Calculus Mastery",
      type: "Tome",
      desc: "Advanced techniques for integration by parts and trigonometric substitution.",
      content: "Integration by parts is based on the product rule for derivatives: ∫u dv = uv - ∫v du. Trig substitution is used to simplify integrals involving square roots of quadratic expressions like √(a^2 - x^2).",
      rarity: "EPIC",
      color: "purple",
      complexity: "ADVANCED",
      xp: 500
    },
    {
      id: 4,
      title: "Differential Equations Intro",
      type: "Scroll",
      desc: "First-order linear equations and separable variables methodology.",
      content: "A differential equation relates a function to its derivatives. Separable equations can be solved by grouping all terms with the same variable on one side: dy/dx = g(x)h(y) => ∫(1/h(y)) dy = ∫g(x) dx.",
      rarity: "LEGENDARY",
      color: "amber",
      complexity: "EXPERT",
      xp: 750
    }
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const listVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
  };

  return (
    <motion.div 
      className="pb-32 max-w-7xl mx-auto w-full min-h-screen"
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <AnimatePresence mode="wait">
        {!selectedMaterial ? (
          <motion.div 
            key="list"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8"
          >
            {/* Header */}
            <section className="p-6 pt-12 space-y-6">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 text-crimson-100/60 hover:text-crimson-100 transition-colors cursor-pointer group"
              >
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Back to Dashboard</span>
              </button>

              <div className="space-y-2">
                <span className="text-sm font-bold text-crimson-500 uppercase tracking-[0.2em]">Study Hall</span>
                <h2 className="text-[60px] font-extrabold text-crimson-50 tracking-tighter leading-none">Course Materials</h2>
                <p className="text-crimson-200/60 max-w-md">Review your acquired scrolls and artifacts to prepare for the next Bayanihan Encounter.</p>
              </div>
            </section>

            <div className="px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {materials.map((material) => (
                <motion.button
                  key={material.id}
                  variants={itemVariants}
                  onClick={() => setSelectedMaterial(material)}
                  className="bg-ink-800 p-8 rounded-lg border border-white/5 text-left hover:border-crimson-500/30 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-crimson-500/5 -skew-x-12 translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform" />
                  
                  <div className="relative z-10 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 bg-ink-700 rounded-lg flex items-center justify-center text-crimson-100">
                        {material.type === 'Scroll' ? <Scroll className="w-6 h-6" /> : material.type === 'Tome' ? <Library className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                      </div>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest ${material.color === 'amber' ? 'text-amber-500 bg-amber-500/10' : material.color === 'purple' ? 'text-purple-400 bg-purple-400/10' : 'text-crimson-100 bg-crimson-100/10'}`}>
                        {material.rarity}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-crimson-100 transition-colors">{material.title}</h3>
                      <p className="text-sm text-crimson-200/60 leading-relaxed">{material.desc}</p>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-bold text-crimson-100 uppercase tracking-widest">
                      <span>Open Artifact</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -20 }
            }}
            className="p-6 pt-12 space-y-10"
          >
            <button 
              onClick={() => setSelectedMaterial(null)}
              className="flex items-center gap-2 text-crimson-100/60 hover:text-crimson-100 transition-colors cursor-pointer group"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">Back to Materials</span>
            </button>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-crimson-500/10 rounded-xl flex items-center justify-center text-crimson-500 border border-crimson-500/20">
                    {selectedMaterial.type === 'Scroll' ? <Scroll className="w-7 h-7" /> : selectedMaterial.type === 'Tome' ? <Library className="w-7 h-7" /> : <Zap className="w-7 h-7" />}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-crimson-500 uppercase tracking-[0.3em]">{selectedMaterial.type} Artifact</span>
                    <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">{selectedMaterial.title}</h2>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-ink-800 p-10 rounded-2xl border border-white/5 space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-crimson-500/5 -skew-x-12 translate-x-32 -translate-y-32" />
                    
                    <div className="relative z-10 space-y-6">
                      <div className="flex items-center gap-3 text-amber-500">
                        <BookOpen className="w-6 h-6" />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Scholastic Content</span>
                      </div>
                      
                      <div className="space-y-6">
                        <p className="text-2xl text-crimson-50 leading-relaxed font-medium italic">
                          "{selectedMaterial.content}"
                        </p>
                        <div className="h-px bg-white/5 w-full" />
                        <p className="text-crimson-200/60 leading-relaxed">
                          This artifact contains essential knowledge for mastering {selectedMaterial.title.split(' - ')[0]}. 
                          Scholars are advised to commit these principles to memory before facing the Wraith in the next Bayanihan Encounter.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-ink-800 p-8 rounded-2xl border border-white/5 space-y-6">
                    <h4 className="text-sm font-black text-white uppercase tracking-widest">Related Concepts</h4>
                    <div className="flex flex-wrap gap-3">
                      {['Limits', 'Continuity', 'Derivatives', 'Integrals'].map((tag) => (
                        <span key={tag} className="px-4 py-2 bg-ink-900 rounded-lg text-[10px] font-bold text-crimson-200/40 uppercase tracking-widest border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-ink-800 p-8 rounded-2xl border border-white/5 space-y-8">
                    <h4 className="text-sm font-black text-white uppercase tracking-widest">Artifact Stats</h4>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-crimson-200/40 uppercase tracking-widest">Complexity</span>
                        <span className="text-sm font-black text-white uppercase tracking-tight">{selectedMaterial.complexity}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-crimson-200/40 uppercase tracking-widest">XP Value</span>
                        <span className="text-sm font-black text-amber-500">+{selectedMaterial.xp}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-crimson-200/40 uppercase tracking-widest">Rarity</span>
                        <span className={`text-xs font-black uppercase tracking-widest ${selectedMaterial.color === 'amber' ? 'text-amber-500' : selectedMaterial.color === 'purple' ? 'text-purple-400' : 'text-crimson-100'}`}>
                          {selectedMaterial.rarity}
                        </span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedMaterial(null)}
                      className="w-full py-5 bg-crimson-gradient rounded-xl text-sm font-black text-crimson-50 uppercase tracking-[0.2em] shadow-xl shadow-red-950/40 cursor-pointer active:scale-[0.98] transition-all"
                    >
                      Finish Study
                    </button>
                  </div>

                  <div className="bg-amber-500/5 border border-amber-500/10 p-6 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2 text-amber-500">
                      <Trophy className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Scholar's Tip</span>
                    </div>
                    <p className="text-xs text-amber-200/60 leading-relaxed">
                      Studying this material increases your critical strike chance by 5% in the next encounter.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function StoreView({ onGoHome, onGoQuizzes }: { onGoHome: () => void, onGoQuizzes: () => void, key?: string }) {
  const [selectedItem, setSelectedItem] = useState<{ title: string, price: number, icon: ReactNode } | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const handlePurchase = (item: { title: string, price: number, icon: ReactNode }) => {
    setSelectedItem(item);
  };

  const confirmPurchase = () => {
    setIsPurchasing(true);
    // Simulate API call
    setTimeout(() => {
      setIsPurchasing(false);
      setPurchaseSuccess(true);
    }, 1500);
  };

  return (
    <motion.div 
      className="pb-32 max-w-7xl mx-auto w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Store Header */}
      <section className="p-6 pt-12 space-y-2">
        <motion.div variants={itemVariants}>
          <span className="text-sm font-bold text-crimson-500 uppercase tracking-[0.2em]">Sari-Sari Store</span>
          <motion.h2 
            className="text-[60px] font-extrabold text-crimson-50 tracking-tighter leading-none"
            animate={{ 
              scale: [1, 1.02, 1],
              opacity: [0.9, 1, 0.9]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            Physical <br />Rewards
          </motion.h2>
        </motion.div>
      </section>

      <div className="px-6 space-y-10">
        {/* Featured Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeaturedStoreItem 
            title="1 Whole Yellow Pad"
            desc="Essential for high-stakes examinations. Redeemable at your school's partnered cafeteria or library."
            price={500}
            category="Stationery"
            categoryIcon={<Scroll className="w-4 h-4" />}
            imageSeed="paper"
            icon={<Scroll className="w-10 h-10" />}
            onPurchase={() => handlePurchase({ title: "1 Whole Yellow Pad", price: 500, icon: <Scroll className="w-12 h-12" /> })}
          />

          <FeaturedStoreItem 
            title="1 Black Pen"
            desc="The standard tool for every scholar. Grants +10% accuracy in academic combat."
            price={150}
            category="Artifact"
            categoryIcon={<Zap className="w-4 h-4" />}
            imageSeed="pen"
            icon={<Zap className="w-10 h-10" />}
            onPurchase={() => handlePurchase({ title: "1 Black Pen", price: 150, icon: <Zap className="w-12 h-12" /> })}
          />

          <FeaturedStoreItem 
            title="Canteen Meal Voucher"
            desc="Restore 100% of your Academic Stamina. Valid for one full feast at the Great Hall of Nourishment."
            price={350}
            category="Sustenance"
            categoryIcon={<Flame className="w-4 h-4" />}
            imageSeed="meal"
            icon={<Flame className="w-10 h-10" />}
            onPurchase={() => handlePurchase({ title: "Canteen Meal Voucher", price: 350, icon: <Flame className="w-12 h-12" /> })}
          />
        </div>

        {/* Essential Parchments Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-bold text-crimson-50 tracking-tight shrink-0">Essential Parchments</h3>
            <div className="h-[1px] flex-1 bg-crimson-200/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StoreItem 
              title="Index Cards" 
              desc="Pack of 50. Essential for memorization spells." 
              price="25 B" 
              icon={<BookOpen className="w-5 h-5" />} 
              onAdd={() => handlePurchase({ title: "Index Cards", price: 25, icon: <BookOpen className="w-12 h-12" /> })}
            />
            <StoreItem 
              title="Graphite Core" 
              desc="Ever-sharp lead for technical drawings." 
              price="15 B" 
              icon={<Zap className="w-5 h-5" />} 
              onAdd={() => handlePurchase({ title: "Graphite Core", price: 15, icon: <Zap className="w-12 h-12" /> })}
            />
            <StoreItem 
              title="Lore Binder" 
              desc="Expands inventory space by 5 slots." 
              price="80 B" 
              icon={<Library className="w-5 h-5" />} 
              onAdd={() => handlePurchase({ title: "Lore Binder", price: 80, icon: <Library className="w-12 h-12" /> })}
            />
          </div>
        </section>
      </div>

      {/* Purchase Confirmation Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isPurchasing && setSelectedItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-ink-800 rounded-lg overflow-hidden shadow-2xl border border-white/5"
            >
              {purchaseSuccess ? (
                <div className="p-10 text-center space-y-8">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20"
                  >
                    <ShieldCheck className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight">Artifact Secured!</h3>
                      <p className="text-crimson-200/60 text-xs">Your physical reward is ready for redemption. Scan the QR code below at a partnered location.</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl inline-block mx-auto">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=UPGRADE_REDEEM_${selectedItem.title.replace(/\s+/g, '_')}_${Date.now()}`}
                        alt="Redemption QR Code"
                        className="w-32 h-32"
                      />
                    </div>
                    
                    <div className="text-[10px] font-bold text-crimson-200/40 uppercase tracking-widest">
                      Redemption Code: UP-{Math.random().toString(36).substring(7).toUpperCase()}
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setPurchaseSuccess(false);
                      setSelectedItem(null);
                    }}
                    className="w-full py-4 bg-ink-700 hover:bg-ink-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="p-8 space-y-8">
                  <div className="text-center space-y-6">
                    <div className="w-24 h-24 bg-ink-700 rounded-lg flex items-center justify-center mx-auto text-crimson-100">
                      {selectedItem.icon}
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-crimson-500 uppercase tracking-[0.2em]">Confirm Purchase</span>
                      <h3 className="text-3xl font-black text-white tracking-tight">{selectedItem.title}</h3>
                    </div>
                  </div>

                  <div className="bg-ink-900/50 rounded-lg p-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-crimson-200/40 uppercase tracking-widest">Price</span>
                    <div className="flex items-center gap-2">
                      <BaryaIcon className="w-4 h-3 text-amber-500" />
                      <span className="text-xl font-black text-amber-500">{selectedItem.price} Barya</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => setSelectedItem(null)}
                      disabled={isPurchasing}
                      className="flex-1 py-4 bg-ink-700 hover:bg-ink-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-all disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={confirmPurchase}
                      disabled={isPurchasing}
                      className="flex-[2] py-4 bg-crimson-500 hover:bg-crimson-600 text-white font-black text-xs uppercase tracking-widest rounded-lg shadow-lg shadow-red-950/40 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isPurchasing ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        "Confirm"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FeaturedStoreItem({ title, desc, price, category, categoryIcon, imageSeed, icon, onPurchase }: { 
  title: string, 
  desc: string, 
  price: number, 
  category: string, 
  categoryIcon: ReactNode,
  imageSeed: string,
  icon: ReactNode,
  onPurchase: () => void
}) {
  return (
    <motion.div 
      className="bg-ink-800 rounded-lg overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="h-48 bg-ink-700 relative flex items-center justify-center">
        <img 
          src={`https://picsum.photos/seed/${imageSeed}/800/400`} 
          alt={title} 
          className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-amber-500/20">
              <div className="text-amber-500">{icon}</div>
           </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-500">
            {categoryIcon}
            <span className="text-[10px] font-black uppercase tracking-widest">{category}</span>
          </div>
          <h3 className="text-3xl font-black text-crimson-50 leading-tight">{title}</h3>
          <p className="text-sm text-crimson-200/60 leading-relaxed">
            {desc}
          </p>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-crimson-50">{price}</span>
            <span className="text-xs font-bold text-crimson-200/40 uppercase tracking-widest">Barya</span>
          </div>
          <button 
            onClick={onPurchase}
            className="px-8 py-3 bg-crimson-500 hover:bg-crimson-600 text-white font-bold text-sm uppercase tracking-widest rounded-lg shadow-lg shadow-red-950/40 transition-all active:scale-[0.95] cursor-pointer"
          >
            Purchase
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function StoreItem({ title, desc, price, icon, onAdd }: { title: string, desc: string, price: string, icon: ReactNode, onAdd: () => void }) {
  return (
    <div className="bg-ink-800 p-5 rounded-lg flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 bg-ink-700 rounded-lg flex items-center justify-center">
          <div className="text-crimson-200/60">{icon}</div>
        </div>
        <span className="text-sm font-bold text-crimson-50">{price}</span>
      </div>
      <div className="space-y-1">
        <h4 className="text-base font-bold text-crimson-50">{title}</h4>
        <p className="text-xs text-crimson-200/60 leading-relaxed">{desc}</p>
      </div>
      <button 
        onClick={onAdd}
        className="w-full py-2.5 bg-ink-700 hover:bg-ink-600 text-crimson-50 font-bold text-[10px] uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
      >
        Add
      </button>
    </div>
  );
}
