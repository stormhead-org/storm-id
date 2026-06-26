"use client";

import type {
  OryCardProps,
  OryCardContentProps,
  OryCardFooterProps,
  OryCardLogoProps,
  OryCardDividerProps,
  OryCardAuthMethodListItemProps,
  OryFormRootProps,
  OryFormGroupProps,
  OryFormSsoRootProps,
  OryNodeButtonProps,
  OryNodeSsoButtonProps,
  OryNodeInputProps,
  OryNodeCheckboxProps,
  OryNodeLabelProps,
  OryNodeTextProps,
  OryNodeAnchorProps,
  OryNodeImageProps,
  OryNodeCaptchaProps,
  OryNodeSelectProps,
  OryMessageRootProps,
  OryMessageContentProps,
  OryToastProps,
  OryFlowComponentOverrides,
  OryPageHeaderProps,
} from "@ory/elements-react";
import { useOryFlow } from "@ory/elements-react";
import { useTranslations } from "@/src/shared/lib/i18n";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/shared/components/ui/card";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
import { Checkbox } from "@/src/shared/components/ui/checkbox";
import { Separator } from "@/src/shared/components/ui/separator";
import { Alert, AlertDescription } from "@/src/shared/components/ui/alert";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/src/shared/components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select";
import { useIntl } from "react-intl";
import { cn } from "@/src/shared/lib/utils";

function MyCardRoot({ children }: OryCardProps) {
  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">{children}</Card>
    </div>
  );
}

function MyCardHeader(_props: OryCardProps) {
  const { flowType } = useOryFlow();
  const t = useTranslations();
  const titles: Record<string, { title: string; subtitle: string }> = {
    login: { title: t("auth.login.title"), subtitle: t("auth.login.subtitle") },
    registration: {
      title: t("auth.registration.title"),
      subtitle: t("auth.registration.subtitle"),
    },
    recovery: { title: t("auth.recovery.title"), subtitle: t("auth.recovery.subtitle") },
    verification: {
      title: t("auth.verification.title"),
      subtitle: t("auth.verification.subtitle"),
    },
    settings: { title: t("settings.title"), subtitle: t("settings.subtitle") },
    error: { title: t("error.title"), subtitle: "" },
  };
  const config = titles[flowType] || { title: "", subtitle: "" };

  return (
    <CardHeader className="text-center">
      <CardTitle>{config.title}</CardTitle>
      <CardDescription>{config.subtitle}</CardDescription>
    </CardHeader>
  );
}

function MyCardContent({ children }: OryCardContentProps) {
  return <CardContent>{children}</CardContent>;
}

function MyCardFooter(_props: OryCardFooterProps) {
  return null;
}

function MyCardLogo(_props: OryCardLogoProps) {
  return null;
}

function MyCardDivider(_props: OryCardDividerProps) {
  return <Separator />;
}

function MyAuthMethodListItem({ onClick, group, disabled }: OryCardAuthMethodListItemProps) {
  const t = useTranslations();
  const methodLabels: Record<string, string> = {
    password: t("auth.methods.password"),
    oidc: t("auth.methods.oidc"),
    totp: t("auth.methods.totp"),
    lookup_secret: t("auth.methods.lookup_secret"),
    webauthn: t("auth.methods.webauthn"),
    passkey: t("auth.methods.passkey"),
    link: t("auth.methods.link"),
    code: t("auth.methods.code"),
  };

  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      size="lg"
      className="w-full min-h-10"
    >
      {methodLabels[group] || group}
    </Button>
  );
}

function MyAuthMethodListContainer({ children }: React.PropsWithChildren) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

function MyFormRoot(props: OryFormRootProps) {
  const { children, ...formProps } = props;
  return (
    <form {...formProps} className="flex flex-col gap-4">
      {children}
    </form>
  );
}

function MyFormGroup({ children }: OryFormGroupProps) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

function MyFormSsoRoot({ children }: OryFormSsoRootProps) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

const INPUT_TYPE_MAP: Record<string, string> = {
  password: "password",
  email: "email",
  number: "number",
  tel: "tel",
  url: "url",
  date: "date",
};

function MyNodeInput({ node, inputProps }: OryNodeInputProps) {
  const inputType = inputProps.type;
  const name = inputProps.name;

  if (inputType === "hidden") {
    return <input key={name} type="hidden" name={name} value={String(inputProps.value ?? "")} />;
  }

  return (
    <Input
      id={name}
      name={name}
      type={INPUT_TYPE_MAP[inputType] || "text"}
      defaultValue={typeof inputProps.value === "string" ? inputProps.value : ""}
      placeholder={inputProps.placeholder || node.meta?.label?.text}
      disabled={inputProps.disabled}
      required
      autoComplete={inputProps.autoComplete}
      onChange={(e) => inputProps.onChange(e)}
      onBlur={inputProps.onBlur}
    />
  );
}

function MyCodeInput({ node: _node, inputProps }: OryNodeInputProps) {
  const name = inputProps.name;

  return (
    <div className="flex justify-center">
      <input type="hidden" name={name} value={String(inputProps.value ?? "")} />
      <InputOTP
        maxLength={6}
        value={String(inputProps.value ?? "")}
        onChange={(val) => inputProps.onChange({ target: { value: val, name } })}
        disabled={inputProps.disabled}
      >
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
  );
}

