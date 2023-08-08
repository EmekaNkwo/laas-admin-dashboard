interface IButtonProps {
    title?: string
    icon?: JSX.Element
    onClick?: () => void
    onKeyDown?: () => void
    className?: string
    disabled?: boolean

}

export const FilledButton = ({ title, icon, onClick, onKeyDown, className, disabled }: IButtonProps) => {
    return (
        <button disabled={disabled} onClick={onClick} className={`flex items-center justify-center gap-1 rounded-md p-[0.5rem] hover:bg-opacity-90 h-[38px] text-[14px] ${className}`} onKeyDown={onKeyDown}>
            {icon} {title}
        </button>
    )
}

export const OutlineButton = ({ title, icon, onClick, onKeyDown, className, disabled }: IButtonProps) => {
    return (
        <button onClick={onClick} disabled={disabled} className={`flex items-center justify-center gap-1 rounded-md p-[0.5rem] font-semibold text-mainColor hover:bg-opacity-70 hover:text-opacity-70  h-[38px] text-[14px] ${className} border-[1px] border-mainColor`} onKeyDown={onKeyDown}>
            {icon} {title}
        </button>
    )
}