"use client";

import { clsx } from "clsx";
import { match } from "ts-pattern";
import { isMissing, isPresent } from "../packages/utils";
import Link from "next/link";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { Spinner } from "./Spinner";

interface IMaybeLinkWrapperProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const MaybeLinkWrapper: React.FC<IMaybeLinkWrapperProps> = ({
  href,
  children,
  className,
}) => {
  if (isMissing(href)) {
    return children;
  }

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
};

export type ButtonIntent =
  | "primary"
  | "danger"
  | "success"
  | "warning"
  | "info";
export type ButtonType = "primary" | "secondary" | "tertiary";
export type ButtonSize = "small" | "large";

const getButtonStyles = ({
  className,
  type,
  intent,
  size,
  disabled,
}: {
  className?: string;
  type: ButtonType;
  intent: ButtonIntent;
  size?: ButtonSize;
  disabled: boolean;
}) =>
  clsx(
    className,

    match({ type, intent })
      .with(
        { type: "primary", intent: "primary" },
        () => "border-sky-600 bg-sky-600 text-white shadow-sm hover:bg-sky-700"
      )

      .with(
        { type: "primary", intent: "danger" },
        () => "border-red-600 bg-red-600 text-white shadow-sm hover:bg-red-700"
      )

      .with(
        { type: "primary", intent: "success" },
        () =>
          "border-green-600 bg-green-600 text-white shadow-sm hover:bg-green-700"
      )

      .with(
        { type: "primary", intent: "warning" },
        () =>
          "border-orange-600 bg-orange-600 text-white shadow-sm hover:bg-orange-700"
      )

      .with(
        { type: "primary", intent: "info" },
        () =>
          "border-blue-600 bg-blue-600 text-white shadow-sm hover:bg-blue-700"
      )

      .with(
        { type: "secondary", intent: "primary" },
        () =>
          "border-sky-600 bg-white text-sky-600 shadow-sm hover:bg-sky-100 hover:text-sky-700 hover: border-sky-700"
      )

      .with(
        { type: "secondary", intent: "danger" },
        () =>
          "border-red-600 bg-white text-red-600 shadow-sm hover:bg-red-100 hover:text-red-700 hover: border-red-700"
      )

      .with(
        { type: "secondary", intent: "success" },
        () =>
          "border-green-600 bg-white text-green-600 shadow-sm hover:bg-green-100 hover:text-green-700 hover: border-green-700"
      )

      .with(
        { type: "secondary", intent: "warning" },
        () =>
          "border-orange-600 bg-white text-orange-600 shadow-sm hover:bg-orange-100 hover:text-orange-700 hover: border-orange-700"
      )

      .with(
        { type: "secondary", intent: "info" },
        () =>
          "border-blue-600 bg-white text-blue-600 shadow-sm hover:bg-blue-100 hover:text-blue-700 hover: border-blue-700"
      )

      .with(
        { type: "tertiary", intent: "primary" },
        () =>
          "border-transparent bg-transparent text-sky-600 hover:bg-sky-100 hover:text-sky-700"
      )

      .with(
        { type: "tertiary", intent: "danger" },
        () =>
          "border-transparent bg-transparent text-red-600 hover:bg-red-100 hover:text-red-700"
      )

      .with(
        { type: "tertiary", intent: "success" },
        () =>
          "border-transparent bg-transparent text-green-600 hover:bg-green-100 hover:text-green-700"
      )

      .with(
        { type: "tertiary", intent: "warning" },
        () =>
          "border-transparent bg-transparent text-orange-600 hover:bg-orange-100 hover:text-orange-700"
      )

      .with(
        { type: "tertiary", intent: "info" },
        () =>
          "border-transparent bg-transparent text-blue-600 hover:bg-blue-100 hover:text-blue-700"
      )
      .exhaustive(),

    match(intent)
      .with("primary", () => "bg-batonPrimary")
      .with("danger", () => "bg-batonRed")
      .with("success", () => "bg-batonGreen")
      .with("warning", () => "bg-batonOrange")
      .with("info", () => "bg-batonBlue"),

    match(size)
      .with("small", () => "text-xs")
      .with("large", () => "text-base")
      .otherwise(() => "text-sm"),

    "inline-flex items-center gap-2 w-fit justify-center rounded border px-2.5 py-1.5 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors",
    disabled && "opacity-50 cursor-not-allowed"
  );

export interface IButtonProps {
  children?: React.ReactNode;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void | Promise<void>;
  href?: string;
  className?: string;
  intent?: "primary" | "danger" | "success" | "warning" | "info";
  type?: "primary" | "secondary" | "tertiary";
  size?: "small" | "large";
  buttonType?: "button" | "submit" | "reset";
  disabled?: boolean;
  role?: React.AriaRole | undefined;
  loadingText?: string;
  formAction?: string | ((formData: FormData) => void) | undefined;
}

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      children,
      onClick,
      href,
      className,
      type = "primary",
      intent = "primary",
      size,
      buttonType,
      disabled = false,
      role,
      loadingText,
      formAction,
    },
    ref
  ) => {
    const [loading, setLoading] = useState(false);

    const { pending } = useFormStatus();

    if (isPresent(href) && isPresent(onClick)) {
      throw new Error(
        "You cannot specify both an href and an onClick handler for a button."
      );
    }

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      setLoading(true);

      await onClick?.(event);

      setLoading(false);
    };

    const getHref = () => (disabled ? undefined : href);

    const finalClassName = getButtonStyles({
      className,
      type,
      intent,
      size,
      disabled,
    });

    const renderLoadingText = () => {
      if (loadingText === "") {
        return null;
      }

      if (isMissing(loadingText)) {
        return <span>Please wait</span>;
      }

      return <span>{loadingText}</span>;
    };

    return (
      <MaybeLinkWrapper
        className={
          isMissing(href) ? "inline-flex items-center gap-2" : finalClassName
        }
        href={getHref()}
      >
        <button
          className={
            isMissing(href) ? finalClassName : "inline-flex items-center gap-2"
          }
          onClick={handleClick}
          formAction={formAction}
          type={buttonType}
          role={role}
          ref={ref}
        >
          {loading || pending ? (
            <>
              <Spinner size="small" />
              {renderLoadingText()}
            </>
          ) : (
            children
          )}
        </button>
      </MaybeLinkWrapper>
    );
  }
);
