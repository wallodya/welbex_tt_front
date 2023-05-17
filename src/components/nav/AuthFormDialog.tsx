import * as Dialog from "@radix-ui/react-dialog"
import * as Tabs from "@radix-ui/react-tabs"
import SignIn from "../../auth/SignIn"
import SignUp from "../../auth/SignUp"
import { useState } from "react"

const AuthFormDialog = () => {
    const [isOpen, setIsOpen] = useState(false)

    const closeForm = () => {
        setIsOpen(false)
    }

	return (
		<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
			<Dialog.Trigger asChild>
				<button className="text-gray-100 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
					sign-in
				</button>
			</Dialog.Trigger>
			<Dialog.Portal className="">
				<Dialog.Overlay className="fixed h-screen w-screen top-0 left-0 bg-gray-900/70" />
				<Dialog.Content className="absolute inset-0 mx-auto mt-44 w-fit h-fit">
					<div className="realative w-fit border rounded-lg shadow bg-gray-800 border-gray-700">
						<Tabs.Root defaultValue="sign-in" className="w-full">
							<Tabs.List className=" w-fit grid grid-cols-2 items-center">
								<Tabs.TabsTrigger
									value={"sign-in"}
									className="ml-[-2] p-4 font-bold text-gray-500 aria-selected:text-slate-100"
								>
									Sign in
								</Tabs.TabsTrigger>
								<Tabs.TabsTrigger
									value={"sign-up"}
									className="p-4 font-bold text-gray-500 aria-selected:text-slate-100"
								>
									Create&nbsp;account
								</Tabs.TabsTrigger>
							</Tabs.List>
							<Tabs.TabsContent value="sign-in" className="p-6">
								<SignIn closeForm={closeForm}/>
							</Tabs.TabsContent>
							<Tabs.TabsContent value="sign-up" className="p-6">
								<SignUp closeForm={closeForm}/>
							</Tabs.TabsContent>
						</Tabs.Root>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

export default AuthFormDialog
