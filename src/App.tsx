import { QueryClient, QueryClientProvider } from "react-query"
import PageWrap from "./components/PageWrap"
import Feed from "./feed/Feed"

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<PageWrap>
				<Feed />
			</PageWrap>
		</QueryClientProvider>
	)
}

export default App
