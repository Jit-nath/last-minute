import React, { useState } from "react";
import { MessageCircle, FileText, Send } from "lucide-react";

export default function SidePanel() {
    const [activeTab, setActiveTab] = useState("chat");
    const [chatMessages, setChatMessages] = useState<{ text: string; sender: string }[]>([]);
    const [notes, setNotes] = useState<string[]>([]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;

        if (activeTab === "chat") {
            setChatMessages((prev) => [...prev, { text: input, sender: "You" }]);
        } else {
            setNotes((prev) => [...prev, input]);
        }
        setInput("");
    };

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const renderChat = () => {
        if (!chatMessages.length) {
            return (
                <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                    <MessageCircle className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-sm">No messages yet</p>
                </div>
            );
        }

        return (
            <div className="space-y-3">
                {chatMessages.map((msg, i) => {
                    const isYou = msg.sender.toLowerCase() === "you";
                    return (
                        <div
                            key={i}
                            className={`max-w-xs p-3 rounded-lg shadow-sm ${isYou
                                ? "bg-card text-white self-end ml-auto text-right"
                                : "bg-gray-200 text-gray-800 self-start mr-auto text-left"
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
                    <div key={i} className="bg-yellow-100 border border-chart-3 rounded-lg p-3 shadow-sm">
                        <p className="text-gray-800">{note}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="w-full h-full bg-secondary flex flex-col border  rounded-xl shadow-lg overflow-hidden">
            {/* Header with Tabs */}
            <div className="bg-secondary/50 border-b ">
                <div className="flex p-1">
                    {[
                        { key: "chat", label: "Chat", icon: MessageCircle },
                        { key: "notes", label: "Notes", icon: FileText }
                    ].map(({ key, label, icon: Icon }) => (
                        <button
                            type="button"
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200 ${activeTab === key
                                ? "bg-card text-white shadow-sm"
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
            <div className="flex-1 overflow-y-auto p-4 min-h-0">
                <div className="h-full">
                    {activeTab === "chat" ? renderChat() : renderNotes()}
                </div>
            </div>

            {/* Input Section */}
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
                        className="flex-1 px-3 py-2 bg-sidebar-accent border-1 rounded-lg focus:outline-none focus:ring-sidebar-primary focus:border-0 focus:ring-1 text-sidebar-accent-foreground placeholder-gray-500"
                    />
                    <button
                        type="button"
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="bg-primary hover:bg-card disabled:bg-primary/50 disabled:cursor-not-allowed px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                        <Send className="w-4 h-4 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}