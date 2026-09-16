import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cx } from './utils';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string; hint?: string; error?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, label, hint, error, className, required, ...props }, ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  return <div className={cx('flex w-full flex-col gap-1.5 text-sm', className)}>
    <label htmlFor={inputId} className="font-medium text-slate-800">{label}{required && <span className="ml-1 text-rose-600" aria-hidden="true">*</span>}</label>
    <input ref={ref} id={inputId} required={required} aria-invalid={!!error || undefined}
      aria-describedby={error || hint ? descriptionId : undefined}
      className={cx('h-11 w-full rounded-xl border bg-white px-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100', error ? 'border-rose-500' : 'border-slate-300')} {...props} />
    {(error || hint) && <p id={descriptionId} className={cx('text-xs', error ? 'text-rose-600' : 'text-slate-500')}>{error || hint}</p>}
  </div>;
});
