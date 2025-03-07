'use client'; // внимание, проверить закоментированные общие импорты
// этого компонента, кажtтся проблема была в том, что
//  не было 'use client' нельзя же было пользоваться контекстом на
//  сервере. так что Controller, useFormContext не могли работать

import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormTextarea } from '../form';
import { AdressInput } from '../address-input';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';

interface CheckoutAddressFormProps {
  className?: string;
}

export const CheckoutAddressForm: React.FC<CheckoutAddressFormProps> = ({
  className,
}) => {
  const { control } = useFormContext();
  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AdressInput onChange={field.onChange} />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}
            </>
          )}
        />

        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
