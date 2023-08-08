/* eslint-disable react-hooks/exhaustive-deps */
import { Spinner } from '@/components/Spinner'
import { useVerify2FAMutation } from '@/services/Api/twoApi'
import { InputField } from '@/shared/UIs/InputField'
import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TwoFA = () => {
    const [code, setCode] = useState('')
    const email = sessionStorage.getItem('email')
    const navigate = useNavigate()

    const [verify2FA, { data, isSuccess: verifySuccess, isError: verifyIsError, error: verifyError, isLoading: verifyIsLoading }] = useVerify2FAMutation()

    const handleVerification = async () => {
        await verify2FA({
            email: email,
            token: code
        })
    }

    useEffect(() => {
        if (verifySuccess) {
            message.success('Verification Successful')
            sessionStorage.setItem("authToken", data?.data?.token)
            sessionStorage.removeItem('email')
            navigate('/dashboard')
        }
        if (verifyIsError) {
            const errMesg = verifyError as any
            message.error(errMesg?.data?.message)
            setCode('')
        }
    }, [verifyError, verifyIsError, verifySuccess])

    useEffect(() => {
        if (code?.length === 6) {
            handleVerification()
        }
    }, [code])
    return (
        <div className='flex flex-col gap-2 items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <span className='font-semibold text-mainColor'>Enter 2FA Code</span>
            <div className="flex items-center flex-col gap-2">
                <InputField inputValue={code} className='border-mainColor w-[150px] text-center' onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setCode(event.target.value)
                }
                    disabled={verifyIsLoading}
                />
                {
                    verifyIsLoading && <Spinner />
                }
            </div>
        </div>
    )
}

export default TwoFA