function MyNodeButton({ node, isSubmitting, buttonProps }: OryNodeButtonProps) {
  const intl = useIntl();
  const isPrimary =
    buttonProps.name === "method" &&
    ["password", "profile", "totp"].includes(String(buttonProps.value));
  const label = node.meta?.label
    ? intl.formatMessage(
        { id: `identities.messages.${node.meta.label.id}`, defaultMessage: node.meta.label.text },
        node.meta.label.context as Record<string, string> | undefined,
      )
    : "Submit";

  return (
    <Button
      type={buttonProps.type as "submit" | "button"}
      name={buttonProps.name}
      value={typeof buttonProps.value === "string" ? buttonProps.value : ""}
      disabled={buttonProps.disabled || isSubmitting}
      variant={isPrimary ? "default" : "outline"}
      size="lg"
      className="w-full min-h-10"
      onClick={buttonProps.onClick}
    >
      {isSubmitting ? "..." : label}
    </Button>
  );
}

function MyNodeSsoButton({ node, provider, isSubmitting, buttonProps }: OryNodeSsoButtonProps) {
  const intl = useIntl();
  const label = node.meta?.label
    ? intl.formatMessage(
        { id: `identities.messages.${node.meta.label.id}`, defaultMessage: node.meta.label.text },
        node.meta.label.context as Record<string, string> | undefined,
      )
    : provider;

  return (
    <Button
      variant="outline"
      type={buttonProps.type as "submit" | "button"}
      name={buttonProps.name}
      value={typeof buttonProps.value === "string" ? buttonProps.value : ""}
      disabled={buttonProps.disabled || isSubmitting}
      size="lg"
      className="w-full gap-2 min-h-10"
      onClick={buttonProps.onClick}
    >
      {label}
    </Button>
  );
}

function MyNodeLabel({ node, children }: OryNodeLabelProps) {
  const attrs = node.attributes;
  const name = "name" in attrs ? (attrs.name as string) : undefined;

  return (
    <Label htmlFor={name} className="block">
      {children}
    </Label>
  );
}

function MyNodeCheckbox({ node, inputProps }: OryNodeCheckboxProps) {
  const name = inputProps.name;
  const label = node.meta?.label?.text || name;

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={name}
        name={name}
        checked={inputProps.checked}
        disabled={inputProps.disabled}
        onCheckedChange={(checked) => {
          inputProps.onChange({ target: { name, checked, value: inputProps.value } });
        }}
      />
      <Label htmlFor={name} className="cursor-pointer text-sm font-normal">
        {label}
      </Label>
    </div>
  );
}

function MyNodeText({ node }: OryNodeTextProps) {
  const attrs = node.attributes;
  if (attrs.node_type !== "text") return null;

  const content = attrs.text;
  if (!content?.text) return null;

  const isError = content.type === "error";

  return (
    <p className={cn("text-sm", isError ? "text-destructive" : "text-muted-foreground")}>
      {content.text}
    </p>
  );
}

function MyNodeAnchor(props: OryNodeAnchorProps) {
  const { attributes, node: _node, ...anchorProps } = props;

  return (
    <a
      {...anchorProps}
      href={attributes.href}
      className="text-primary underline underline-offset-4 hover:text-primary/80"
    >
      {attributes.title.text}
    </a>
  );
}

function MyNodeImage({ node }: OryNodeImageProps) {
  return <img src={node.attributes.src} alt="" className="mx-auto max-w-[200px] h-auto" />;
}

function MyNodeCaptcha(_props: OryNodeCaptchaProps) {
  return null;
}

function MyNodeSelect({ node, inputProps, options }: OryNodeSelectProps) {
  return (
    <Select
      name={inputProps.name}
      defaultValue={typeof inputProps.value === "string" ? inputProps.value : ""}
      disabled={inputProps.disabled}
      onValueChange={(val) =>
        inputProps.onChange({ target: { value: val, name: inputProps.name } })
      }
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={inputProps.placeholder || node.meta?.label?.text} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={String(opt.value)} value={String(opt.value)}>
            {String(opt.value)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function MyMessageToast({ message }: OryToastProps) {
  const isError = message.type === "error";

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border p-4 text-sm shadow-md",
        isError
          ? "border-destructive bg-destructive/10 text-destructive"
          : "border-border bg-background text-foreground",
      )}
    >
      {message.text}
    </div>
  );
}

function MyMessageRoot({ children }: OryMessageRootProps) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

function MyMessageContent({ message }: OryMessageContentProps) {
  const isError = message.type === "error";

  return (
    <Alert variant={isError ? "destructive" : "default"}>
      <AlertDescription>{message.text}</AlertDescription>
    </Alert>
  );
}

function MyPageHeader(_props: OryPageHeaderProps) {
  return null;
}

export const baseOverrides: OryFlowComponentOverrides = {
  Card: {
    Root: MyCardRoot,
    Header: MyCardHeader,
    Content: MyCardContent,
    Footer: MyCardFooter,
    Logo: MyCardLogo,
    Divider: MyCardDivider,
    AuthMethodListContainer: MyAuthMethodListContainer,
    AuthMethodListItem: MyAuthMethodListItem,
  },
  Form: {
    Root: MyFormRoot,
    Group: MyFormGroup,
    SsoRoot: MyFormSsoRoot,
  },
  Node: {
    Input: MyNodeInput,
    CodeInput: MyCodeInput,
    Button: MyNodeButton,
    SsoButton: MyNodeSsoButton,
    Label: MyNodeLabel,
    Checkbox: MyNodeCheckbox,
    Select: MyNodeSelect,
    Text: MyNodeText,
    Anchor: MyNodeAnchor,
    Image: MyNodeImage,
    Captcha: MyNodeCaptcha,
  },
  Message: {
    Root: MyMessageRoot,
    Content: MyMessageContent,
    Toast: MyMessageToast,
  },
  Page: {
    Header: MyPageHeader,
  },
};
