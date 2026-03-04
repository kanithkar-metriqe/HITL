import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Bot, SendHorizonal, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { askQuestion, getQueryResult } from "@/pages/query/services";

// ── Types ──────────────────────────────────────────────────────────────────

type MessageStatus = "pending" | "completed" | "error";

interface Message {
  id: string;
  question: string;
  answer?: string;
  status: MessageStatus;
  trackingId?: string;
  timestamp: Date;
}

// ── Sub-components ─────────────────────────────────────────────────────────

const TypingDots: React.FC = () => (
  <span className="inline-flex items-center gap-1">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="size-1.5 rounded-full bg-mt-blue/50 animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </span>
);

const UserBubble: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex justify-end gap-2 items-start">
    <div className="max-w-[80%]">
      <div className="bg-mt-blue text-white rounded-2xl rounded-tr-sm px-3 py-2 text-xs leading-relaxed shadow-sm">
        {text}
      </div>
    </div>
    <div className="size-6 rounded-full bg-mt-blue/10 flex items-center justify-center shrink-0 mt-0.5">
      <User className="size-3 text-mt-blue" />
    </div>
  </div>
);

const AgentBubble: React.FC<{ text?: string; status: MessageStatus }> = ({
  text,
  status,
}) => (
  <div className="flex justify-start gap-2 items-start">
    <div className="size-6 rounded-full bg-mt-primary/10 flex items-center justify-center shrink-0 mt-0.5">
      <Bot className="size-3 text-mt-primary" />
    </div>
    <div className="max-w-[80%]">
      <div
        className={cn(
          "rounded-2xl rounded-tl-sm px-3 py-2 text-xs leading-relaxed shadow-sm",
          status === "error"
            ? "bg-red-50 text-red-700 border border-red-200"
            : "bg-white border border-mt-border text-mt-dark"
        )}
      >
        {status === "pending" ? (
          <TypingDots />
        ) : status === "error" ? (
          <span>⚠ {text || "Something went wrong."}</span>
        ) : (
          <span className="whitespace-pre-wrap">{text}</span>
        )}
      </div>
    </div>
  </div>
);

// ── Widget ─────────────────────────────────────────────────────────────────

const QueryChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [pollingId, setPollingId] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lastTempIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
  };

  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: ({ q }: { q: string }) => askQuestion(q),
    onSuccess: (data) => {
      const tempId = lastTempIdRef.current;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === tempId ? { ...m, trackingId: data.trackingId } : m
        )
      );
      setPollingId(data.trackingId);
    },
    onError: () => {
      setMessages((prev) => {
        const idx = [...prev].reverse().findIndex((m) => m.status === "pending");
        if (idx === -1) return prev;
        const realIdx = prev.length - 1 - idx;
        const updated = [...prev];
        updated[realIdx] = {
          ...updated[realIdx],
          status: "error",
          answer: "Failed to reach the server. Please try again.",
        };
        return updated;
      });
    },
  });

  const { data: pollData } = useQuery({
    queryKey: ["widget-query-result", pollingId],
    queryFn: () => getQueryResult(pollingId!),
    enabled: !!pollingId,
    refetchInterval: (query) => {
      const s = query.state.data?.status;
      if (s === "completed" || s === "error") return false;
      return 2000;
    },
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (!pollData || !pollingId) return;
    if (pollData.status === "processing") return;

    setMessages((prev) =>
      prev.map((m) =>
        m.trackingId === pollingId
          ? {
              ...m,
              status: pollData.status === "completed" ? "completed" : "error",
              answer:
                pollData.status === "completed"
                  ? pollData.answer
                  : pollData.error || "An error occurred.",
            }
          : m
      )
    );
    setPollingId(null);
  }, [pollData, pollingId]);

  const handleSend = () => {
    const trimmed = question.trim();
    if (!trimmed || isSubmitting || pollingId) return;

    const tempId = `widget-msg-${Date.now()}`;
    lastTempIdRef.current = tempId;

    setMessages((prev) => [
      ...prev,
      { id: tempId, question: trimmed, status: "pending", timestamp: new Date() },
    ]);
    setQuestion("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    mutate({ q: trimmed });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isBusy = isSubmitting || !!pollingId;

  return (
    <>
      {/* ── Chat panel ── */}
      {open && (
        <div className="fixed bottom-20 right-4 z-50 w-80 sm:w-96 flex flex-col rounded-2xl shadow-2xl border border-mt-border bg-mt-gray-680 overflow-hidden"
          style={{ height: "480px" }}>
          {/* Header */}
          <div className="shrink-0 flex items-center justify-between px-4 py-3 bg-white border-b border-mt-border">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-full bg-mt-primary/10 flex items-center justify-center">
                <Bot className="size-4 text-mt-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-mt-dark leading-none">Query Agent</p>
                <p className="text-[10px] text-mt-gray-500 mt-0.5">Ask about reconciliation data</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="size-6 flex items-center justify-center rounded-full hover:bg-mt-gray-680 text-mt-gray-500 transition-colors"
            >
              <X className="size-3.5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-center text-mt-gray-500">
                <Bot className="size-8 text-mt-primary/30" strokeWidth={1.5} />
                <p className="text-xs font-medium">Ask a question to get started</p>
                <p className="text-[10px] max-w-[200px]">
                  Reconciliation status, GL lookups, bank transactions, and more.
                </p>
              </div>
            )}
            {messages.map((msg) => (
              <React.Fragment key={msg.id}>
                <UserBubble text={msg.question} />
                <AgentBubble text={msg.answer} status={msg.status} />
              </React.Fragment>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 bg-white border-t border-mt-border px-3 pt-2 pb-3">
            <div className="flex gap-2 items-end">
              <textarea
                ref={textareaRef}
                rows={1}
                placeholder="Ask a question…"
                value={question}
                onChange={handleTextareaInput}
                onKeyDown={handleKeyDown}
                disabled={isBusy}
                className={cn(
                  "flex-1 resize-none rounded-xl border border-mt-border bg-mt-gray-680",
                  "px-3 py-2 text-xs leading-relaxed placeholder:text-mt-gray-500",
                  "focus:outline-none focus:border-mt-blue transition-colors",
                  "disabled:opacity-50 disabled:cursor-not-allowed min-h-[36px] max-h-[100px]"
                )}
              />
              <Button
                size="default"
                variant={isBusy ? "disabled" : "default"}
                onClick={handleSend}
                disabled={isBusy || !question.trim()}
                className="rounded-xl h-9 px-3 shrink-0"
                aria-label="Send"
              >
                <SendHorizonal className="size-3.5" />
              </Button>
            </div>
            <p className="text-[9px] text-mt-gray-500 mt-1 text-center">
              {isBusy ? "Agent is thinking…" : "Enter to send · Shift+Enter for new line"}
            </p>
          </div>
        </div>
      )}

      {/* ── FAB ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed bottom-4 right-4 z-50 size-14 rounded-full shadow-lg",
          "flex items-center justify-center transition-all duration-200",
          open
            ? "bg-mt-gray-500 hover:bg-mt-gray-600"
            : "bg-mt-primary hover:bg-mt-primary/90"
        )}
        aria-label="Toggle Query Agent"
      >
        {open ? (
          <X className="size-5 text-white" />
        ) : (
          <Bot className="size-6 text-white" />
        )}
      </button>
    </>
  );
};

export default QueryChatWidget;
