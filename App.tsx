
import React, { useState, useCallback } from 'react';
import { SetupForm } from './components/SetupForm';
import { ChatWindow } from './components/ChatWindow';
import { EvaluationReport } from './components/EvaluationReport';
import { geminiService } from './services/geminiService';
import { InterviewPhase, CandidateProfile, Message, EvaluationReport as ReportType } from './types';

const App: React.FC = () => {
  const [phase, setPhase] = useState<InterviewPhase>(InterviewPhase.SETUP);
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<ReportType | null>(null);

  const handleSetupComplete = async (p: CandidateProfile) => {
    setProfile(p);
    setPhase(InterviewPhase.INTERVIEW);
    setIsLoading(true);
    try {
      const welcomeText = await geminiService.startInterview(p);
      setMessages([{
        role: 'model',
        text: welcomeText,
        timestamp: Date.now()
      }]);
    } catch (error) {
      console.error("Failed to start interview:", error);
      alert("System Error: Failed to initialize interview engine. Check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = { role: 'user', text, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await geminiService.sendMessage(text);
      
      const aiMessage: Message = { 
        role: 'model', 
        text: aiResponse, 
        timestamp: Date.now() 
      };
      setMessages(prev => [...prev, aiMessage]);

      if (aiResponse.toLowerCase().includes("interview is now complete")) {
        setTimeout(handleGenerateReport, 2000);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: "Error: Connection to assessment panel interrupted. Please retry.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!profile) return;
    setIsLoading(true);
    try {
      const generatedReport = await geminiService.generateReport(profile, messages);
      setReport(generatedReport);
      setPhase(InterviewPhase.EVALUATION);
    } catch (error) {
      console.error("Report generation error:", error);
      alert("Error: Analysis engine failed to process the session. Closing.");
      restart();
    } finally {
      setIsLoading(false);
    }
  };

  const restart = () => {
    setPhase(InterviewPhase.SETUP);
    setProfile(null);
    setMessages([]);
    setReport(null);
  };

  const handleExit = () => {
    if (messages.length > 5) {
      if (confirm("Would you like to generate a report based on the current answers before exiting?")) {
        handleGenerateReport();
      } else {
        restart();
      }
    } else {
      restart();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 font-sans text-slate-100 overflow-hidden">
      {/* Navigation */}
      <nav className="h-14 border-b border-slate-900 flex items-center px-6 md:px-12 justify-between bg-slate-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white text-xs shadow-lg shadow-indigo-500/30">AH</div>
          <span className="font-bold text-sm tracking-tight text-white uppercase flex items-center gap-1.5">
            AceHire <span className="text-slate-500 font-normal">v3.5</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Secure</span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {phase === InterviewPhase.SETUP && (
          <div className="flex-1 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-950/20 via-slate-950 to-slate-950 overflow-y-auto">
            <SetupForm onComplete={handleSetupComplete} />
          </div>
        )}

        {phase === InterviewPhase.INTERVIEW && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <ChatWindow 
              messages={messages} 
              onSendMessage={handleSendMessage} 
              isLoading={isLoading}
              isInterviewComplete={messages.some(m => m.text.toLowerCase().includes("interview is now complete"))}
              onExit={handleExit}
            />
          </div>
        )}

        {phase === InterviewPhase.EVALUATION && report && (
          <div className="flex-1 overflow-y-auto bg-slate-50 scroll-smooth">
            <EvaluationReport report={report} onRestart={restart} />
          </div>
        )}
      </main>

      {/* Dynamic Background Blur */}
      {phase !== InterviewPhase.EVALUATION && (
        <div className="fixed bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-900/5 to-transparent -z-10 pointer-events-none"></div>
      )}
    </div>
  );
};

export default App;
