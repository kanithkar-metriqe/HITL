import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Bot, SendHorizonal, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { askQuestion, getQueryResult } from "./services";
import metLogo from "../../../public/met-logo.png";

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

const UserBubble: React.FC<{ text: string; time: Date }> = ({ text, time }) => (
  <div className="flex justify-end gap-2 items-start">
    <div className="max-w-[70%] flex flex-col items-end gap-1">
      <div className="bg-mt-blue text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed shadow-sm">
        {text}
      </div>
      <span className="text-[11px] text-mt-gray-500">
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
    </div>
    <div className="size-8 rounded-full bg-mt-blue/10 flex items-center justify-center shrink-0 mt-0.5">
      <User className="size-4 text-mt-blue" />
    </div>
  </div>
);

const AgentBubble: React.FC<{
  text?: string;
  status: MessageStatus;
  time: Date;
}> = ({ text, status, time }) => (
  <div className="flex justify-start gap-2 items-start">
    <div className="size-8 rounded-full bg-mt-primary/10 flex items-center justify-center shrink-0 mt-0.5">
      <Bot className="size-4 text-mt-primary" />
    </div>
    <div className="max-w-[70%] flex flex-col gap-1">
      <div
        className={cn(
          "rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm leading-relaxed shadow-sm",
          status === "error"
            ? "bg-red-50 text-red-700 border border-red-200"
            : "bg-white border border-mt-border text-mt-dark"
        )}
      >
        {status === "pending" ? (
          <TypingDots />
        ) : status === "error" ? (
          <span>⚠ {text || "Something went wrong. Please try again."}</span>
        ) : (
          <span className="whitespace-pre-wrap">{text}</span>
        )}
      </div>
      {status !== "pending" && (
        <span className="text-[11px] text-mt-gray-500">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      )}
    </div>
  </div>
);

// ── Polling hook ───────────────────────────────────────────────────────────

function _usePollResult(
  trackingId: string | null,
  _onDone: (trackingId: string, answer: string, status: "completed" | "error") => void
) {
  useQuery({
    queryKey: ["query-result", trackingId],
    queryFn: () => getQueryResult(trackingId!),
    enabled: !!trackingId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status === "completed" || status === "error") return false;
      return 2000;
    },
    refetchIntervalInBackground: true,
    select: (data) => data,
    // Surface completed/error state via effect below
  });

  // We need the data in an effect — useQuery doesn't expose it outside,
  // so use a separate state-based approach:
}

// ── Main page ──────────────────────────────────────────────────────────────

const QueryPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [propertyCode, setPropertyCode] = useState("");
  const [pollingId, setPollingId] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
  };

  // Mutation: submit question
  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: ({ q, pc }: { q: string; pc: string }) =>
      askQuestion(q, pc || undefined),
    onSuccess: (data, _vars) => {
      const msgId = data.trackingId;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === msgId ? { ...m, trackingId: data.trackingId } : m
        )
      );
      setPollingId(data.trackingId);
    },
    onError: (_err, _vars) => {
      // Mark the last pending message as error
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

  // Polling: get result for current pollingId
  const { data: pollData } = useQuery({
    queryKey: ["query-result", pollingId],
    queryFn: () => getQueryResult(pollingId!),
    enabled: !!pollingId,
    refetchInterval: (query) => {
      const s = query.state.data?.status;
      if (s === "completed" || s === "error") return false;
      return 2000;
    },
    refetchIntervalInBackground: true,
  });

  // When polling result arrives, update the matching message
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

    const tempId = `msg-${Date.now()}`;

    // Add user message + pending agent bubble immediately
    const userMsg: Message = {
      id: tempId,
      question: trimmed,
      status: "pending",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    mutate({ q: trimmed, pc: propertyCode });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isBusy = isSubmitting || !!pollingId;

  return (
    <div className="flex flex-col h-dvh bg-mt-gray-680">
      {/* ── Header ── */}
      <header className="shrink-0 flex items-center justify-between px-6 py-3 bg-white border-b border-mt-border shadow-xs">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-mt-primary/10 flex items-center justify-center">
            <Bot className="size-5 text-mt-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-mt-dark leading-none">
              Query Agent
            </p>
            <p className="text-[11px] text-mt-gray-500 mt-0.5">
              Ask anything about reconciliation data
            </p>
          </div>
        </div>
        <img src={metLogo} alt="MET" className="h-7 object-contain" />
      </header>

      {/* ── Chat area ── */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center text-mt-gray-500">
            <Bot className="size-12 text-mt-primary/30" strokeWidth={1.5} />
            <p className="text-sm font-medium">Ask a question to get started</p>
            <p className="text-xs max-w-xs">
              You can ask about reconciliation status, GL lookups, bank
              transactions, PMS data, unreconciled items, and more.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <React.Fragment key={msg.id}>
            <UserBubble text={msg.question} time={msg.timestamp} />
            <AgentBubble
              text={msg.answer}
              status={msg.status}
              time={msg.timestamp}
            />
          </React.Fragment>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* ── Input area ── */}
      <div className="shrink-0 bg-white border-t border-mt-border px-4 pt-3 pb-4">
        {/* Optional property code */}
        <div className="flex items-center gap-2 mb-2">
          <label className="text-[11px] text-mt-gray-500 shrink-0">
            Property Code (optional)
          </label>
          <input
            className="text-xs border border-mt-border rounded-md px-2 py-1 w-28 focus:outline-none focus:border-mt-blue placeholder:text-mt-gray-500"
            placeholder="e.g. 362"
            value={propertyCode}
            onChange={(e) => setPropertyCode(e.target.value)}
          />
        </div>

        {/* Question input + send */}
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Type your question… (Shift+Enter for new line)"
            value={question}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            disabled={isBusy}
            className={cn(
              "flex-1 resize-none rounded-xl border border-mt-border bg-mt-gray-680",
              "px-4 py-2.5 text-sm leading-relaxed placeholder:text-mt-gray-500",
              "focus:outline-none focus:border-mt-blue transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed min-h-[42px] max-h-[160px]"
            )}
          />
          <Button
            size="default"
            variant={isBusy ? "disabled" : "default"}
            onClick={handleSend}
            disabled={isBusy || !question.trim()}
            className="rounded-xl h-[42px] px-4 shrink-0"
            aria-label="Send"
          >
            <SendHorizonal className="size-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>

        <p className="text-[10px] text-mt-gray-500 mt-1.5 text-center">
          {isBusy
            ? "Agent is thinking…"
            : "Press Enter to send · Shift+Enter for new line"}
        </p>
      </div>
    </div>
  );
};

export default QueryPage;
