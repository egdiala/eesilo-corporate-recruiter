import React, { Fragment, useEffect, useMemo, useState } from "react"
import logo from "@/assets/logo.svg"
import { Icon } from "@iconify/react"
import { useNavigate } from "react-router-dom"
import { Button, RenderIf } from "@/components/core"
import { AnimatePresence, motion } from "framer-motion"
import { useGetAccount } from "@/services/hooks/queries"
import { Loader } from "@/components/core/Button/Loader"
import { pageVariants } from "@/constants/animateVariants"
import { Dialog, DialogPanel, DialogTitle, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { ContactPerson, OrganizationInformation, StaffsAndAccessControl, Verification } from "@/components/pages/onboarding"


export const OnboardingPage: React.FC = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const { data: account, isFetching } = useGetAccount()
    const stages = useMemo(() => {
        return ["bio_data", "contact_person", "staff_access", "eid_number"]
    },[])
    const firstIncompleteStage = useMemo(() => {
        return stages?.find(stage => account?.onboarding_stage?.[stage as keyof typeof account.onboarding_stage] === false);
    }, [account, stages])
    const [selectedIndex, setSelectedIndex] = useState<string | number>("")
    
    const tabs = useMemo(() => {
        return [
            {
                id: 1,
                label: "Organisation’s Information",
            },
            {
                id: 2,
                label: "Contact Person",
            },
            {
                id: 3,
                label: "Staffs and Access Control",
            },
            {
                id: 4,
                label: "Verification",
            }
        ]
    }, [])
    
    useEffect(() => {
        if (firstIncompleteStage !== undefined) {
            setSelectedIndex(stages.indexOf(firstIncompleteStage as string))
        }
    }, [firstIncompleteStage, stages])
    
    return (
        <Fragment>
            <RenderIf condition={!isFetching}>
                <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col max-w-7xl w-full mx-auto">
                    <header className="flex flex-col md:flex-row items-center gap-3 px-[1.125rem] md:px-8 py-3 md:py-5 border-b border-gray-200">
                        <div className="grid p-0 place-content-center">
                            <img src={logo} alt="neesilo_logo" />
                        </div>
                        <div className="flex items-start w-full">
                            <div className="grid gap-1 flex-1">
                                <h1 className="font-medium text-lg text-gray-900">Setup your profile</h1>
                                <p className="font-medium text-base text-gray-500">Get started by setting up your profile. It’s quick and easy!</p>
                            </div>
                            <Button type="button" theme="primary" variant="stroke" size="40" onClick={() => setIsOpen(true)}>Skip for now</Button>
                        </div>
                    </header>
                    <TabGroup as="section" className="flex flex-col md:flex-row py-[1.125rem] md:py-12 px-[1.125rem] md:px-12 gap-10" selectedIndex={selectedIndex as number} onChange={setSelectedIndex}>
                        <TabList className="flex flex-col h-fit gap-2 p-2.5 overflow-hidden border border-gray-200 rounded-2xl md:max-w-72 w-full">
                            <div className="flex px-2 pt-1.5 pb-1 font-medium text-xs text-gray-400 uppercase">Profile setup menu</div>
                            <div className="flex md:flex-col flex-row gap-2 overflow-x-scroll">
                            {
                                tabs.map((tab) =>
                                    <Tab key={tab.id} onClick={(e) => { e.preventDefault() }} className="flex whitespace-nowrap rounded-lg p-2 text-sm font-medium text-gray-500 focus:outline-none data-[selected]:bg-primary-500 data-[selected]:text-white data-[hover]:bg-gray-100 data-[hover]:text-gray-900 data-[focus]:outline-0 transition duration-500 ease-out">{tab.label}</Tab>
                                )
                            }
                            </div>
                        </TabList>
                        <TabPanels className="max-w-xl w-full flex-1">
                            <TabPanel as={AnimatePresence} mode="popLayout">
                                <OrganizationInformation />
                            </TabPanel>
                            <TabPanel as={AnimatePresence} mode="popLayout">
                                <ContactPerson />
                            </TabPanel>
                            <TabPanel as={AnimatePresence} mode="popLayout">
                                <StaffsAndAccessControl />
                            </TabPanel>
                            <TabPanel as={AnimatePresence} mode="popLayout">
                                <Verification />
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => setIsOpen(false)}>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-300/30">
                            <div className="flex min-h-full items-end md:items-center justify-center p-4">
                                <DialogPanel transition className="w-full max-w-[24.5rem] border border-gray-200 rounded-2xl bg-white backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full md:data-[closed]:translate-y-6 data-[closed]:opacity-0">
                                    <div className="flex flex-col items-center gap-4 p-5">
                                        <div className="grid place-content-center bg-success-50 rounded-[0.625rem] p-2">
                                            <Icon icon="ri:checkbox-circle-fill" className="text-success-500 size-6" />
                                        </div>
                                        <div className="grid gap-1 text-center">
                                            <DialogTitle as="h1" className="flex-1 text-base font-medium text-gray-900">
                                                Skip profile setup
                                            </DialogTitle>
                                            <p className="text-sm text-gray-500">
                                                You can always update your profile in the PROFILE section of your account.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 py-4 px-5 border-t border-t-gray-200">
                                        <Button type="button" theme="neutral" variant="stroke" size="36" block onClick={() => setIsOpen(false)}>Dismiss</Button>
                                        <Button type="button" theme="primary" variant="filled" size="36" block onClick={() => navigate("/")}>Yes, Skip to Dashboard</Button>
                                    </div>
                                </DialogPanel>
                            </div>
                        </div>
                    </Dialog>
                </motion.div>
            </RenderIf>
            <RenderIf condition={isFetching}>
                <div className="flex w-full h-96 items-center justify-center"><Loader className="spinner size-6 text-primary-500" /></div>
            </RenderIf>
        </Fragment>
    )
}