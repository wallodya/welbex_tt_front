import { QueryClient, QueryClientProvider } from "react-query"
import PageWrap from "./components/PageWrap"
import Feed from "./feed/Feed"
import AuthProvider from "./auth/AuthProvider"

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<PageWrap>
					<Feed />
				</PageWrap>
			</AuthProvider>
		</QueryClientProvider>
	)
}

export default App
