import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, FileText, Send } from "lucide-react";

interface SidePanelProps {
  messages: { text: string; sender: string }[];
  notes: string[];
  onSendMessage: (text: string) => void;
  onAddNote: (text: string) => void;
  readOnly?: boolean;
}

export default function SidePanel({
  messages,
  notes,
  onSendMessage,
  onAddNote,
  readOnly = false,
}: SidePanelProps) {
  const [activeTab, setActiveTab] = useState("chat");
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, notes, activeTab]);

  const handleSend = () => {
    if (!input.trim()) return;

    if (activeTab === "chat") {
      onSendMessage(input);
    } else {
      onAddNote(input);
    }
    setInput("");
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const renderChat = () => {
    if (!messages.length) {
      return (
        <div className="flex flex-col items-center justify-center h-32 text-gray-500">
          <MessageCircle className="w-8 h-8 mb-2 opacity-50" />
          <p className="text-sm">No messages yet</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {messages.map((msg, i) => {
          const isYou = msg.sender.toLowerCase() === "you";
          return (
            <div
              key={i}
              className={`max-w-xs p-3 rounded-lg shadow-sm ${
                isYou
                  ? "bg-primary text-primary-foreground self-end ml-auto text-right"
                  : "bg-muted text-muted-foreground self-start mr-auto text-left"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          );
        })}
      </div>
    );
  };

  const renderNotes = () => {
    if (!notes.length) {
      return (
        <div className="flex flex-col items-center justify-center h-32 text-gray-500">
          <FileText className="w-8 h-8 mb-2 opacity-50" />
          <p className="text-sm">No notes yet</p>
        </div>
      );
    }
    return (
      <div className="space-y-3">
        {notes.map((note, i) => (
          <div
            key={i}
            className="bg-yellow-100/50 dark:bg-yellow-900/20 border border-yellow-200/50 dark:border-yellow-700/50 rounded-lg p-3 shadow-sm"
          >
            <p className="text-foreground">{note}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-secondary flex flex-col border rounded-xl shadow-lg overflow-hidden">
      {/* Header with Tabs */}
      <div className="bg-secondary/50 border-b ">
        <div className="flex p-1">
          {[
            { key: "chat", label: "Chat", icon: MessageCircle },
            { key: "notes", label: "Notes", icon: FileText },
          ].map(({ key, label, icon: Icon }) => (
            <button
              type="button"
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === key
                  ? "bg-card text-card-foreground shadow-sm"
                  : " hover:bg-card/30 "
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0" ref={scrollRef}>
        <div className="h-full">
          {activeTab === "chat" ? renderChat() : renderNotes()}
        </div>
      </div>

      {/* Input Section - Hidden if ReadOnly */}
      {!readOnly && (
        <div className="p-4 border-t bg-secondary/50">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                activeTab === "chat" ? "Type a message..." : "Write a note..."
              }
              className="flex-1 px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary placeholder-muted-foreground"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center text-primary-foreground"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
