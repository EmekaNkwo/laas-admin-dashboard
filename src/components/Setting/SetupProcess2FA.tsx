import { FilledButton, OutlineButton } from '@/shared/UIs/CustomButton'
import React from 'react'

interface IProps {
    next: () => void
    setOpenModal: (value: boolean) => void
}

const SetupProcess2FA = ({ next, setOpenModal }: IProps) => {
    return (
        <div className='px-1 flex flex-col  gap-2'>
            <span className='text-[20px] font-semibold'>Instructions</span>
            <ul className='flex flex-col gap-2 text-[15px] font-medium list-decimal px-1'>
                <li>Download and install the Google Authenticator app from the App Store (iOS) or Google Play Store (Android).</li>
                <li>Scan the QR code below</li>
                <li>Enter the 6-digit code from the app</li>
            </ul>
            <div className="flex items-center justify-between">
                <span className='text-[16px] font-semibold'>Click next to Proceed</span>
                <div className="flex items-center gap-2">
                    <FilledButton title='Next' onClick={next} className='bg-mainColor text-[#fff] ' />
                    <OutlineButton title='Close' onClick={() => setOpenModal(false)} className='border-red-500 text-red-500 ' />
                </div>
            </div>
        </div>
    )
}

export default SetupProcess2FA