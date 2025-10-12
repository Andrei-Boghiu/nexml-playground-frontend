import type { ReactNode, HTMLAttributes } from "react";

type ContentProp<T extends HTMLElement = HTMLElement> = {
  children: ReactNode;
} & HTMLAttributes<T>;

export function TypographyH1({ children, ...props }: ContentProp<HTMLHeadingElement>) {
  const { className, ...restOfProps } = props;

  return (
    <h1
      className={"scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance " + className}
      {...restOfProps}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ children, ...props }: ContentProp<HTMLHeadingElement>) {
  const { className, ...restOfProps } = props;

  return (
    <h2
      className={"scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 " + className}
      {...restOfProps}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ children, ...props }: ContentProp<HTMLHeadingElement>) {
  const { className, ...restOfProps } = props;

  return (
    <h3 className={"scroll-m-20 text-2xl font-semibold tracking-tight " + className} {...restOfProps}>
      {children}
    </h3>
  );
}
export function TypographyH4({ children, ...props }: ContentProp<HTMLHeadingElement>) {
  const { className, ...restOfProps } = props;

  return (
    <h4 className={"scroll-m-20 text-xl font-semibold tracking-tight " + className} {...restOfProps}>
      {children}
    </h4>
  );
}

export function TypographyP({ children, ...props }: ContentProp<HTMLParagraphElement>) {
  const { className, ...restOfProps } = props;

  return (
    <p className={"leading-7 [&:not(:first-child)]:mt-6 " + className} {...restOfProps}>
      {children}
    </p>
  );
}

export function TypographyBlockquote({ children, ...props }: ContentProp<HTMLQuoteElement>) {
  const { className, ...restOfProps } = props;

  return (
    <blockquote className={"mt-6 border-l-2 pl-6 italic " + className} {...restOfProps}>
      {children}
    </blockquote>
  );
}

export function TypographyMuted({ children, ...props }: ContentProp<HTMLParagraphElement>) {
  const { className, ...restOfProps } = props;

  return (
    <p className={"text-muted-foreground text-sm " + className} {...restOfProps}>
      {children}
    </p>
  );
}
