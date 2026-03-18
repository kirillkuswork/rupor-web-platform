import clsx from 'clsx';
import React, {
  ButtonHTMLAttributes,
  createContext,
  HTMLAttributes,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { animated, useTransition } from 'react-spring';
import { Collapse, DraggableList, Preview } from 'rupor-ui-kit';
import { BaseButton, Button } from 'rupor-ui-kit/dist/components/Button';
import { ButtonProps } from 'rupor-ui-kit/dist/components/Button/Button.types';
import { DraggableListProps } from 'rupor-ui-kit/dist/components/DraggableList/DraggableList.types';
import { DropdownMenuProps } from 'rupor-ui-kit/dist/components/DropdownMenu/DropdownMenu.types';
import { PreviewProps } from 'rupor-ui-kit/dist/components/Preview/Preview.types';

type Steps = 'initial' | 'added' | 'watched' | 'active' | 'delete';

const QueueItemCtx = createContext<Steps>('initial');
const DragActiveCtx = createContext<boolean>(false);

interface WrapperProps {
  open?: boolean;
  data: unknown[];
  onSwap?: DraggableListProps['onSwap'];
}

export const Container = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`${className} pb-3 rounded-xl overflow-hidden`}
    {...props}
  />
);

export const Header = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => (
  <header
    className={`
    ${className}
    RuiCardsQueue-Header
    cursor-pointer relative flex justify-between items-center py-4 px-6 cl-dynamic-primary text-paragraph-m-l font-bold
    dark:hover:bg-white/5 hover:bg-black/5
    `}
    {...props}
  />
);

export const DraggbleWrapper = (props: HTMLAttributes<HTMLDivElement> & WrapperProps) => {
  const {
    className = '',
    children,
    open,
    data,
    onSwap,
    ...htmlDivProps
  } = props;
  const items = React.Children.toArray(children) as JSX.Element[];

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const itemsLengthRef = useRef(items.length);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (wrapperRef.current && items.length > itemsLengthRef.current) {
      wrapperRef.current.scroll({
        top: wrapperRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
    itemsLengthRef.current = items.length;
  }, [items.length]);

  return (
    <Collapse open={open}>
      <div
        ref={wrapperRef}
        className={`${className} overflow-y-auto overflow-x-hidden max-h-[296px] scrollbar`}
        {...htmlDivProps}
      >
        <DragActiveCtx.Provider value={dragActive}>
          <DraggableList
            itemHeight={74}
            items={items.map((item) => (
              <div key={item.key}>
                {item}
              </div>
            ))}
            data={data}
            onSwap={onSwap}
            onActive={setDragActive}
          />
        </DragActiveCtx.Provider>
      </div>
    </Collapse>
  );
};

export const Wrapper = (props: HTMLAttributes<HTMLDivElement> & { open?: boolean }) => {
  const {
    className = '',
    children,
    open,
    ...htmlDivProps
  } = props;
  const items = React.Children.toArray(children) as JSX.Element[];

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const itemsLengthRef = useRef(items.length);

  const transitions = useTransition(items, {
    from: { opacity: 0, x: '0%', height: 74 },
    enter: { opacity: 1, x: '0%', height: 74 },
    leave: { opacity: 0, x: '0%', height: 0 },
    keys: (item) => item.key || '1',
    trail: 100,
  });

  useEffect(() => {
    if (wrapperRef.current && items.length > itemsLengthRef.current) {
      wrapperRef.current.scroll({
        top: wrapperRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
    itemsLengthRef.current = items.length;
  }, [items.length]);

  return (
    <Collapse open={open}>
      <div
        ref={wrapperRef}
        className={`${className} overflow-y-auto overflow-x-hidden max-h-[296px] max-w-full scrollbar`}
        {...htmlDivProps}
      >
        <div className="relative z-0">
          {transitions((style, item) => (
            <animated.div
              style={style}
              key={item.key}
            >
              {item}
            </animated.div>
          ))}
        </div>
      </div>
    </Collapse>
  );
};

export const Item = (props: HTMLAttributes<HTMLDivElement> & { step: Steps, onAdd?: () => void; addedMs?: number }) => {
  const {
    className = '',
    step,
    onAdd,
    addedMs = 5000,
    children,
    ...htmlDivProps
  } = props;

  const dragActive = useContext(DragActiveCtx);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (step === 'added' && onAdd) {
      timeout = setTimeout(onAdd, addedMs);
    }

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, dragActive]);

  return (
    <div
      className={clsx(
        className,
        step === 'added' && 'dark:bg-white/5 bg-black/5 animate-pulse',
        'RuiCardsQueue-Item relative cl-dynamic-primary px-6 py-3 h-[74px] overflow-hidden duration-200',
        'dark:hover:bg-white/5 hover:bg-black/5 dark:md:hover:bg-transparent md:hover:bg-transparent cursor-pointer',
      )}
      {...htmlDivProps}
    >
      <QueueItemCtx.Provider value={step}>
        {children}
      </QueueItemCtx.Provider>
    </div>
  );
};

export const Title = ({ className = '', children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={`${className} truncate text-paragraph-l-m font-semibold cl-dynamic-primary`}
    {...props}
  >
    {children}
  </h3>
);

export const PlayedIconWrapper = ({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const step = useContext(QueueItemCtx);

  const transitions = useTransition(step === 'active', {
    from: { opacity: 0, width: 0 },
    enter: { opacity: 1, width: 40 },
    leave: { opacity: 0, width: 0 },
    reverse: step !== 'active',
  });

  return transitions(
    (styles, item) => item && (
      <animated.div
        style={styles}
        className={`${className} shrink-0`}
        {...props}
      >
        {children}
      </animated.div>
    ),
  );
};

export const Label = ({ className = '', children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={`${className} truncate text-paragraph-l-m font-normal dark:text-white/40 text-black/40`}
    {...props}
  >
    {children}
  </h3>
);

export const PreviewQueue = ({ className = '', ...props }: PreviewProps) => {
  const step = useContext(QueueItemCtx);

  return (
    <Preview
      className={clsx(
        className,
        'w-[88px] mr-4 shrink-0 duration-200',
        step === 'watched' && 'opacity-60',
      )}
      {...props}
      id={props.id}
    />
  );
};

export const InfoWrapper = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`${className} cursor-pointer truncate mr-4 grow`}
    {...props}
  />
);

export const DeleteWrapper = ({
  className = '', children, ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const step = useContext(QueueItemCtx);

  const transitions = useTransition(step === 'delete', {
    from: { opacity: 0, transform: 'rotateX(90deg)' },
    enter: { opacity: 1, transform: 'rotateX(0deg)' },
    leave: { opacity: 0, transform: 'rotateX(-90deg)' },
    reverse: step !== 'delete',
  });

  return transitions(
    (styles, item) => item && (
      <animated.div
        style={styles}
        className={`${className} flex items-center overlay dark:bg-white/5 bg-black/5 px-6 py-3`}
        {...props}
      >
        {children}
      </animated.div>
    ),
  );
};

export const DeleteTimer = (props: HTMLAttributes<HTMLSpanElement> & { seconds: number; onEnd?: () => void }) => {
  const {
    className = '',
    seconds,
    onEnd,
    ...htmlSpanProps
  } = props;
  const [time, setTime] = useState(seconds);
  const step = useContext(QueueItemCtx);
  const dragActive = useContext(DragActiveCtx);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time === 0) {
        if (!dragActive) {
          onEnd?.();
        }
        clearInterval(interval);
      } else {
        setTime(time - 1);
      }
    }, 1000);

    if (step !== 'delete') {
      clearInterval(interval);
    }

    if (time === 0 && !dragActive) {
      onEnd?.();
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, step, dragActive]);

  return (
    <span
      className={`
      ${className} text-paragraph-m-s font-normal text-red-alert inline-flex w-[35px] relative mr-4
      before:block before:absolute before:w-[1px] before:h-[8px] before:-right-2 before:top-1/2 before:-translate-y-1/2
      dark:before:bg-white/40 before:bg-black/40
      `}
      {...htmlSpanProps}
    >
      {`00:0${time}`}
    </span>
  );
};

