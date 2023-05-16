import * as Dialog from "@radix-ui/react-dialog"
import * as Tabs from "@radix-ui/react-tabs"
import SignIn from "../../forms/SignIn"
import SignUp from "../../forms/SignUp"

const AuthFormDialog = () => {

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				{/* <Button>Sign-in</Button> */}
				<button>sign-in</button>
			</Dialog.Trigger>
			<Dialog.Portal className="">
				<Dialog.Overlay className="fixed h-screen w-screen top-0 left-0 bg-gray-900/70" />
				<Dialog.Content className="absolute inset-0 m-auto w-fit h-fit">
					<div className="realative w-fit border rounded-lg shadow bg-gray-800 border-gray-700">
						<Tabs.Root defaultValue="sign-in" className="w-full">
							<Tabs.List className=" w-fit grid grid-cols-2 items-center">
								<Tabs.TabsTrigger value={"sign-in"} className="ml-[-2] p-4 font-bold text-gray-500 aria-selected:text-slate-100">
									Sign in
								</Tabs.TabsTrigger>
								<Tabs.TabsTrigger value={"sign-up"} className="p-4 font-bold text-gray-500 aria-selected:text-slate-100">
									Create&nbsp;account
								</Tabs.TabsTrigger>
							</Tabs.List>
							<Tabs.TabsContent value="sign-in" className="p-6">
								<SignIn />
							</Tabs.TabsContent>
							<Tabs.TabsContent value="sign-up" className="p-6">
								<SignUp />
							</Tabs.TabsContent>
						</Tabs.Root>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

export default AuthFormDialog
