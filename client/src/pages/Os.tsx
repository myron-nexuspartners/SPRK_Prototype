import React, { useState } from "react";
import { 
  Sparkles, Send, Upload, FileText, Settings, HelpCircle, 
  Layers, MessageSquare, ChevronRight, Play, Check, 
  Flame, BarChart3, Scissors, Tag, Sliders, FolderOpen,
  Search, Grid, Shield, Plus, Database, Cpu
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import SharedLayout from "@/components/SharedLayout";

export default function Os() {
  const [prompt, setPrompt] = useState("");
  const [selectedTool, setSelectedTool] = useState("overlays");
  const [selectedNav, setSelectedNav] = useState("projects");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      text: "Welcome to SPRK-OS, your premium AI content editing suite. I can generate high-converting video hooks, draft engaging social captions, or structure overlay blueprints. Upload a video draft or type a topic below to begin."
    }
  ]);

  const handleSendPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMsg = prompt;
    setChatHistory(prev => [...prev, { role: "user", text: userMsg }]);
    setPrompt("");

    // Simulate AI response based on SPRK tools
    setTimeout(() => {
      let reply = "I've analyzed your prompt. Let's use the Hook Creator tool on the right to optimize this concept for mobile streaming platforms.";
      if (userMsg.toLowerCase().includes("hook") || userMsg.toLowerCase().includes("gaming")) {
        reply = "Here is a high-converting hook formula for your Gaming draft:\n\n'I beat the hardest boss blindfolded, but what happened at the 10-second mark changed everything...'\n\nLet's apply this with an overlay in the tool panel on the right.";
      } else if (userMsg.toLowerCase().includes("fashion") || userMsg.toLowerCase().includes("drop")) {
        reply = "Fashion campaign detected. I suggest a 'Streetwear Mystery Drop' overlay template. First 100 viewers get direct smart contract coupon cards. Use the Title/Tags/Thumbs panel on the right to complete deployment.";
      }
      setChatHistory(prev => [...prev, { role: "assistant", text: reply }]);
    }, 1000);
  };

  const handleFileUpload = () => {
    toast.success("File uploaded successfully. SPRK-OS has processed the draft metadata.");
    setUploadedFiles(prev => [...prev, "gaming_draft_v2.mp4"]);
  };

  return (
    <SharedLayout activeSite="os">
      <div className="bg-[#F5F0EB]/30 min-h-[calc(100vh-120px)] flex flex-col">
        
        {/* Full Workspace Grid Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* 1. LEFT SIDEBAR: Official Handsketch Nav Menu */}
          <aside className="lg:col-span-2 bg-white border-r border-black/5 flex flex-col justify-between p-4 min-h-[400px] lg:min-h-0">
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-[10px] font-bold text-[#8E7A8A] uppercase tracking-widest px-3 block mb-3">Workspace</span>
                <div className="flex flex-col gap-1">
                  {[
                    { id: "projects", label: "Projects", icon: FolderOpen },
                    { id: "files", label: "Files & Uploads", icon: FileText },
                    { id: "search", label: "Search OS", icon: Search },
                    { id: "templates", label: "Templates", icon: Grid },
                    { id: "agents", label: "AI Agents", icon: Cpu },
                    { id: "plugins", label: "Plugins", icon: Sliders },
                    { id: "library", label: "Asset Library", icon: Database }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedNav(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                          selectedNav === item.id
                            ? "bg-[#F5F0EB] text-[#0A0A0F]"
                            : "text-[#4A5278] hover:bg-[#F5F0EB]/40 hover:text-[#0A0A0F]"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${selectedNav === item.id ? "text-[#FF6B35]" : ""}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Uploaded Files Section */}
              {uploadedFiles.length > 0 && (
                <div className="px-3">
                  <span className="text-[9px] font-bold text-[#8E7A8A] uppercase tracking-wider block mb-2">Active Assets</span>
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] font-bold text-[#0A0A0F] bg-[#F5F0EB]/50 p-2 rounded-lg border border-black/5">
                      <FileText className="w-3.5 h-3.5 text-[#FF6B35]" />
                      <span className="truncate">{file}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom System Settings */}
            <div className="border-t border-black/5 pt-4 flex flex-col gap-1">
              <button onClick={() => toast.info("Studio settings is in demo mode.")} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold text-[#4A5278] hover:bg-[#F5F0EB]/40 hover:text-[#0A0A0F] text-left">
                <Settings className="w-4 h-4" />
                <span>Studio Settings</span>
              </button>
              <button onClick={() => toast.info("Support center is available in live builds.")} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold text-[#4A5278] hover:bg-[#F5F0EB]/40 hover:text-[#0A0A0F] text-left">
                <HelpCircle className="w-4 h-4" />
                <span>Help & Docs</span>
              </button>
            </div>
          </aside>

          {/* 2. CENTER COLUMN: Claude-Style AI Prompt & Chat Console */}
          <main className="lg:col-span-6 bg-[#F5F0EB]/20 border-r border-black/5 flex flex-col justify-between p-6 h-[500px] lg:h-auto">
            
            {/* Active Workspace Header */}
            <div className="flex items-center justify-between border-b border-black/5 pb-4 mb-4">
              <div>
                <h2 className="text-base font-bold text-[#0A0A0F]">AI Content Co-Pilot</h2>
                <p className="text-xs text-[#4A5278] mt-0.5">Prompt, draft, and refine in a premium workspace</p>
              </div>
              <Badge className="bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 font-bold uppercase rounded-full px-2.5 py-0.5 text-[10px]">
                SPRK-OS v2.2
              </Badge>
            </div>

            {/* Chat History Area */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-2 scrollbar-thin max-h-[350px] lg:max-h-[500px]">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "self-end flex-row-reverse" : "self-start"}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                    msg.role === "user" ? "bg-[#0A0A0F] text-white" : "bg-gradient-to-br from-[#FF6B35] to-[#E8003D] text-white"
                  }`}>
                    {msg.role === "user" ? "U" : "S"}
                  </div>
                  <div className={`rounded-2xl p-4 text-xs font-medium leading-relaxed shadow-sm ${
                    msg.role === "user" ? "bg-[#0A0A0F] text-white" : "bg-white border border-black/5 text-[#0A0A0F]"
                  }`}>
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Prompter Form and File Dropzone */}
            <div className="mt-6 flex flex-col gap-3">
              
              {/* File dropzone simulator */}
              <div 
                onClick={handleFileUpload}
                className="border border-dashed border-black/10 rounded-xl p-4 bg-white text-center cursor-pointer hover:bg-[#F5F0EB]/30 transition-all flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4 text-[#FF6B35]" />
                <span className="text-xs font-bold text-[#4A5278]">Drag and drop media drafts or <span className="text-[#FF6B35] underline">browse files</span></span>
              </div>

              {/* Chat Input Console */}
              <form onSubmit={handleSendPrompt} className="relative">
                <Input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask SPRK Co-Pilot to draft hooks, overlays, or campaign details..."
                  className="w-full pr-12 pl-4 h-12 bg-white border border-black/5 rounded-xl text-xs font-medium focus:ring-[#FF6B35]"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#0A0A0F] hover:bg-[#FF6B35] text-white flex items-center justify-center transition-colors">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </main>

          {/* 3. RIGHT SIDEBAR: Handsketch Editing Tools Panel */}
          <aside className="lg:col-span-4 bg-white p-6 flex flex-col gap-6 overflow-y-auto h-[500px] lg:h-auto">
            
            {/* Tool Selection Header */}
            <div>
              <span className="text-[10px] font-bold text-[#8E7A8A] uppercase tracking-widest block mb-3">Editing & Refinement Tools</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "overlays", label: "Post Overlays", icon: Layers },
                  { id: "hooks", label: "Hook Creators", icon: Flame },
                  { id: "builders", label: "Channel Builder", icon: Sliders },
                  { id: "meta", label: "Title & Tags", icon: Tag },
                  { id: "reports", label: "Measurement", icon: BarChart3 }
                ].map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => {
                        setSelectedTool(tool.id);
                        toast.success(`Active tool: ${tool.label}`);
                      }}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all text-left ${
                        selectedTool === tool.id
                          ? "bg-[#0A0A0F] text-white border-transparent"
                          : "border-black/5 text-[#4A5278] hover:bg-[#F5F0EB]/40 hover:text-[#0A0A0F]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{tool.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Active Tool Panel */}
            <div className="bg-[#F5F0EB]/30 border border-black/5 rounded-2xl p-5 flex-1 flex flex-col justify-between">
              
              {selectedTool === "overlays" && (
                <div className="flex flex-col gap-4">
                  <div className="border-b border-black/5 pb-2">
                    <h4 className="text-xs font-bold text-[#0A0A0F]">Post Overlays</h4>
                    <p className="text-[10px] text-[#4A5278] mt-0.5">Inject dynamic interaction assets directly into streaming frames</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#4A5278]">Overlay Type</span>
                      <Badge className="bg-[#0A0A0F] text-white text-[9px] uppercase font-bold">Interactive Poll</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#4A5278]">Interactive Drops</span>
                      <span className="text-[11px] font-extrabold text-[#0A0A0F]">Enabled (Coupon Escrow)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#4A5278]">Overlay Placement</span>
                      <span className="text-[11px] font-extrabold text-[#0A0A0F]">Lower-Third Banner</span>
                    </div>
                  </div>
                  <button onClick={() => toast.success("Overlay blueprint generated! Deploying to the-SPRK content layer.")} className="w-full bg-[#0A0A0F] hover:bg-[#FF6B35] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors mt-2">
                    Generate Overlay
                  </button>
                </div>
              )}

              {selectedTool === "hooks" && (
                <div className="flex flex-col gap-4">
                  <div className="border-b border-black/5 pb-2">
                    <h4 className="text-xs font-bold text-[#0A0A0F]">Hook Creators</h4>
                    <p className="text-[10px] text-[#4A5278] mt-0.5">Optimize the first 3 seconds of video to maximize engagement</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#4A5278]">Target Hook Score</span>
                      <span className="text-[11px] font-extrabold text-[#FF6B35]">9.4/10 (Excellent)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#4A5278]">Interest Niche</span>
                      <span className="text-[11px] font-extrabold text-[#0A0A0F]">Gaming / Streetwear</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#4A5278]">Emotional Trigger</span>
                      <span className="text-[11px] font-extrabold text-[#0A0A0F]">Curiosity & FOMO</span>
                    </div>
                  </div>
                  <button onClick={() => toast.success("Hook options sent to AI Co-Pilot chat.")} className="w-full bg-[#0A0A0F] hover:bg-[#FF6B35] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors mt-2">
                    Draft Hooks
                  </button>
                </div>
              )}

              {selectedTool === "builders" && (
                <div className="flex flex-col gap-4">
                  <div className="border-b border-black/5 pb-2">
                    <h4 className="text-xs font-bold text-[#0A0A0F]">Channel Builder</h4>
                    <p className="text-[10px] text-[#4A5278] mt-0.5">Structure custom playlists, landing pages, and interactive ribbons</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#4A5278]">Featured Ribbon</span>
                      <span className="text-[11px] font-extrabold text-[#0A0A0F]">Active (yourSPRK layout)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#4A5278]">Display Feed</span>
                      <span className="text-[11px] font-extrabold text-[#0A0A0F]">Spotify-Style grid</span>
                    </div>
                  </div>
                  <button onClick={() => toast.success("Channel structure saved to Pavilion marketplace profile.")} className="w-full bg-[#0A0A0F] hover:bg-[#FF6B35] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors mt-2">
                    Save Channel Structure
                  </button>
                </div>
              )}

              {selectedTool === "meta" && (
                <div className="flex flex-col gap-4">
                  <div className="border-b border-black/5 pb-2">
                    <h4 className="text-xs font-bold text-[#0A0A0F]">Title, Tags, & Thumbs</h4>
                    <p className="text-[10px] text-[#4A5278] mt-0.5">AI-assisted SEO optimization for maximum organic reach</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#4A5278]">CTR Prediction</span>
                      <span className="text-[11px] font-extrabold text-green-600">+14.2% Growth</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#4A5278]">SEO Score</span>
                      <span className="text-[11px] font-extrabold text-[#0A0A0F]">98/100</span>
                    </div>
                  </div>
                  <button onClick={() => toast.success("Metadata and thumbnail prompts drafted.")} className="w-full bg-[#0A0A0F] hover:bg-[#FF6B35] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors mt-2">
                    Draft Metadata
                  </button>
                </div>
              )}

              {selectedTool === "reports" && (
                <div className="flex flex-col gap-4">
                  <div className="border-b border-black/5 pb-2">
                    <h4 className="text-xs font-bold text-[#0A0A0F]">Measurement & Reporting</h4>
                    <p className="text-[10px] text-[#4A5278] mt-0.5">Monitor real-time campaign performance and smart contract state</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#4A5278]">Campaign Views</span>
                      <span className="text-[11px] font-extrabold text-[#0A0A0F]">48.2k total</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#4A5278]">Smart Contract Status</span>
                      <span className="text-[11px] font-extrabold text-green-600">Escrow Funded</span>
                    </div>
                  </div>
                  <button onClick={() => toast.info("Real-time reports are available in your main analytics dashboard.")} className="w-full bg-[#0A0A0F] hover:bg-[#FF6B35] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors mt-2">
                    Open Dashboard
                  </button>
                </div>
              )}

              {/* Deployment status box */}
              <div className="border-t border-black/5 pt-4 mt-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="font-bold text-[#4A5278]">Platform Sync: Active</span>
                </div>
                <button onClick={() => toast.success("Draft deployed to the-SPRK feed!")} className="text-[#FF6B35] font-extrabold hover:underline">
                  Deploy Draft
                </button>
              </div>

            </div>

          </aside>

        </div>

      </div>
    </SharedLayout>
  );
}
