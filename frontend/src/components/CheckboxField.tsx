import { useField, useFormikContext } from 'formik';

interface CheckboxFieldProps {
    name: string;
    value: string;
    children: React.ReactNode;
}

const CheckboxField = ({ name, value, children }: CheckboxFieldProps) => {
    const { values, setFieldValue } = useFormikContext<any>();
    const [field] = useField({ name, value, type: 'checkbox' });

    const isChecked = values[name]?.includes(value);

    const handleChange = () => {
        const newValue = isChecked
            ? (values[name] || []).filter((v: string) => v !== value)
            : [...(values[name] || []), value];


        setFieldValue(name, newValue);
    };

    return (
        <label className="inline-flex items-center gap-2">
            <input
                type="checkbox"
                name={name}
                value={value}
                checked={isChecked}
                onChange={handleChange}
                className="checkbox"
            />
            {children}
        </label>
    );
};

export default CheckboxField