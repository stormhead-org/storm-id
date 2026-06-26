"use client";

import { useState } from "react";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/src/shared/components/ui/input-otp";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/shared/components/ui/field";
import { Alert, AlertDescription } from "@/src/shared/components/ui/alert";
import { cn } from "@/src/shared/lib/utils";

export interface KratosNode {
  type: string;
  group?: string;
  attributes: Record<string, unknown>;
  messages?: Array<{ text: string; type: string }>;
  meta?: { label?: { text?: string } };
}

export interface KratosUi {
  nodes: KratosNode[];
  messages?: Array<{ text: string; type: string }>;
  action?: string;
  method?: string;
}

interface KratosFormFieldsProps {
  ui: KratosUi;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  noValidate?: boolean;
}

function KratosMessages({ messages }: { messages: KratosUi["messages"] }) {
  if (!messages?.length) return null;

  return (
    <>
      {messages.map((msg, i) => (
        <Alert key={i} variant={msg.type === "error" ? "destructive" : "default"}>
          <AlertDescription>{msg.text}</AlertDescription>
        </Alert>
      ))}
    </>
  );
}

function KratosTotpNode({ node, index }: { node: KratosNode; index: number }) {
  const [otpValue, setOtpValue] = useState("");
  const attrs = node.attributes;
  const name = attrs.name as string | undefined;
  const disabled = attrs.disabled as boolean | undefined;
  const errorMsg = node.messages?.find((m) => m.type === "error")?.text;
  const displayLabel = node.meta?.label?.text || name || "";
  const nodeKey = name ? `${name}-${index}` : `totp-${index}`;

  return (
    <Field key={nodeKey}>
      {displayLabel && <FieldLabel htmlFor={name}>{displayLabel}</FieldLabel>}
      <input type="hidden" name={name} value={otpValue} />
      <div className="flex justify-center">
        <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue} disabled={disabled}>
          <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator className="mx-2" />
          <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      {errorMsg && <FieldError>{errorMsg}</FieldError>}
    </Field>
  );
}

function KratosInputNode({ node, index }: { node: KratosNode; index: number }) {
  const attrs = node.attributes;
  const inputType = attrs.type as string | undefined;
  const name = attrs.name as string | undefined;
  const value = attrs.value as string | undefined;
  const required = attrs.required as boolean | undefined;
  const disabled = attrs.disabled as boolean | undefined;
  const group = node.group;
  const nodeKey = name ? `${name}-${index}` : `input-${index}`;

  if (group === "totp" && inputType === "text" && name === "totp_code") {
    return <KratosTotpNode node={node} index={index} />;
  }

  if (inputType === "hidden") {
    return <input key={nodeKey} type="hidden" name={name} value={value || ""} />;
  }

  if (inputType === "submit") {
    const label = node.meta?.label?.text || (value as string) || "Submit";
    return (
      <Button
        key={nodeKey}
        type="submit"
        name={name}
        value={value}
        disabled={disabled}
        className="w-full"
      >
        {label}
      </Button>
    );
  }

  const errorMsg = node.messages?.find((m) => m.type === "error")?.text;
  const displayLabel = node.meta?.label?.text || name || "";
  const placeholder = node.meta?.label?.text || "";

  return (
    <Field key={nodeKey}>
      {displayLabel && <FieldLabel htmlFor={name}>{displayLabel}</FieldLabel>}
      <Input
        id={name}
        name={name}
        type={inputType === "password" ? "password" : inputType === "email" ? "email" : "text"}
        required={required}
        disabled={disabled}
        defaultValue={value || ""}
        placeholder={placeholder}
      />
      {errorMsg && <FieldError>{errorMsg}</FieldError>}
    </Field>
  );
}

export function KratosFormFields({ ui, onSubmit, noValidate }: KratosFormFieldsProps) {
  return (
    <form
      action={ui.action as string}
      method={ui.method as string}
      acceptCharset="UTF-8"
      className="w-full"
      onSubmit={onSubmit}
      noValidate={noValidate}
    >
      <FieldGroup>
        <KratosMessages messages={ui.messages} />

        {ui.nodes?.map((node, i) => {
          const nodeName = (node.attributes as Record<string, unknown>)?.name as string | undefined;
          const nodeKey = nodeName ? `${nodeName}-${i}` : `node-${i}`;

          if (node.type === "script") {
            const src = node.attributes.src as string | undefined;
            return (
              <script
                key={nodeKey}
                src={src}
                async={node.attributes.async as boolean | undefined}
                id={node.attributes.id as string | undefined}
              />
            );
          }

          if (node.type === "text") {
            const text = (node.attributes.text as string) || node.messages?.[0]?.text || "";
            return (
              <FieldDescription
                key={nodeKey}
                className={cn(node.group !== "default" && "text-center")}
              >
                {text}
              </FieldDescription>
            );
          }

          if (node.type === "button") {
            const label = node.meta?.label?.text || (node.attributes.value as string) || "Submit";
            return (
              <Button
                key={nodeKey}
                type="submit"
                name={node.attributes.name as string}
                value={node.attributes.value as string}
                disabled={node.attributes.disabled as boolean}
                className="w-full"
              >
                {label}
              </Button>
            );
          }

          if (node.type === "input") {
            return <KratosInputNode key={nodeKey} node={node} index={i} />;
          }

          return null;
        })}
      </FieldGroup>
    </form>
  );
}
