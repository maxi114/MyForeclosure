'use client';
import { Form } from 'react-bootstrap';
import { Controller, useFormContext } from "react-hook-form";
import React, { forwardRef } from 'react'; // Import forwardRef

const TextInput = forwardRef(({
  name,
  id,
  className,
  containerClass,
  label,
  placeholder,
  helpText,
  errors,
  register,
  type,
  ...props
}, ref) => { // Accept ref as a parameter

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Form.Group className={containerClass ?? ''}>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Control
            id={id}
            type={type}
            {...props}
            {...field}
            ref={ref} // Attach ref to Form.Control
            value={field.value ?? ''}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            placeholder={placeholder}
            className={className}
            isInvalid={Boolean(fieldState.error?.message)}
          />
          {helpText && (
            <Form.Text id={`${name}-help`} muted>
              {helpText}
            </Form.Text>
          )}
          {errors && errors[name] && (
            <Form.Control.Feedback type="invalid">
              {errors[name]['message']}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      )}
    />
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;
