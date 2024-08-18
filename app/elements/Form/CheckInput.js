'use client';
import React, { forwardRef } from 'react';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';

const CheckInput = forwardRef(({ 
    name, 
    id, 
    control, 
    className, 
    containerClass, 
    label, 
    placeholder, 
    helpText, 
    errors, 
    register, 
    type, 
    defaultChecked, 
    ...props 
}, ref) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
            <Form.Group className={`${containerClass} d-flex gap-1`}>
                <Form.Check
                    type={type}
                    id={id ?? name}
                    {...props}
                    {...field}
                    ref={ref} 
                    value={field.value ?? ''}
                    onChange={(e) => {
                    field.onChange(e.target.checked);
                    }}
                    placeholder={placeholder}
                    className={className}
                    isInvalid={Boolean(fieldState.error?.message)}
                />
                {label && <Form.Label htmlFor={id ?? name}>{label}</Form.Label>}
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

// Add display name for the component
CheckInput.displayName = 'CheckInput';

export default CheckInput;