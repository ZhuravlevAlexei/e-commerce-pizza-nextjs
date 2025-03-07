'use client'; // внимание, проверить закоментированные общие импорты
// этого компонента, кажtтся проблема была в том, что
//  не было 'use client' нельзя же было пользоваться контекстом на
//  сервере. так что Controller, useFormContext не могли работать

import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui';
import { ClearButton } from '../clear-button';
import { ErrorText } from '../error-text';
import { RequiredSymbol } from '../required-symbol';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    setError,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    // setValue(name, '', { shouldValidate: true }); //важно см. поведение формы при валидации
    setValue(name, '');
    setError(name, { message: '' }); //от так лучше
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input className="h-12 text-base" {...register(name)} {...props} />

        {value && <ClearButton onClick={onClickClear} />}
      </div>
      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