export const CardWrapper = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => {
  const step = useContext(QueueItemCtx);

  return (
    <div
      className={clsx(
        className,
        step === 'delete' && 'opacity-0',
        'flex items-center duration-200',
      )}
      {...props}
    />
  );
};

export const DropdownMenu = ({
  className = '',
  onClick,
  onPointerDown,
  ...props
}: DropdownMenuProps) => {
  const step = useContext(QueueItemCtx);

  if (step === 'added' || step === 'delete') {
    return null;
  }

  return (
    <DropdownMenu
      returnFocus={false}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        onPointerDown?.(e);
      }}
      className={`${className} md:rotate-90 absolute right-6 top-1/2 -translate-y-1/2 opacity-0 md:opacity-100`}
      {...props}
    />
  );
};

export const CancelAddBtn = ({
  className = '',
  onPointerDown,
  onClick,
  ...props
}: ButtonProps) => {
  const step = useContext(QueueItemCtx);

  if (step !== 'added') {
    return null;
  }

  return (
    <Button
      variant="tertiary"
      className={`${className} ml-auto`}
      onClick={(e) => {
        // e.stopPropagation();
        onClick?.(e);
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        onPointerDown?.(e);
      }}
      {...props}
    />
  );
};

export const CancelDelButton = ({ className = '', ...props }: ButtonProps) => {
  const step = useContext(QueueItemCtx);

  const transitions = useTransition(step === 'delete', {
    from: { opacity: 0, x: '100%' },
    enter: { opacity: 1, x: '0' },
    leave: { opacity: 0, x: '100%' },
    reverse: step !== 'delete',
  });

  return transitions(
    (styles, item) => item && (
      <animated.div
        style={styles}
        className={`${className} ml-auto`}
      >
        <Button
          variant="tertiary"
          {...props}
        />
      </animated.div>
    ),
  );
};

export const BaseButtonQueue = ({
  className = '',
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <BaseButton
    onClick={(e) => {
      e.stopPropagation();
      onClick?.(e);
    }}
    className={`${className}
      RuiCardsQueue-BaseButton opacity-0 dark:text-white/40 text-black/40
      dark:hover:text-white hover:text-black
      ml-auto font-semibold text-paragraph-m-s mr-6 duration-200`}
    {...props}
  />
);

export const CardsQueue = {
  Container,
  Header,
  DraggbleWrapper,
  Wrapper,
  Item,
  Title,
  PlayedIconWrapper,
  Label,
  PreviewQueue,
  InfoWrapper,
  DeleteWrapper,
  DeleteTimer,
  CardWrapper,
  DropdownMenu,
  CancelAddBtn,
  CancelDelButton,
  BaseButtonQueue,
};
