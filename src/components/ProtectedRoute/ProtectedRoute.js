import {Route, Redirect} from "react-router-dom";

const ProtectedRoute = ({component: Component, header: Header, ...props}) => {

	return (
		<Route>
			{
				() => props.loggedIn ?
					<>
						<Header {...props}/>
						<Component {...props} />
					</>
					: <Redirect to={{
						pathname: '/',
						state: { url: window.location.pathname }
					}}/>
			}
		</Route>
	)
}

export default ProtectedRoute;