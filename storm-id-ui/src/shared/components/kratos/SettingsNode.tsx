"use client";

import Script from "next/script";
import { useState, type ChangeEvent } from "react";
import { Input } from "@/src/shared/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/src/shared/components/ui/input-otp";
import { Button } from "@/src/shared/components/ui/button";
import { useTranslations } from "@/src/shared/lib/i18n";
import { Field, FieldDescription, FieldLabel } from "@/src/shared/components/ui/field";
import type {
  UiNode,
  UiNodeInputAttributes,
  UiNodeTextAttributes,
  UiNodeScriptAttributes,
  UiNodeAnchorAttributes,
  UiNodeImageAttributes,
} from "@/src/shared/lib/kratos-settings-types";

interface SettingsNodeProps {
  node: UiNode;
  value?: string | boolean;
  onChange?: (name: string, value: string | boolean) => void;
  disabled?: boolean;
}

function isInputAttrs(attrs: UiNode["attributes"]): attrs is UiNodeInputAttributes {
  return attrs.node_type === "input";
}

function isTextAttrs(attrs: UiNode["attributes"]): attrs is UiNodeTextAttributes {
  return attrs.node_type === "text";
}

function isScriptAttrs(attrs: UiNode["attributes"]): attrs is UiNodeScriptAttributes {
  return attrs.node_type === "script";
}

function isAnchorAttrs(attrs: UiNode["attributes"]): attrs is UiNodeAnchorAttributes {
  return attrs.node_type === "a";
}

function isImageAttrs(attrs: UiNode["attributes"]): attrs is UiNodeImageAttributes {
  return attrs.node_type === "img";
}

function renderInputNode(
  attrs: UiNodeInputAttributes,
  value?: string | boolean,
  onChange?: (name: string, value: string | boolean) => void,
  disabled?: boolean,
  group?: string,
  meta?: { label?: { text?: string } },
  t?: (key: string) => string,
) {
  const { name, type, required, autocomplete } = attrs;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = type === "checkbox" ? e.target.checked : e.target.value;
    onChange?.(name, val);
  };

  if (type === "hidden") {
    return (
      <input key={name} type="hidden" name={name} value={String(value ?? attrs.value ?? "")} />
    );
  }

  if (type === "submit" || type === "button") {
    return (
      <Button key={name} type="submit" disabled={disabled || attrs.disabled}>
        {attrs.label?.text || "Submit"}
      </Button>
    );
  }

  const FIELD_I18N: Record<string, string> = {
    password: "profile.security.fields.password",
    "traits.email": "profile.general.fields.traits.email",
    "traits.name": "profile.general.fields.traits.name",
  };

  const displayLabel =
    t && FIELD_I18N[name] ? t(FIELD_I18N[name]) : attrs.label?.text || meta?.label?.text || name;

  if (group === "totp" && type === "text" && name === "totp_code") {
    return (
      <SettingsTotpNode
        name={name}
        displayLabel={displayLabel}
        disabled={disabled || attrs.disabled}
        value={value}
        onChange={onChange}
      />
    );
  }

  return (
    <Field key={name}>
      <FieldLabel htmlFor={name}>{displayLabel}</FieldLabel>
      <Input
        id={name}
        name={name}
        type={type === "password" ? "password" : "text"}
        value={String(value ?? attrs.value ?? "")}
        onChange={handleChange}
        disabled={disabled || attrs.disabled}
        required={required}
        autoComplete={autocomplete}
      />
    </Field>
  );
}

function SettingsTotpNode({
  name,
  displayLabel,
  disabled,
  value,
  onChange,
}: {
  name: string;
  displayLabel: string;
  disabled?: boolean;
  value?: string | boolean;
  onChange?: (name: string, value: string | boolean) => void;
}) {
  const [otpValue, setOtpValue] = useState(String(value ?? ""));

  const handleOtpChange = (newValue: string) => {
    setOtpValue(newValue);
    onChange?.(name, newValue);
  };

  return (
    <Field key={name}>
      <FieldLabel htmlFor={name}>{displayLabel}</FieldLabel>
      <input type="hidden" name={name} value={otpValue} />
      <div className="flex justify-center">
        <InputOTP maxLength={6} value={otpValue} onChange={handleOtpChange} disabled={disabled}>
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
    </Field>
  );
}

function renderTextNode(attrs: UiNodeTextAttributes) {
  const text = attrs.text.text;
  const isCode =
    text.includes(" - ") || text.split("\n").some((l) => /^[A-Z0-9]{4,}/.test(l.trim()));

  if (isCode && text.includes("\n")) {
    const lines = text.split("\n").filter(Boolean);
    return (
      <div className="flex flex-col gap-1 my-1">
        {lines.map((line, i) => {
          const trimmed = line.trim();
          if (!trimmed) return null;
          return (
            <div key={i} className="px-4 py-2 rounded font-mono text-sm bg-muted tracking-wider">
              {trimmed}
            </div>
          );
        })}
      </div>
    );
  }

  const variant =
    attrs.text.type === "error"
      ? "destructive"
      : attrs.text.type === "success"
        ? "default"
        : undefined;

  return (
    <FieldDescription
      key={attrs.id}
      className={variant === "destructive" ? "text-destructive" : ""}
    >
      {text}
    </FieldDescription>
  );
}

function renderScriptNode(attrs: UiNodeScriptAttributes) {
  const crossOrigin = attrs.crossorigin as "anonymous" | "use-credentials" | undefined;
  return (
    <Script
      key={attrs.id}
      id={attrs.id}
      src={attrs.src}
      async={attrs.async}
      crossOrigin={crossOrigin}
      strategy="afterInteractive"
    />
  );
}

function renderAnchorNode(attrs: UiNodeAnchorAttributes) {
  return (
    <a
      key={attrs.id}
      href={attrs.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground underline"
    >
      {attrs.title.text}
    </a>
  );
}

function renderImageNode(attrs: UiNodeImageAttributes) {
  return (
    <img key={attrs.id} src={attrs.src} alt={attrs.alt || ""} className="max-w-[200px] h-auto" />
  );
}

export function SettingsNode({ node, value, onChange, disabled }: SettingsNodeProps) {
  const t = useTranslations();
  const attrs = node.attributes;

  if (isInputAttrs(attrs)) {
    return renderInputNode(attrs, value, onChange, disabled, node.group, node.meta, t);
  }

  if (isTextAttrs(attrs)) {
    return renderTextNode(attrs);
  }

  if (isScriptAttrs(attrs)) {
    return renderScriptNode(attrs);
  }

  if (isAnchorAttrs(attrs)) {
    return renderAnchorNode(attrs);
  }

  if (isImageAttrs(attrs)) {
    return renderImageNode(attrs);
  }

  return null;
}
