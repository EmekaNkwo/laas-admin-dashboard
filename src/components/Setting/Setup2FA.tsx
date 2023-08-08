import React, { useState } from 'react'
import { Divider, Modal, Steps } from 'antd';
import SetupProcess2FA from './SetupProcess2FA';
import Authenticate2FA from './Authenticate2FA';
import Completed2Fa from './Completed2Fa';

interface IModalProps {
    isModalOpen: boolean;
    setOpenModal: (isModalOpen: boolean) => void;
}


const Setup2FA = ({ isModalOpen, setOpenModal }: IModalProps) => {
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const closeModal = () => {
        setOpenModal(false)
    }

    const steps = [
        {
            title: 'Setup 2FA',
            content: <>
                <SetupProcess2FA next={next} setOpenModal={setOpenModal} />
            </>,
        },
        {
            title: 'Authenticate 2FA',
            content: <><Authenticate2FA current={current} prev={prev} next={next} setOpenModal={setOpenModal} /></>,
        },
        {
            title: 'Completed 2FA',
            content: <><Completed2Fa closeModal={closeModal} /></>,
        },
    ];
    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    return (

        <Modal title="" open={isModalOpen}
            onOk={() => setOpenModal(false)}
            // onCancel={() => setOpenModal(false)} 
            cancelButtonProps={{
                style: {
                    display: "none"
                }
            }}
            okButtonProps={{
                style: {
                    display: "none"
                }
            }} bodyStyle={{
                maxHeight: "600px", // Set the desired height for the modal
                overflow: "auto",

            }}
            width={600}

        >
            <div className='mt-2'>
                <Steps progressDot current={current} items={items} />
                <div className=" ">
                    <Divider />
                    {steps[current].content}

                </div>

            </div>
        </Modal>

    )
}

export default Setup2FA