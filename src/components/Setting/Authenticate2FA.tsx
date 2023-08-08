/* eslint-disable react-hooks/exhaustive-deps */
import { useEnable2FAMutation, useSetup2FAQuery, useVerify2FAMutation } from '@/services/Api/twoApi'
import { OutlineButton } from '@/shared/UIs/CustomButton';
import { InputField } from '@/shared/UIs/InputField';
import { Image, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { Spinner } from '../Spinner';


interface IProps {
    current: number
    prev: () => void
    next: () => void
    setOpenModal: (value: boolean) => void
}

const Authenticate2FA = ({ current, prev, next, setOpenModal }: IProps) => {
    const { data, isSuccess, isError, isLoading } = useSetup2FAQuery({})
    const [code, setCode] = useState('')
    const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
    const [enable2FA, { isSuccess: verifySuccess, isError: verifyIsError, error: verifyError, isLoading: verifyIsLoading }] = useEnable2FAMutation()

    const handleVerification = async () => {
        await enable2FA({
            secret: data?.data?.secret,
            token: code
        })
    }
    useEffect(() => {
        if (isError) {
            message.error('Error Occured in generating QR Code')
        }
        if (isSuccess) {
            message.success('QR Code Generated Successfully')
            setQrCodeGenerated(true);
        }
        if (verifySuccess) {
            message.success('2FA Enabled Successfully')
            next()
        }
        if (verifyIsError) {
            const errMesg = verifyError as any
            message.error(errMesg?.data?.message)
            setCode('')
        }
    }, [isError, isSuccess, next, verifyError, verifyIsError, verifySuccess])

    useEffect(() => {
        if (code?.length === 6) {
            handleVerification()
        }
    }, [code])
    return (
        <>
            <div className='mt-[2px] flex flex-col items-center justify-center '>

                <span className='font-medium text-[16px]'>Scan QR Code and Fill Code</span>
                {isLoading ? <Spinner /> : (qrCodeGenerated &&
                    <>
                        <Image width={240} height={240} preview={false} src={data?.data?.qrCode} />
                        <div className="flex items-center gap-2">
                            <span className='font-medium text-[14px]'>Enter Code:</span>
                            <InputField inputValue={code} onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                setCode(event.target.value)
                            }
                                disabled={!qrCodeGenerated || verifyIsLoading}
                            />
                            {
                                verifyIsLoading && <Spinner />
                            }
                        </div>
                    </>
                )}
            </div>
            <div className="mt-2 flex items-center gap-2">
                {current > 0 && (
                    <OutlineButton title='Go Back' onClick={prev} />
                )}
                <OutlineButton title='Close' onClick={() => setOpenModal(false)} className='border-red-500 text-red-500 ' />

            </div></>
    )
}

export default Authenticate2FA