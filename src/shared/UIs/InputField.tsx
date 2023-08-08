import { DatePicker, Input, Space } from 'antd';
import { BsSearch } from 'react-icons/bs';
import { Radio } from 'antd';
import type { DatePickerProps, RadioChangeEvent } from 'antd';
import Select from "react-select";

const { TextArea } = Input;

interface IOption {
    label?: string;
    value?: string;
}
interface IProps {
    inputValue?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
    placeholder?: string
    title?: string
    onRadioChange?: (event: RadioChangeEvent) => void
    onTextAreaChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    options?: IOption[] | undefined;
    count?: number
    direction?: "vertical" | "horizontal"
    rows?: number
    className?: string
    onSelect?: any
    selectOptions?: any
    dateValue?: any;
    onOk?: (dateValue: DatePickerProps['value'] | string) => void
    handleDateChange?: any
    type?: string
    name?: string
    disabled?: boolean

}
export const SearchInput = ({ onChange, inputValue, onKeyDown }: IProps) => {
    return (
        <Input
            placeholder="Search"
            className={`w-[300px] border-1 border-ruppiesColor h-[40px] text-primary py-1 px-2 rounded-md placeholder:text-sm focus:outline-none`}
            prefix={<BsSearch className="mr-2" />}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={inputValue}
        />
    )
}

export const InputField = ({ type, name, onChange, disabled, inputValue, placeholder, title, className }: IProps) => {
    return (
        <div className="flex flex-col gap-2 ">
            {
                title && (<span className='font-medium text-[14px] leading-[22px] '>{title}</span>)
            }
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                className={`border-[2px] h-[42px] p-1 rounded-md placeholder:text-sm focus:outline-none ${className}`}
                onChange={onChange}
                value={inputValue}
                disabled={disabled}
                required
            />
        </div>
    )
}

export const PassowrdField = ({ name, onChange, inputValue, placeholder, title, }: IProps) => {
    return (
        <div className="flex flex-col gap-2 ">
            {
                title && (<span className='font-medium text-[14px] leading-[22px] '>{title}</span>)
            }
            <Input.Password
                name={name}
                placeholder={placeholder}
                className={` border-1 h-[40px]  rounded-md placeholder:text-sm focus:outline-none`}
                onChange={onChange}
                value={inputValue}
                required
            />
        </div>
    )
}

export const TextAreaField = ({ onTextAreaChange, inputValue, placeholder, title, count, rows }: IProps) => {
    return (
        <div className="flex flex-col gap-1">
            {
                title && (<span className='font-medium text-[14px] leading-[22px] '>{title}</span>)
            }
            <TextArea
                required
                value={inputValue}
                rows={rows}
                maxLength={count}
                style={{ height: 120, resize: "none" }}
                onChange={onTextAreaChange}
                placeholder={placeholder}
                className=""
            />
        </div>
    )
}

export const RadioGroup = ({ inputValue, onRadioChange, options, direction, title }: IProps) => {
    return (
        <div className="flex items-center justify-between gap-2">
            {
                title && (<label>{title}</label>)
            }
            <Radio.Group onChange={onRadioChange} value={inputValue}>
                <Space direction={direction}>
                    {
                        options?.map((option, index) => (
                            <Radio key={index} value={option.value}>{option.label}</Radio>
                        ))
                    }
                </Space>
            </Radio.Group>
        </div>
    )
}

export const SelectField = ({ onSelect, inputValue, title, className, selectOptions }: IProps) => {
    return (
        <div className="flex flex-col gap-2 ">
            {
                title && (<span className='font-medium text-[14px] leading-[22px] '>{title}</span>)
            }
            <Select
                value={inputValue}
                className={`${className} h-[40px] rounded-md  `}
                onChange={onSelect}
                isSearchable={true}
                options={selectOptions}
                required
            />
        </div>
    )
}

export const DateField = ({
    title,
    handleDateChange,
    dateValue,
    className,
    onOk
}: IProps) => {
    return (
        <div className="flex flex-col gap-2 ">
            {
                title && (<span className='font-medium text-[14px]'>{title}</span>)
            }
            <DatePicker onChange={handleDateChange} onOk={onOk} value={dateValue} className={`${className} h-[40px]`} />

        </div>

    );
}